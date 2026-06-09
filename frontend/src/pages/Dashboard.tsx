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

interface ReporteResumen {
  totalTurnos: number;
  turnosPendientes: number;
  turnosAtendidos: number;
  turnosCancelados: number;
  fechaInicio: string;
  fechaFin: string;
}

interface ReporteData {
  resumen: ReporteResumen;
  turnos: Cita[];
}

const Dashboard = () => {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<{ [key: string]: boolean }>({});
  const [filterTramite, setFilterTramite] = useState('');
  const [filterCliente, setFilterCliente] = useState('');

  // Estado del modal de reporte
  const [showReporteModal, setShowReporteModal] = useState(false);
  const [reporteFechaInicio, setReporteFechaInicio] = useState('');
  const [reporteFechaFin, setReporteFechaFin] = useState('');
  const [reporteStatus, setReporteStatus] = useState('');
  const [reporteData, setReporteData] = useState<ReporteData | null>(null);
  const [reporteLoading, setReporteLoading] = useState(false);
  const [reporteError, setReporteError] = useState<string | null>(null);

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
      const errorMessage = typeof err === 'object' ? JSON.stringify(err, null, 2) : String(err);
      setError(`Error detallado: ${errorMessage}`);
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
    if (!window.confirm('¿Estás seguro de que deseas cancelar este turno? Esta acción no se puede deshacer.')) return;
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

  const handleGenerarReporte = async () => {
    if (!reporteFechaInicio || !reporteFechaFin) {
      setReporteError('Debes seleccionar un rango de fechas.');
      return;
    }
    try {
      setReporteLoading(true);
      setReporteError(null);
      const params: any = { fechaInicio: reporteFechaInicio, fechaFin: reporteFechaFin };
      if (reporteStatus) params.status = reporteStatus;
      const response = await apiClient.get('/reportes/turnos', { params });
      setReporteData(response.data.data);
    } catch (err: any) {
      setReporteError(err.message || 'Error al generar el reporte');
    } finally {
      setReporteLoading(false);
    }
  };

  const handleDescargarCSV = () => {
    if (!reporteData) return;
    const headers = ['Fecha', 'Hora Inicio', 'Cliente', 'Cédula/Email', 'Trámite', 'Estado'];
    const rows = reporteData.turnos.map(t => [
      new Date(t.fecha).toLocaleDateString(),
      t.horaInicio,
      t.user ? `${t.user.nombres} ${t.user.apellidos}` : t.guest_nombre || 'Invitado',
      t.user?.cedula || t.guest_email || 'N/A',
      t.tramite.nombre,
      t.status,
    ]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reporte_turnos_${reporteFechaInicio}_${reporteFechaFin}.csv`;
    a.click();
    URL.revokeObjectURL(url);
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
        {/* Botón Generar Reporte */}
        <button
          onClick={() => { setShowReporteModal(true); setReporteData(null); setReporteError(null); }}
          className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors"
        >
          Generar Reporte
        </button>
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
                  {cita.status === 'ATENDIDO' && <span className="text-green-600 text-sm font-medium">✓ Atendido</span>}
                  {cita.status === 'CANCELADO' && <span className="text-red-600 text-sm font-medium">✗ Cancelado</span>}
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

      {/* Modal de Reporte */}
      {showReporteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-bold text-dark">Generar Reporte de Turnos</h2>
              <button onClick={() => setShowReporteModal(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
            </div>

            <div className="p-6 space-y-4">
              {/* Filtros del reporte */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Fecha Inicio *</label>
                  <input
                    type="date"
                    value={reporteFechaInicio}
                    onChange={(e) => setReporteFechaInicio(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Fecha Fin *</label>
                  <input
                    type="date"
                    value={reporteFechaFin}
                    onChange={(e) => setReporteFechaFin(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Estado</label>
                  <select
                    value={reporteStatus}
                    onChange={(e) => setReporteStatus(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none"
                  >
                    <option value="">Todos</option>
                    <option value="PENDIENTE">Pendiente</option>
                    <option value="ATENDIDO">Atendido</option>
                    <option value="CANCELADO">Cancelado</option>
                  </select>
                </div>
              </div>

              {reporteError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-800 text-sm">{reporteError}</p>
                </div>
              )}

              <button
                onClick={handleGenerarReporte}
                disabled={reporteLoading}
                className="w-full bg-primary text-white py-2 rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {reporteLoading ? 'Generando...' : 'Generar Reporte'}
              </button>

              {/* Resultados */}
              {reporteData && (
                <div className="space-y-4 mt-2">
                  {/* Resumen estadístico */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { label: 'Total', value: reporteData.resumen.totalTurnos, color: 'bg-blue-50 text-blue-700' },
                      { label: 'Pendientes', value: reporteData.resumen.turnosPendientes, color: 'bg-yellow-50 text-yellow-700' },
                      { label: 'Atendidos', value: reporteData.resumen.turnosAtendidos, color: 'bg-green-50 text-green-700' },
                      { label: 'Cancelados', value: reporteData.resumen.turnosCancelados, color: 'bg-red-50 text-red-700' },
                    ].map(stat => (
                      <div key={stat.label} className={`rounded-lg p-3 text-center ${stat.color}`}>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className="text-xs mt-1">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tabla de resultados */}
                  {reporteData.turnos.length > 0 ? (
                    <>
                      <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Trámite</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {reporteData.turnos.map(t => (
                              <tr key={t.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2">
                                  <div className="font-medium text-gray-900">
                                    {t.user ? `${t.user.nombres} ${t.user.apellidos}` : t.guest_nombre || 'Invitado'}
                                  </div>
                                  <div className="text-gray-500 text-xs">{t.user?.cedula || t.guest_email || 'N/A'}</div>
                                </td>
                                <td className="px-4 py-2 text-gray-900">{t.tramite.nombre}</td>
                                <td className="px-4 py-2 text-gray-900">{new Date(t.fecha).toLocaleDateString()} {t.horaInicio}</td>
                                <td className="px-4 py-2">
                                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                                    t.status === 'ATENDIDO' ? 'bg-green-100 text-green-800' :
                                    t.status === 'CANCELADO' ? 'bg-red-100 text-red-800' :
                                    'bg-yellow-100 text-yellow-800'
                                  }`}>{t.status}</span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <button
                        onClick={handleDescargarCSV}
                        className="w-full border border-primary text-primary py-2 rounded-lg text-sm font-medium hover:bg-primary hover:text-white transition-colors"
                      >
                        ⬇ Descargar CSV
                      </button>
                    </>
                  ) : (
                    <p className="text-center text-gray-500 text-sm py-4">No hay turnos en ese rango de fechas.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;