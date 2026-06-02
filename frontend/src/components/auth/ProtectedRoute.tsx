// ============================================
// ProtectedRoute Component
// Guard de autenticación para rutas protegidas
// Sistema de Gestión de Turnos - Notaría 43
// ============================================

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { UserRole } from '../../types/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles = ['ADMINISTRATIVO', 'NOTARIO'] 
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  // Mostrar loader mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-gray-600 font-medium">Cargando...</p>
        </div>
      </div>
    );
  }

  // Redirigir a login si no está autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Verificar roles si se especifican
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light">
        <div className="text-center max-w-md p-8">
          <h1 className="text-2xl font-bold text-dark mb-4">Acceso Denegado</h1>
          <p className="text-gray-600 mb-6">
            No tiene permisos para acceder a esta sección. Su rol actual es: <strong>{user.role}</strong>
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-primary hover:bg-primary-hover text-white font-medium py-2 px-6 rounded transition-colors"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
