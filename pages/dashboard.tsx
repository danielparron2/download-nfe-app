import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { FaIdCard, FaFileDownload } from 'react-icons/fa';
import type { NextPage } from 'next';

const Dashboard: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Dashboard - Sistema</title>
        <meta name="description" content="Dashboard do sistema" />
      </Head>
      
      <div className="px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/certificados">
            <div className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 p-3 rounded-md bg-blue-500 text-white">
                    <FaIdCard size={24} />
                  </div>
                  <div className="ml-5">
                    <h2 className="text-xl font-semibold text-gray-900">Certificados Digitais</h2>
                    <p className="mt-1 text-sm text-gray-600">
                      Cadastre e gerencie certificados digitais do cliente
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/notas-fiscais">
            <div className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 p-3 rounded-md bg-green-500 text-white">
                    <FaFileDownload size={24} />
                  </div>
                  <div className="ml-5">
                    <h2 className="text-xl font-semibold text-gray-900">Notas Fiscais</h2>
                    <p className="mt-1 text-sm text-gray-600">
                      Download e gerenciamento de notas fiscais
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;