import { useState, useEffect } from 'react';
import { apiClient } from '../api/client';
import { Link } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminHome = () => {
  const [resumen, setResumen] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [actividadReciente, setActividadReciente] = useState<any[]>([]);
  const [barChartData, setBarChartData] = useState<any[]>([]);
  const [sparklineData, setSparklineData] = useState<any[]>([{value: 0}]);
  const [failedEmails, setFailedEmails] = useState<any[]>([]);
  const [failedEmailsPagination, setFailedEmailsPagination] = useState({
    total: 0,
    page: 1,
    limit: 3,
    totalPages: 0,
  });
  const [selectedFailedEmail, setSelectedFailedEmail] = useState<any>(null);

  useEffect(() => {
    fetchResumen();
  }, []);

  const fetchFailedEmails = async (page: number) => {
    try {
      const emailsResponse = await apiClient.get(`/notificaciones/failed?page=${page}&limit=3`);
      setFailedEmails(emailsResponse.data.data || []);
      setFailedEmailsPagination(emailsResponse.data.pagination || {
        total: 0,
        page: 1,
        limit: 3,
        totalPages: 0,
      });
    } catch (emailError) {
      console.error('Error fetching failed emails:', emailError);
    }
  };

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
      const data = response.data.data;

      // Fetch failed emails with pagination
      try {
        const emailsResponse = await apiClient.get('/notificaciones/failed?page=1&limit=3');
        setFailedEmails(emailsResponse.data.data || []);
        setFailedEmailsPagination(emailsResponse.data.pagination || {
          total: 0,
          page: 1,
          limit: 3,
          totalPages: 0,
        });
      } catch (emailError) {
        console.error('Error fetching failed emails:', emailError);
        setFailedEmails([]);
      }
      
      setResumen(data.resumen);
      
      // Procesar turnos reales
      const turnos: any[] = data.turnos || [];
      
      // 1. Actividad Reciente (últimos 5)
      const sortedTurnos = [...turnos].sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
      const recent = sortedTurnos.slice(0, 5).map(t => {
        const d = new Date(t.fecha);
        const day = d.getDate().toString().padStart(2, '0');
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const year = d.getFullYear();
        
        const timeD = new Date(t.horaInicio);
        const hours = timeD.getUTCHours();
        const minutes = timeD.getUTCMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const timeString = `${formattedHours}:${formattedMinutes} ${ampm}`;

        const isAtendido = t.status === 'ATENDIDO';
        const color = isAtendido ? 'bg-green-100 text-green-600' : 
                      t.status === 'CANCELADO' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600';
        const icon = isAtendido ? 'M5 13l4 4L19 7' : 
                     t.status === 'CANCELADO' ? 'M6 18L18 6M6 6l12 12' : 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z';
        
        const clienteName = t.user ? `${t.user.nombres} ${t.user.apellidos}` : t.guestNombre;
        const statusText = t.status.charAt(0) + t.status.slice(1).toLowerCase();

        return {
          id: t.id,
          tramite: t.tramite?.nombre || 'Trámite General',
          cliente: clienteName,
          estado: statusText,
          fecha: `${day}/${month}/${year}\n${timeString}`,
          color,
          icon
        };
      });
      setActividadReciente(recent);

      // 2. Bar Chart Data (agrupado por fecha)
      const countsByDate: Record<string, number> = {};
      const sortedForChart = [...turnos].sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
      
      sortedForChart.forEach(t => {
        const d = new Date(t.fecha);
        const day = d.getDate().toString().padStart(2, '0');
        const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
        const month = monthNames[d.getMonth()];
        const key = `${day} ${month}`;
        countsByDate[key] = (countsByDate[key] || 0) + 1;
      });
      
      const bData = Object.keys(countsByDate).map(key => ({
        name: key,
        turnos: countsByDate[key]
      }));
      setBarChartData(bData.length > 0 ? bData : [{ name: 'Sin datos', turnos: 0 }]);

      // 3. Sparkline Data
      const sData = bData.map(d => ({ value: d.turnos }));
      setSparklineData(sData.length > 0 ? sData : [{ value: 0 }]);

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
      {/* Hero Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Notaría 43</h1>
        <p className="text-gray-500 mt-1">Comprometidos con la seguridad jurídica y la confianza de nuestros clientes.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {failedEmails.length > 0 && (
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-amber-900">
                    Alerta de Notificaciones Fallidas
                  </h3>
                  <p className="text-sm text-amber-700 mt-1">
                    {failedEmailsPagination.total} notificación(es) por correo no pudieron ser entregada(s)
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                  Requiere atención
                </span>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm font-medium text-amber-800 mb-3">Clientes a contactar manualmente:</p>
              <div className="bg-white rounded-lg border border-amber-200 divide-y divide-amber-100">
                {failedEmails.length === 0 ? (
                  <div className="p-8 text-center">
                    <p className="text-sm text-gray-500">No hay notificaciones fallidas en esta página</p>
                  </div>
                ) : (
                  failedEmails.map((email: any) => (
                    <div key={email.id} className="p-4 flex items-center justify-between hover:bg-amber-50 transition-colors">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{email.subject}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <p className="text-xs text-gray-500 flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {email.to}
                          </p>
                          {email.lastError && (
                            <p className="text-xs text-amber-600 flex items-center">
                              <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {email.lastError.substring(0, 50)}...
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <button 
                          onClick={() => setSelectedFailedEmail(email)}
                          className="text-xs text-amber-600 hover:text-amber-800 font-medium"
                        >
                          Ver detalles
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Pagination Controls */}
              {failedEmailsPagination.totalPages > 1 && (
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    Página {failedEmailsPagination.page} de {failedEmailsPagination.totalPages} ({failedEmailsPagination.total} total)
                  </p>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => fetchFailedEmails(failedEmailsPagination.page - 1)}
                      disabled={failedEmailsPagination.page === 1}
                      className="px-3 py-1 text-sm border border-amber-200 rounded-md hover:bg-amber-50 disabled:opacity-50 disabled:cursor-not-allowed text-amber-700"
                    >
                      Anterior
                    </button>
                    <button
                      onClick={() => fetchFailedEmails(failedEmailsPagination.page + 1)}
                      disabled={failedEmailsPagination.page === failedEmailsPagination.totalPages}
                      className="px-3 py-1 text-sm border border-amber-200 rounded-md hover:bg-amber-50 disabled:opacity-50 disabled:cursor-not-allowed text-amber-700"
                    >
                      Siguiente
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs text-amber-600">
                <svg className="w-4 h-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Se recomienda contactar a estos clientes por teléfono para confirmar sus citas
              </p>
            </div>
          </div>
        </div>
      )}

      {resumen && (
        <>
          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 left-0 bottom-0 w-1 bg-blue-500"></div>
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Turnos</h2>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{resumen.totalTurnos}</p>
                </div>
              </div>
              <div className="mt-4 h-12">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sparklineData}>
                    <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-gray-400 mt-2">Últimos 30 días</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col relative overflow-hidden">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-500 shrink-0 border border-yellow-100">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Pendientes</h2>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{resumen.turnosPendientes}</p>
                </div>
              </div>
              <div className="mt-4 h-12">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sparklineData}>
                    <Line type="monotone" dataKey="value" stroke="#eab308" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-gray-400 mt-2">Últimos 30 días</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col relative overflow-hidden">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-500 shrink-0 border border-green-100">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Atendidos</h2>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{resumen.turnosAtendidos}</p>
                </div>
              </div>
              <div className="mt-4 h-12">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sparklineData}>
                    <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-gray-400 mt-2">Últimos 30 días</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col relative overflow-hidden">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-500 shrink-0 border border-red-100">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Cancelados</h2>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{resumen.turnosCancelados}</p>
                </div>
              </div>
              <div className="mt-4 h-12 relative flex items-center">
                 <div className="w-full border-t border-red-500 mt-4"></div>
              </div>
              <p className="text-xs text-gray-400 mt-2">Últimos 30 días</p>
            </div>
          </div>

          {/* Grid Inferior */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Actividad Reciente */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-50 rounded flex items-center justify-center text-green-600">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Actividad reciente</h2>
                </div>
                <div className="relative">
                  <select className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2 pr-8 outline-none">
                    <option>Últimos 7 días</option>
                    <option>Últimos 30 días</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50 rounded-lg">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-l-lg">Trámite</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-r-lg">Fecha</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {actividadReciente.map((actividad) => (
                      <tr key={actividad.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${actividad.color}`}>
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={actividad.icon} />
                              </svg>
                            </div>
                            <span className="text-sm font-medium text-gray-900">{actividad.tramite}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{actividad.cliente}</td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-md border ${
                            actividad.estado === 'Atendido' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                          }`}>
                            {actividad.estado === 'Atendido' && <svg className="w-3 h-3 mr-1 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                            {actividad.estado === 'Pendiente' && <svg className="w-3 h-3 mr-1 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                            {actividad.estado}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-900 font-medium whitespace-pre-line text-right sm:text-left">
                          {actividad.fecha}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 flex justify-center">
                <Link to="/admin/citas" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-50 transition-colors">
                  Ver todos los trámites
                  <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              {/* Resumen Chart */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex-1">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-50 rounded flex items-center justify-center text-blue-600">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h2 className="text-lg font-bold text-gray-900">Resumen de Turnos</h2>
                  </div>
                  <div className="relative">
                    <select className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-primary focus:border-primary block p-1.5 pr-7 outline-none">
                      <option>30 días</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>
                <div className="h-48 w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barChartData} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280' }} />
                      <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                      <Bar dataKey="turnos" fill="#60a5fa" radius={[4, 4, 4, 4]} barSize={12} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Acciones Rápidas */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-blue-50 rounded flex items-center justify-center text-blue-600">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Acciones rápidas</h2>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  <Link to="/admin/citas" className="flex flex-col items-center justify-center p-3 border border-gray-100 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all text-center group">
                    <div className="w-10 h-10 flex items-center justify-center text-green-500 mb-2">
                      <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11v6m-3-3h6" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-medium text-gray-700 leading-tight">Nueva Cita</span>
                  </Link>
                  <Link to="/admin/tramites" className="flex flex-col items-center justify-center p-3 border border-gray-100 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all text-center group">
                    <div className="w-10 h-10 flex items-center justify-center text-blue-500 mb-2">
                      <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-medium text-gray-700 leading-tight">Nuevo<br/>Trámite</span>
                  </Link>
                  <Link to="/admin/asignacion" className="flex flex-col items-center justify-center p-3 border border-gray-100 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all text-center group">
                    <div className="w-10 h-10 flex items-center justify-center text-purple-500 mb-2">
                      <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-medium text-gray-700 leading-tight">Asignación</span>
                  </Link>
                  <button className="flex flex-col items-center justify-center p-3 border border-gray-100 rounded-xl hover:border-yellow-300 hover:bg-yellow-50 transition-all text-center group">
                    <div className="w-10 h-10 flex items-center justify-center text-yellow-500 mb-2">
                      <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-medium text-gray-700 leading-tight">Reportes</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Modal Detalles Notificación */}
      {selectedFailedEmail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Detalles de Notificación</h3>
              <button onClick={() => setSelectedFailedEmail(null)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Asunto</p>
                <p className="text-sm text-gray-900 mt-1">{selectedFailedEmail.subject}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Destinatario</p>
                <p className="text-sm text-gray-900 mt-1">{selectedFailedEmail.to}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Error Reportado</p>
                <div className="mt-1 bg-red-50 p-3 rounded-md border border-red-100">
                  <p className="text-sm text-red-700 font-mono break-all">
                    {selectedFailedEmail.lastError || 'No se registró un error específico'}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setSelectedFailedEmail(null)}
                className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 text-sm font-medium transition-colors"
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

export default AdminHome;
