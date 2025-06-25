import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';

interface Certificado {
  usuarioId: number;
  certificadoId: number;
  cnpj?: string;
  apelido?: string;
  certificado?: string; // Base64
  senhaCertificado?: string;
}

export default function Certificados() {
  const { user } = useAuth();
  const [certificados, setCertificados] = useState<Certificado[]>([]);
  const [form, setForm] = useState<Certificado>({
    usuarioId: 0,
    certificadoId: 0,
    cnpj: '',
    apelido: '',
    certificado: '',
    senhaCertificado: '',
  });

  useEffect(() => {
    if (user?.id) {
      setForm((prevForm) => ({
        ...prevForm,
        usuarioId: Number(user.id),
      }));
      fetchCertificados(Number(user.id));
    }
  }, [user]);

  const fetchCertificados = async (usuarioId: number) => {
    try {
      const response = await api.get(`/certificados?usuarioId=${usuarioId}`);
      setCertificados(response.data);
    } catch (error) {
      console.error('Erro ao buscar certificados:', error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result?.toString().split(',')[1]; // Remove o cabeçalho do Base64
          setForm((prevForm) => ({
            ...prevForm,
            certificado: base64 || '', // Salva como Base64
          }));
        };
        reader.readAsDataURL(file); // Converte o arquivo para Base64
      } catch (error) {
        console.error('Erro ao processar arquivo:', error);
      }
    }
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...form,
        usuarioId: Number(user?.id) || form.usuarioId, // Garante que o ID do usuário está sendo atribuído
      };
      await api.post('/certificados', payload);
      fetchCertificados(Number(user?.id));
      setForm({
        usuarioId: Number(user?.id),
        certificadoId: 0,
        cnpj: '',
        apelido: '',
        certificado: '',
        senhaCertificado: '',
      });
    } catch (error) {
      console.error('Erro ao salvar certificado:', error);
    }
  };

const handleDelete = async (certificadoId: number) => {
  try {
    const usuarioId = Number(user?.id); // Obtém o ID do usuário logado
    if (!usuarioId) {
      console.error('Erro: usuário não logado ou ID inválido.');
      return;
    }

    // Envia os dois parâmetros no corpo da requisição
    await api.delete(`/certificados/${usuarioId}/${certificadoId}`);

    fetchCertificados(usuarioId); // Atualiza a lista de certificados
  } catch (error) {
    console.error(`Erro ao excluir certificado com ID ${certificadoId}:`, error);
  }
};


  return (
    <Layout>
      <h1>Certificados Digitais</h1>

      {/* Formulário */}
      <div className="mb-4">
        <h2>Adicionar Certificado</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div className="mb-3">
            <label htmlFor="cnpj" className="form-label">
              CNPJ
            </label>
            <input
              type="text"
              className="form-control"
              id="cnpj"
              name="cnpj"
              value={form.cnpj || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="apelido" className="form-label">
              Apelido
            </label>
            <input
              type="text"
              className="form-control"
              id="apelido"
              name="apelido"
              value={form.apelido || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="certificado" className="form-label">
              Certificado (Arquivo)
            </label>
            <input
              type="file"
              className="form-control"
              id="certificado"
              name="certificado"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="senhaCertificado" className="form-label">
              Senha do Certificado
            </label>
            <input
              type="password"
              className="form-control"
              id="senhaCertificado"
              name="senhaCertificado"
              value={form.senhaCertificado || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Salvar
          </button>
        </form>
      </div>

      {/* Lista de Certificados */}
      <h2>Lista de Certificados</h2>
      <table className="table">
        <thead>
          <tr>
            <th>CNPJ</th>
            <th>Apelido</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {certificados.map((certificado) => (
            <tr key={certificado.certificadoId}>
              <td>{certificado.cnpj}</td>
              <td>{certificado.apelido}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(certificado.certificadoId)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
