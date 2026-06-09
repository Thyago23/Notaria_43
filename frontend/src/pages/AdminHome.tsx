import { useState, useEffect } from 'react';
import { apiClient } from '../api/client';

const AdminHome = () => {
  const [resumen, setResumen] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchResumen();
  }, []);

  const fetchResumen = async () => {
    try {
      setIsLoading(true);
      setError(null);
      // Fetch report from last 30 days
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 30);
      
      const fechaInicio = start.toISOString().split('T')[0];
      const fechaFin = end.toISOString().split('T')[0];

      const response = await apiClient.get(`/turnos/reportes?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
      setResumen(response.data.data.resumen);
    } catch (err: any) {
      setError(err.message || 'Error al cargar el resumen');
      console.error('Error fetching resumen:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-dark">Dashboard</h1>
          <p className="text-gray-600 text-sm mt-1">Resumen general de los últimos 30 días</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {resumen && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Turnos</h2>
            <p className="text-3xl font-bold text-gray-900 mt-2">{resumen.totalTurnos}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Pendientes</h2>
            <p className="text-3xl font-bold text-gray-900 mt-2">{resumen.turnosPendientes}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Atendidos</h2>
            <p className="text-3xl font-bold text-gray-900 mt-2">{resumen.turnosAtendidos}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Cancelados</h2>
            <p className="text-3xl font-bold text-gray-900 mt-2">{resumen.turnosCancelados}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHome;
