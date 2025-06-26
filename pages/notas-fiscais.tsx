import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';

interface Certificado {
  usuarioId: number;
  certificadoId: number;
  cnpj?: string;
  apelido?: string;
  certificado?: string | Blob; // Pode ser Base64 ou Blob
  senhaCertificado?: string;
}

export default function NotasFiscais() {
  const { user } = useAuth();
  const [certificados, setCertificados] = useState<Certificado[]>([]);
  const [selectedCertificado, setSelectedCertificado] = useState<number | null>(null);
  const [dtInicial, setDtInicial] = useState('');
  const [dtFinal, setDtFinal] = useState('');
  const [resultado, setResultado] = useState('');

  useEffect(() => {
    if (user?.id) {
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

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result?.toString().split(',')[1];
        resolve(base64data || '');
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handleBuscarNotas = async () => {
    if (!selectedCertificado) {
      alert('Por favor, selecione um certificado.');
      return;
    }

    const certificado = certificados.find(
      (cert) => cert.certificadoId === selectedCertificado
    );

    if (!certificado) {
      alert('Certificado não encontrado.');
      return;
    }

    let certBase64 = certificado.certificado;

    // Se for Blob, converte para Base64
    if (certificado.certificado instanceof Blob) {
      certBase64 = await blobToBase64(certificado.certificado);
    }

    try {
      // dtInicial e dtFinal já vêm no formato YYYY-MM-DD pelo input type="date"
      const params = new URLSearchParams({
        cnpj: certificado.cnpj || '',
        certBase64: certBase64 as string,
        certPassword: certificado.senhaCertificado || '',
        dtInicio: dtInicial,
        dtTermino: dtFinal,
      });

      const response = await api.get(`/wsdownload?${params.toString()}`);
      setResultado(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error('Erro ao buscar notas:', error);
      setResultado('Erro ao buscar notas. Verifique os dados e tente novamente.');
    }
  };

  return (
    <Layout>
      <h1>Notas Fiscais</h1>
      <div className="mb-3">
        <label htmlFor="certificado" className="form-label">
          Certificado Digital
        </label>
        <select
          className="form-select"
          id="certificado"
          value={selectedCertificado || ''}
          onChange={(e) => setSelectedCertificado(Number(e.target.value))}
        >
          <option value="" disabled>
            Selecione um certificado
          </option>
          {certificados.map((cert) => (
            <option key={cert.certificadoId} value={cert.certificadoId}>
              {cert.apelido} ({cert.cnpj})
            </option>
          ))}
        </select>
      </div>

      <div className="row mb-3">
        <div className="col">
          <label htmlFor="dtInicial" className="form-label">
            Data Inicial
          </label>
          <input
            type="date"
            className="form-control"
            id="dtInicial"
            value={dtInicial}
            onChange={(e) => setDtInicial(e.target.value)}
          />
        </div>
        <div className="col">
          <label htmlFor="dtFinal" className="form-label">
            Data Final
          </label>
          <input
            type="date"
            className="form-control"
            id="dtFinal"
            value={dtFinal}
            onChange={(e) => setDtFinal(e.target.value)}
          />
        </div>
      </div>

      <button className="btn btn-primary" onClick={handleBuscarNotas}>
        Buscar Notas
      </button>

      <div className="mt-3">
        <label htmlFor="resultado" className="form-label">
          Resultado da API
        </label>
        <textarea
          id="resultado"
          className="form-control"
          rows={10}
          readOnly
          value={resultado}
        />
      </div>
    </Layout>
  );
}