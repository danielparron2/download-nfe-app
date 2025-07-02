import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';

interface Certificado {
  usuarioId: number;
  certificadoId: number;
  cnpj?: string;
  apelido?: string;
  certificado?: string | Blob | { type: string; data: any[] };
  senhaCertificado?: string;
}

// Type guard para verificar se o certificado é do tipo Buffer
const isBufferObject = (obj: any): obj is { type: string; data: any[] } =>
  obj && typeof obj === 'object' && obj.type === 'Buffer' && Array.isArray(obj.data);

export default function NotasFiscais() {
  const { user } = useAuth();

  /* -------------------- Estados -------------------- */
  const [certificados, setCertificados] = useState<Certificado[]>([]);
  const [selectedCertificado, setSelectedCertificado] = useState<number | null>(null);
  const [dtInicial, setDtInicial] = useState('');
  const [dtFinal, setDtFinal] = useState('');

  const [resultado, setResultado] = useState('');   // Exibe resposta no textarea
  const [xmlRaw, setXmlRaw] = useState('');          // Guarda XML cru
  const [qtdNotas, setQtdNotas] = useState(0);       // Quantas <CompNfe> foram geradas

  /* -------------------- Ciclo de vida -------------------- */
  useEffect(() => {
    if (user?.id) fetchCertificados(Number(user.id));
  }, [user]);

  const fetchCertificados = async (usuarioId: number) => {
    try {
      const { data } = await api.get(`/certificados?usuarioId=${usuarioId}`);
      setCertificados(data);
    } catch (error) {
      console.error('Erro ao buscar certificados:', error);
    }
  };

  /* -------------------- Helpers -------------------- */
  const blobToBase64 = (blob: Blob): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result?.toString().split(',')[1];
        resolve(base64data || '');
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

  /* -------------------- Handlers -------------------- */
  const handleBuscarNotas = async () => {
    if (!selectedCertificado) return alert('Por favor, selecione um certificado.');

    const certificado = certificados.find(c => c.certificadoId === selectedCertificado);
    if (!certificado) return alert('Certificado não encontrado.');

    try {
      // converte certificado em base64
      let certBase64 = '';
      if (certificado.certificado instanceof Blob) {
        certBase64 = await blobToBase64(certificado.certificado);
      } else if (typeof certificado.certificado === 'string') {
        certBase64 = certificado.certificado;
      } else if (isBufferObject(certificado.certificado)) {
        certBase64 = String.fromCharCode(...new Uint8Array(certificado.certificado.data));
      } else {
        throw new Error('Formato de certificado inválido.');
      }

      // faz chamada – força resposta como texto (XML)
      const { data } = await api.post(
        '/wsdownload',
        {
          cnpj: certificado.cnpj || '',
          certBase64,
          certPassword: certificado.senhaCertificado || '',
          dtInicio: dtInicial,
          dtTermino: dtFinal,
        },
        { responseType: 'text' }
      );

      setResultado(data);
      setXmlRaw(data);
      setQtdNotas(0);
    } catch (error) {
      console.error('Erro ao buscar notas:', error);
      setResultado('Erro ao buscar notas. Verifique os dados e tente novamente.');
      setXmlRaw('');
      setQtdNotas(0);
    }
  };

  const handleDownloadZip = async () => {
    if (!xmlRaw) {
      alert('Execute "Buscar Notas" primeiro.');
      return;
    }

    // Faz parsing do XML no client
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlRaw, 'text/xml');

    // Pega todos CompNfe (ignora namespaces)
    const compNodes = Array.from(doc.getElementsByTagName('CompNfe'));
    if (compNodes.length === 0) {
      alert('Nenhuma tag <CompNfe> encontrada.');
      return;
    }

    const JSZip = (await import('jszip')).default;
    const { saveAs } = await import('file-saver');
    const zip = new JSZip();
    const serializer = new XMLSerializer();

    compNodes.forEach((comp, idx) => {
      const xmlComp = serializer.serializeToString(comp);
      const numTag = comp.getElementsByTagName('NumeroNfe')[0];
      const numero = numTag?.textContent?.trim() || `idx-${idx + 1}`;
      zip.file(`NF-${numero}.xml`, xmlComp);
    });

    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, 'notas-fiscais.zip');

    setQtdNotas(compNodes.length);
  };

  /* -------------------- JSX -------------------- */
  return (
    <Layout>
      <h1>Notas Fiscais</h1>

      {/* Seleção de certificado */}
      <div className="mb-3">
        <label htmlFor="certificado" className="form-label">
          Certificado Digital
        </label>
        <select
          className="form-select"
          id="certificado"
          value={selectedCertificado || ''}
          onChange={e => setSelectedCertificado(Number(e.target.value))}
        >
          <option value="" disabled>
            Selecione um certificado
          </option>
          {certificados.map(cert => (
            <option key={cert.certificadoId} value={cert.certificadoId}>
              {cert.apelido} ({cert.cnpj})
            </option>
          ))}
        </select>
      </div>

      {/* Datas */}
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
            onChange={e => setDtInicial(e.target.value)}
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
            onChange={e => setDtFinal(e.target.value)}
          />
        </div>
      </div>

      {/* Botões */}
      <button className="btn btn-primary me-2" onClick={handleBuscarNotas}>
        Buscar Notas
      </button>

      <button
        className="btn btn-success"
        onClick={handleDownloadZip}
        disabled={!xmlRaw}
        title={!xmlRaw ? 'Execute "Buscar Notas" primeiro' : ''}
      >
        Baixar ZIP {qtdNotas ? `(${qtdNotas})` : ''}
      </button>

      {/* Resultado */}
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