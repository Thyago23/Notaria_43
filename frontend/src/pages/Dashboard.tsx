import { useState, useEffect } from 'react';
import { apiClient } from '../api/client';

interface Cita {
  id: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  status: 'PENDIENTE' | 'ATENDIDO' | 'CANCELADO';
  notas: string | null;
  user?: {
    id: string;
    cedula: string;
    nombres: string;
    apellidos: string;
  } | null;
  guest_nombre?: string;
  guest_email?: string;
  tramite: {
    nombre: string;
    duracionMinutos: number;
  };
}

const Dashboard = () => {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<{ [key: string]: boolean }>({});
  const [filterTramite, setFilterTramite] = useState('');
  const [filterCliente, setFilterCliente] = useState('');

  useEffect(() => {
    fetchCitas();
  }, []);

  const fetchCitas = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await apiClient.get('/turnos/agenda');
      setCitas(response.data.data || []);
    } catch (err: any) {
      setError(err.message || 'Error al cargar las citas');
      console.error('Error fetching citas:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsAttended = async (citaId: string) => {
    try {
      setActionLoading(prev => ({ ...prev, [citaId]: true }));
      setError(null);
      setSuccessMessage(null);
      await apiClient.patch(`/turnos/${citaId}/atender`);
      setSuccessMessage('Turno marcado como atendido exitosamente');
      await fetchCitas();
    } catch (err: any) {
      setError(err.message || 'Error al marcar cita como atendida');
    } finally {
      setActionLoading(prev => ({ ...prev, [citaId]: false }));
    }
  };

  const handleCancelCita = async (citaId: string) => {
    if (!window.confirm('¿Estás seguro de que deseas cancelar este turno? Esta acción no se puede deshacer.')) {
      return;
    }
    
    try {
      setActionLoading(prev => ({ ...prev, [citaId]: true }));
      setError(null);
      setSuccessMessage(null);
      await apiClient.delete(`/turnos/${citaId}`);
      setSuccessMessage('Turno cancelado exitosamente');
      await fetchCitas();
    } catch (err: any) {
      setError(err.message || 'Error al cancelar cita');
    } finally {
      setActionLoading(prev => ({ ...prev, [citaId]: false }));
    }
  };

  const filteredCitas = citas.filter(cita => {
    const tramiteMatch = cita.tramite.nombre.toLowerCase().includes(filterTramite.toLowerCase());
    const clienteNombre = cita.user?.nombres || cita.guest_nombre || '';
    const clienteMatch = clienteNombre.toLowerCase().includes(filterCliente.toLowerCase());
    return tramiteMatch && clienteMatch;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Cargando citas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-dark">Gestión de Citas</h1>
          <p className="text-gray-600 text-sm mt-1">Administre los turnos y citas agendadas</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800 text-sm">{successMessage}</p>
        </div>
      )}

      {/* Filtros */}
      <div className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">Buscar por Cliente</label>
          <input 
            type="text" 
            placeholder="Ej. Juan..."
            value={filterCliente}
            onChange={(e) => setFilterCliente(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none"
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">Filtrar por Trámite</label>
          <input 
            type="text" 
            placeholder="Ej. Escrituras..."
            value={filterTramite}
            onChange={(e) => setFilterTramite(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none"
          />
        </div>
      </div>

      {/* Tabla de Citas */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trámite</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha y Hora</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCitas.map((cita) => (
              <tr key={cita.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {cita.user ? `${cita.user.nombres} ${cita.user.apellidos}` : cita.guest_nombre || 'Invitado'}
                  </div>
                  <div className="text-sm text-gray-500">{cita.user?.cedula || cita.guest_email || 'N/A'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{cita.tramite.nombre}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(cita.fecha).toLocaleDateString()} {cita.horaInicio}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    cita.status === 'ATENDIDO' ? 'bg-green-100 text-green-800' :
                    cita.status === 'CANCELADO' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {cita.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {cita.status === 'PENDIENTE' && (
                    <>
                      <button
                        onClick={() => handleMarkAsAttended(cita.id)}
                        disabled={actionLoading[cita.id]}
                        className="text-primary hover:text-primary-hover mr-3 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {actionLoading[cita.id] ? 'Procesando...' : 'Marcar Atendido'}
                      </button>
                      <button
                        onClick={() => handleCancelCita(cita.id)}
                        disabled={actionLoading[cita.id]}
                        className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {actionLoading[cita.id] ? 'Procesando...' : 'Cancelar'}
                      </button>
                    </>
                  )}
                  {cita.status === 'ATENDIDO' && (
                    <span className="text-green-600 text-sm font-medium">✓ Atendido</span>
                  )}
                  {cita.status === 'CANCELADO' && (
                    <span className="text-red-600 text-sm font-medium">✗ Cancelado</span>
                  )}
                </td>
              </tr>
            ))}
            {filteredCitas.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500 text-sm">
                  No se encontraron citas con esos filtros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
