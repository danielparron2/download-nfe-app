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
      
      <div className="px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Notas Fiscais</h1>
        
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-700 mb-4">
            Esta página será implementada em detalhes posteriormente para download e 
            gerenciamento de notas fiscais.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default NotasFiscais;