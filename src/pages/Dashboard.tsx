import { useState } from 'react';

const MOCK_CITAS = [
  { id: '1', cliente: 'Juan Pérez', email: 'juan@ejemplo.com', tramite: 'Escrituras', fecha: '2026-05-15T10:00:00', estado: 'Pendiente' },
  { id: '2', cliente: 'María Gómez', email: 'maria@ejemplo.com', tramite: 'Poderes', fecha: '2026-05-16T11:30:00', estado: 'Completada' },
  { id: '3', cliente: 'Carlos Ruiz', email: 'carlos@ejemplo.com', tramite: 'Testamentos', fecha: '2026-05-18T09:00:00', estado: 'Pendiente' },
];

const Dashboard = () => {
  const [filterTramite, setFilterTramite] = useState('');
  const [filterCliente, setFilterCliente] = useState('');

  const filteredCitas = MOCK_CITAS.filter(cita => 
    cita.tramite.toLowerCase().includes(filterTramite.toLowerCase()) &&
    cita.cliente.toLowerCase().includes(filterCliente.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading font-bold text-dark">Panel Administrativo</h1>
        <button className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded text-sm font-medium transition-colors">
          Cerrar Sesión
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col md:flex-row gap-4">
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
                  <div className="text-sm font-medium text-gray-900">{cita.cliente}</div>
                  <div className="text-sm text-gray-500">{cita.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{cita.tramite}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{new Date(cita.fecha).toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${cita.estado === 'Completada' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {cita.estado}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-primary hover:text-primary-hover mr-3">Editar</button>
                  <button className="text-red-600 hover:text-red-900">Cancelar</button>
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
