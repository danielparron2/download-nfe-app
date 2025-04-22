import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import axios from 'axios';

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
    // Verificar se existe um token no cookie
    const token = Cookies.get('auth_token');
    if (token) {
      // Validar o token com a API
      fetchUserData(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserData = async (token: string) => {
    try {
      // Ajuste a URL conforme seu endpoint de API
      const response = await axios.get('/api/auth/login', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

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
      // Ajuste a URL conforme seu endpoint de API
      const response = await axios.post('/api/auth/login', {
        email,
        password
      });

      const { token, user } = response.data;
      
      // Salvar token no cookie
      Cookies.set('auth_token', token, { expires: 7 }); // Expira em 7 dias
      
      // Salvar dados do usuário no estado
      setUser(user);
      
      // Redirecionar para o dashboard
      router.push('/dashboard');
      
      return true;
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    }
  };

  const logout = () => {
    // Remover token do cookie
    Cookies.remove('auth_token');
    
    // Limpar estado do usuário
    setUser(null);
    
    // Redirecionar para a página de login
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