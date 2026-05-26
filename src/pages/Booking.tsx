import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TRAMITES_DATA } from '../data/tramites';

const Tramites = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTramites = TRAMITES_DATA.filter(tramite => 
    tramite.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
    tramite.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group tramites by category
  const groupedTramites = filteredTramites.reduce((acc, tramite) => {
    if (!acc[tramite.categoria]) {
      acc[tramite.categoria] = [];
    }
    acc[tramite.categoria].push(tramite);
    return acc;
  }, {} as Record<string, typeof TRAMITES_DATA>);

  return (
    <div className="bg-light min-h-screen py-12 px-4 md:px-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-dark mb-4 text-center">
          Catálogo de Trámites
        </h1>
        <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
          Seleccione el trámite que desea realizar para conocer los requisitos detallados y agendar su cita notarial.
        </p>

        <div className="max-w-xl mx-auto mb-12 relative">
          <input 
            type="text" 
            placeholder="Buscar trámite (ej. compraventa, divorcio...)" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-4 pl-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm text-gray-700"
          />
          <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <div className="space-y-12">
          {Object.keys(groupedTramites).length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-lg text-gray-600 font-medium">No se encontraron trámites</p>
              <p className="text-sm text-gray-500 mt-1">Intenta buscar con otros términos.</p>
            </div>
          )}

          {Object.entries(groupedTramites).map(([categoria, tramites]) => (
            <div key={categoria}>
              <h2 className="text-2xl font-bold text-primary mb-6 border-b border-gray-200 pb-2">
                {categoria}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tramites.map((tramite) => (
                  <Link 
                    key={tramite.id} 
                    to={`/tramites/${tramite.id}`}
                    className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6 border border-gray-100 flex flex-col justify-between group"
                  >
                    <div>
                      <h3 className="font-semibold text-lg text-dark mb-2 group-hover:text-primary transition-colors">
                        {tramite.nombre}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Requisitos: {tramite.requisitos.length} documentos
                      </p>
                    </div>
                    <div className="text-secondary font-medium text-sm flex items-center">
                      Ver requisitos y agendar
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tramites;
