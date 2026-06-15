import { useState, useEffect } from 'react';
import { apiClient } from '../api/client';
import { Link } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminHome = () => {
  const [resumen, setResumen] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock data for charts
  const sparklineData = [
    { value: 1 }, { value: 2 }, { value: 1 }, { value: 3 }, { value: 2 }, { value: 4 }, { value: 3 }
  ];

  const barChartData = [
    { name: '20 May', turnos: 1.2 },
    { name: '21 May', turnos: 2 },
    { name: '22 May', turnos: 1.2 },
    { name: '23 May', turnos: 0 },
    { name: '24 May', turnos: 1.6 },
    { name: '25 May', turnos: 2.2 },
    { name: '26 May', turnos: 0.9 },
    { name: '27 May', turnos: 0.6 },
    { name: '30 May', turnos: 2 },
    { name: '31 May', turnos: 1.2 },
    { name: '04 Jun', turnos: 3.6 },
    { name: '05 Jun', turnos: 2.6 },
    { name: '06 Jun', turnos: 1.6 }
  ];

  const actividadReciente = [
    { id: 1, tramite: 'Escritura de Compraventa', cliente: 'Juan Pérez', estado: 'Atendido', fecha: '02/06/2025\n10:30 AM', color: 'bg-blue-100 text-blue-600', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 2, tramite: 'Poder Especial', cliente: 'Ana González', estado: 'Pendiente', fecha: '03/06/2025\n11:15 AM', color: 'bg-yellow-100 text-yellow-600', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 3, tramite: 'Declaración Juramentada', cliente: 'Carlos López', estado: 'Atendido', fecha: '01/06/2025\n09:45 AM', color: 'bg-blue-100 text-blue-600', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 4, tramite: 'Legalización de Firmas', cliente: 'María Rodríguez', estado: 'Pendiente', fecha: '03/06/2025\n02:00 PM', color: 'bg-purple-100 text-purple-600', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' }
  ];

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
                <Link to="/admin/asignacion" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-50 transition-colors">
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
    </div>
  );
};

export default AdminHome;
