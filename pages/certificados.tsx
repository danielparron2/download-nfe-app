import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/Layout';
import type { NextPage } from 'next';

const Certificados: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Layout>
      <Head>
        <title>Certificados Digitais - Sistema</title>
        <meta name="description" content="Gerenciamento de certificados digitais" />
      </Head>

      <div className="container py-4">
        <h1 className="display-5 fw-bold text-dark mb-4">Certificados Digitais</h1>

        <div className="card shadow-sm">
          <div className="card-body">
            <p className="text-muted mb-0">
              Esta página será implementada em detalhes posteriormente para cadastrar e gerenciar certificados digitais dos clientes.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Certificados;