// ============================================
// Tipos e Interfaces para Autenticación
// Sistema de Gestión de Turnos - Notaría 43
// ============================================

export type UserRole = 'CIUDADANO' | 'ADMINISTRATIVO' | 'NOTARIO';

export interface User {
  id: string;
  cedula: string;
  nombres: string;
  apellidos: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  cedula: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  error: string | null;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}
