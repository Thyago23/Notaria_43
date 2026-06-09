import axios from 'axios';
import { createClient } from '@supabase/supabase-js';
import type { ApiError } from '../types/auth';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mock.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || 'mock-key';

// Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseKey);

const getApiUrl = () => {
  const url = import.meta.env.VITE_API_URL || 'https://notaria-43.onrender.com/api';
  // Check if URL already has /api at the end (ignoring trailing slash if any)
  const cleanUrl = url.replace(/\/$/, '');
  return cleanUrl.endsWith('/api') ? cleanUrl : `${cleanUrl}/api`;
};

// Axios instance for custom backend (colleague's database)
export const apiClient = axios.create({
  baseURL: getApiUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor - Add JWT token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle HTTP errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      // Handle specific HTTP status codes
      switch (status) {
        case 401:
          // Unauthorized - Clear token and redirect to login
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_user');
          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
          break;
        case 403:
          // Forbidden - User doesn't have permission
          console.error('Acceso denegado: No tiene permisos para esta acción');
          break;
        case 404:
          // Not Found
          console.error('Recurso no encontrado');
          break;
        case 500:
          // Internal Server Error
          console.error('Error interno del servidor');
          break;
        default:
          console.error('Error HTTP:', status);
      }

      // Return standardized error object
      const apiError: ApiError = data || {
        success: false,
        message: 'Error desconocido al comunicarse con el servidor',
      };

      return Promise.reject(apiError);
    } else if (error.request) {
      // Handle timeout specifically
      if (error.code === 'ECONNABORTED') {
        console.error('El servidor tardó demasiado en responder (Timeout)');
        return Promise.reject({
          success: false,
          message: 'El servidor tardó demasiado en responder. Por favor, intente nuevamente.',
        });
      }

      // Request was made but no response received
      console.error('No se recibió respuesta del servidor');
      return Promise.reject({
        success: false,
        message: 'No se pudo conectar con el servidor. Verifique su conexión a internet.',
      });
    } else {
      // Something happened in setting up the request
      console.error('Error al configurar la solicitud:', error.message);
      return Promise.reject({
        success: false,
        message: 'Error al procesar la solicitud',
      });
    }
  }
);

// Mock data to use until backend is ready
export const MOCK_TRAMITES = [
  { id: '1', nombre: 'Escrituras', descripcion: 'Trámite de escrituración pública', requisitos: ['DNI', 'Minuta'] },
  { id: '2', nombre: 'Poderes', descripcion: 'Otorgamiento de poder notarial', requisitos: ['DNI', 'Datos del apoderado'] },
  { id: '3', nombre: 'Testamentos', descripcion: 'Elaboración de testamento', requisitos: ['DNI', 'Certificado médico'] },
];
