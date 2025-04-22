import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

// Crie uma instância do axios com configurações padrão
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://35.222.71.107',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adiciona o token de autenticação em todas as requisições
api.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    const token = Cookies.get('auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepta erros de autenticação (401)
api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Se receber um 401, remove o token e redireciona para o login
      Cookies.remove('auth_token');
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;