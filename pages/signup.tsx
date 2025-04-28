import Head from 'next/head';
import Layout from '../components/Layout';
import { useState } from 'react';
import api from '../services/api';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await api.post('/usuarios', { name, email, senha });
      alert('Usuário criado com sucesso!');
      setName('');
      setEmail('');
      setSenha('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao criar usuário');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout requireAuth={false}>
      <Head>
        <title>Cadastro - Sistema</title>
      </Head>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4">
              <h1 className="text-center mb-4">Cadastrar-se</h1>
              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}
              <form onSubmit={handleSignup}>
                <div className="mb-3">
                  <label className="form-label">Nome</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">E-mail</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Senha</label>
                  <input
                    type="password"
                    required
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="form-control"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary w-100"
                >
                  {isLoading ? 'Cadastrando...' : 'Cadastrar'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;