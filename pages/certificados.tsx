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
      
      <div className="px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Certificados Digitais</h1>
        
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-700 mb-4">
            Esta página será implementada em detalhes posteriormente para cadastrar e gerenciar 
            certificados digitais dos clientes.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Certificados;