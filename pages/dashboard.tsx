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

      <div className="container py-4">
        <h1 className="display-5 fw-bold text-dark mb-4">Dashboard</h1>

        <div className="row g-4">
          <div className="col-md-6">
            <Link href="/certificados" passHref>
              <div className="card shadow-sm cursor-pointer">
                <div className="card-body d-flex align-items-center">
                  <div className="bg-primary text-white rounded-circle p-3">
                    <FaIdCard size={24} />
                  </div>
                  <div className="ms-3">
                    <h5 className="card-title mb-0">Certificados Digitais</h5>
                    <p className="text-muted">Cadastre e gerencie certificados digitais do cliente</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-6">
            <Link href="/notas-fiscais" passHref>
              <div className="card shadow-sm cursor-pointer">
                <div className="card-body d-flex align-items-center">
                  <div className="bg-success text-white rounded-circle p-3">
                    <FaFileDownload size={24} />
                  </div>
                  <div className="ms-3">
                    <h5 className="card-title mb-0">Notas Fiscais</h5>
                    <p className="text-muted">Download e gerenciamento de notas fiscais</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;