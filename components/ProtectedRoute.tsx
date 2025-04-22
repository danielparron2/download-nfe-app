import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Se estiver carregando, mostre um indicador de carregamento
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Se o usuário não estiver autenticado e não estiver na página de login, redirecione
  if (!user && router.pathname !== '/login') {
    router.replace('/login');
    return null;
  }

  // Se estiver na página de login mas já estiver autenticado, redirecione para o dashboard
  if (user && router.pathname === '/login') {
    router.replace('/dashboard');
    return null;
  }

  return <>{children}</>;
}