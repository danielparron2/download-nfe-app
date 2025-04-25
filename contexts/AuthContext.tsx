import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import api from '../services/api';

interface User {
  id: string;
  email: string;
  name?: string;
  [key: string]: any; // Para outros campos que podem existir
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('auth_token');
    if (token) {
      fetchUserData(); // Token já será tratado pelo interceptor na `api.ts`
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await api.get('/auth/login'); // URL base já configurada na instância
      if (response.data) {
        setUser(response.data);
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      Cookies.remove('auth_token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('Iniciando login');
      console.log(api.defaults.baseURL);

      const response = await api.post('/auth/login', {
        email,
        password,
      });

      const { token, user } = response.data;

      Cookies.set('auth_token', token, { expires: 7 });
      setUser(user);
      router.push('/dashboard');
      return true;
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    }
  };

  const logout = () => {
    Cookies.remove('auth_token');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}