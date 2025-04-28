import Head from 'next/head';
import LoginForm from '../components/LoginForm';
import Layout from '../components/Layout';
import type { NextPage } from 'next';

const Login: NextPage = () => {
  return (
    <Layout requireAuth={false}>
      <Head>
        <title>Login - Sistema</title>
        <meta name="description" content="Página de login do sistema" />
      </Head>
      
      <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
        <div className="card shadow p-4">
          <LoginForm />
        </div>
      </div>
    </Layout>
  );
};

export default Login;
