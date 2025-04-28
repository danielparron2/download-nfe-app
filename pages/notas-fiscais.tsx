import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/Layout';
import type { NextPage } from 'next';

const NotasFiscais: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Layout>
      <Head>
        <title>Notas Fiscais - Sistema</title>
        <meta name="description" content="Download de notas fiscais" />
      </Head>

      <div className="container py-4">
        <h1 className="display-5 fw-bold text-dark mb-4">Notas Fiscais</h1>

        <div className="card shadow-sm">
          <div className="card-body">
            <p className="text-muted mb-0">
              Esta página será implementada em detalhes posteriormente para download e gerenciamento de notas fiscais.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotasFiscais;
