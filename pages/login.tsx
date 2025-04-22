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
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <LoginForm />
      </div>
    </Layout>
  );
};

export default Login;