import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiClient } from '../api/client';

interface Cita {
  id: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  status: 'PENDIENTE' | 'ATENDIDO' | 'CANCELADO';
  notas: string | null;
  createdAt?: string;
  user?: {
    id: string;
    cedula: string;
    nombres: string;
    apellidos: string;
  } | null;
  atendidoPor?: {
    id: string;
    nombres: string;
    apellidos: string;
  } | null;
  canceladoPor?: {
    id: string;
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
  const [selectedCita, setSelectedCita] = useState<Cita | null>(null);
  const [activeTab, setActiveTab] = useState<'PENDIENTE' | 'ATENDIDO' | 'CANCELADO' | 'TODOS'>('PENDIENTE');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setCurrentPage(1);
  }, [filterTramite, filterCliente]);

  // Estado del modal de reporte
  const [showReporteModal, setShowReporteModal] = useState(false);
  const [reporteFechaInicio, setReporteFechaInicio] = useState('');
  const [reporteFechaFin, setReporteFechaFin] = useState('');
  const [reporteStatus, setReporteStatus] = useState('');
  const [reporteData, setReporteData] = useState<ReporteData | null>(null);
  const [reporteLoading, setReporteLoading] = useState(false);
  const [reporteError, setReporteError] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if ((location.state as any)?.openReport) {
      setShowReporteModal(true);
      // Limpiar el estado para que no se vuelva a abrir al recargar la página
      navigate('/admin/citas', { replace: true, state: {} });
    }
  }, [location, navigate]);

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
      t.user ? `${t.user.nombres} ${t.user.apellidos}` : t.guest_nombre,
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
    const tabMatch = activeTab === 'TODOS' || cita.status === activeTab;
    return tramiteMatch && clienteMatch && tabMatch;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCitas = filteredCitas.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCitas.length / itemsPerPage);

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

      {/* Filtros y Tabs */}
      <div className="bg-white p-4 rounded-lg shadow flex flex-col gap-4">
        {/* Tabs responsive (Select en móvil, Tabs en desktop) */}
        <div className="mb-4">
          {/* Vista Móvil (Custom Dropdown) */}
          <div className="sm:hidden mb-4 relative z-20">
            <label className="sr-only">Selecciona un estado</label>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative w-full cursor-pointer rounded-lg bg-white py-3 pl-4 pr-10 text-left border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all"
            >
              <span className="block truncate font-medium text-gray-700">
                {activeTab === 'PENDIENTE' ? 'Pendientes' : 
                 activeTab === 'ATENDIDO' ? 'Atendidas' : 
                 activeTab === 'CANCELADO' ? 'Canceladas' : 'Todas'}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                <svg className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </span>
            </button>

            {isMobileMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  aria-hidden="true" 
                ></div>
                <ul className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm border border-gray-100">
                  {['PENDIENTE', 'ATENDIDO', 'CANCELADO', 'TODOS'].map((tab) => (
                    <li
                      key={tab}
                      className={`relative cursor-pointer select-none py-3 pl-4 pr-9 hover:bg-green-50 hover:text-[#8cc550] transition-colors ${activeTab === tab ? 'bg-green-50 text-[#8cc550] font-semibold' : 'text-gray-700'}`}
                      onClick={() => {
                        setActiveTab(tab as any);
                        setCurrentPage(1);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <span className="block truncate">
                        {tab === 'PENDIENTE' ? 'Pendientes' : 
                         tab === 'ATENDIDO' ? 'Atendidas' : 
                         tab === 'CANCELADO' ? 'Canceladas' : 'Todas'}
                      </span>
                      {activeTab === tab ? (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#8cc550]">
                          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                          </svg>
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          
          {/* Vista Desktop */}
          <div className="hidden sm:block border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {['PENDIENTE', 'ATENDIDO', 'CANCELADO', 'TODOS'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab as any); setCurrentPage(1); }}
                  className={`
                    whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                    ${activeTab === tab 
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                  `}
                >
                  {tab === 'PENDIENTE' ? 'Pendientes' : 
                   tab === 'ATENDIDO' ? 'Atendidas' : 
                   tab === 'CANCELADO' ? 'Canceladas' : 'Todas'}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-2">
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
      </div>

      {/* Tabla de Citas */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
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
            {currentCitas.map((cita) => (
              <tr key={cita.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedCita(cita)}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {cita.user ? `${cita.user.nombres} ${cita.user.apellidos}` : cita.guest_nombre}
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
                    <div onClick={(e) => e.stopPropagation()}>
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
                    </div>
                  )}
                  {cita.status === 'ATENDIDO' && <span className="text-green-600 text-sm font-medium">✓ Atendido</span>}
                  {cita.status === 'CANCELADO' && <span className="text-red-600 text-sm font-medium">✗ Cancelado</span>}
                </td>
              </tr>
            ))}
            {currentCitas.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500 text-sm">
                  No se encontraron citas con esos filtros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white px-4 py-3 border border-gray-200 rounded-lg shadow mt-4 gap-4">
          <div className="text-sm text-gray-600 text-center sm:text-left w-full sm:w-auto">
            Mostrando {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, filteredCitas.length)} de {filteredCitas.length} resultados
          </div>
          <div className="w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px w-max" aria-label="Pagination">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                Anterior
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`relative inline-flex items-center px-3 sm:px-4 py-2 border text-sm font-medium ${
                    currentPage === page
                      ? 'z-10 bg-primary border-primary text-white'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                Siguiente
              </button>
            </nav>
          </div>
        </div>
      )}

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
                                    {t.user ? `${t.user.nombres} ${t.user.apellidos}` : t.guest_nombre}
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

      {/* Modal de Detalles de Cita */}
      {selectedCita && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedCita(null)}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-dark">Detalles de la Cita</h2>
              <button onClick={() => setSelectedCita(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase">Trámite</p>
                <p className="text-sm font-medium text-gray-900">{selectedCita.tramite.nombre}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase">Cliente</p>
                <p className="text-sm text-gray-900">{selectedCita.user ? `${selectedCita.user.nombres} ${selectedCita.user.apellidos}` : selectedCita.guest_nombre}</p>
                <p className="text-sm text-gray-500">{selectedCita.user?.cedula || selectedCita.guest_email || 'N/A'}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase">Fecha Agendada</p>
                  <p className="text-sm text-gray-900">{new Date(selectedCita.fecha).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase">Hora</p>
                  <p className="text-sm text-gray-900">{selectedCita.horaInicio} - {selectedCita.horaFin}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase">Generada El</p>
                <p className="text-sm text-gray-900">{selectedCita.createdAt ? new Date(selectedCita.createdAt).toLocaleString() : 'N/A'}</p>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  selectedCita.status === 'ATENDIDO' ? 'bg-green-100 text-green-800' :
                  selectedCita.status === 'CANCELADO' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  ESTADO: {selectedCita.status}
                </span>
              </div>

              {selectedCita.status === 'ATENDIDO' && selectedCita.atendidoPor && (
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase">Atendida Por</p>
                  <p className="text-sm text-gray-900">{selectedCita.atendidoPor.nombres} {selectedCita.atendidoPor.apellidos}</p>
                </div>
              )}

              {selectedCita.status === 'CANCELADO' && selectedCita.canceladoPor && (
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase">Cancelada Por</p>
                  <p className="text-sm text-gray-900">{selectedCita.canceladoPor.nombres} {selectedCita.canceladoPor.apellidos}</p>
                </div>
              )}
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedCita(null)}
                className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;