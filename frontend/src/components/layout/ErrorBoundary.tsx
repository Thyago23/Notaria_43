// ============================================
// ErrorBoundary Component
// Previenen caídas en blanco (White-screen of death)
// y capturan excepciones no controladas en el Frontend
// ============================================

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Actualiza el estado para que el siguiente renderizado muestre la interfaz de fallback
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('=== ERROR CAPTURADO POR ERROR BOUNDARY ===', error, errorInfo);
    this.setState({ error, errorInfo });
    // Aquí se podría enviar a un servicio de monitoreo como Sentry o Datadog
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2 font-heading">
              ¡Vaya! Algo salió mal
            </h2>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              Hemos detectado un error inesperado en la interfaz. El equipo técnico ha sido notificado automáticamente para salvaguardar la integridad del sistema.
            </p>

            {this.state.error && (
              <div className="mb-6 p-3 bg-red-50/50 rounded-lg border border-red-100 text-left overflow-auto max-h-32">
                <p className="text-xs font-mono text-red-700 font-semibold">{this.state.error.toString()}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReload}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#8cc550] hover:bg-[#7ab345] text-white font-medium text-sm rounded-xl transition-colors shadow-sm"
              >
                Recargar página
              </button>
              <button
                onClick={this.handleGoHome}
                className="w-full sm:w-auto px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm rounded-xl transition-colors"
              >
                Volver al inicio
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
