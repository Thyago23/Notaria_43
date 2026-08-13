import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TRAMITES_DATA } from '../data/tramites';

const Booking = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

  const categories = Object.keys(groupedTramites);
  const displayTramites = selectedCategory
    ? { [selectedCategory]: groupedTramites[selectedCategory] }
    : groupedTramites;

  return (
    <div className="bg-light min-h-screen py-8 px-4 sm:py-12 sm:px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-dark text-left">
            Catálogo de Trámites
          </h1>

          {/* Category menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-[#8cc550] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#8cc550]"
          >
            <span className="sr-only">Abrir menú de categorías</span>
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
          Seleccione el trámite que desea realizar para conocer los requisitos detallados y agendar su cita notarial.
        </p>

        {/* Category menu dropdown */}
        {mobileMenuOpen && (
          <div className="mb-6 bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Filtrar por categoría
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${selectedCategory === null
                      ? 'bg-[#8cc550] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  Todas las categorías
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${selectedCategory === category
                        ? 'bg-[#8cc550] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Cancelar Cita - Card destacada */}
        <div className="max-w-7xl mx-auto mb-6 sm:mb-8">
          <Link
            to="/cancelar"
            className="block bg-white border border-gray-200 rounded-xl p-4 sm:p-6 hover:border-[#8cc550] hover:shadow-md transition-all group"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-[#8cc550]/10 transition-colors flex-shrink-0">
                  <svg className="w-6 h-6 text-gray-500 group-hover:text-[#8cc550] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 group-hover:text-[#8cc550] transition-colors">
                    ¿Necesita cancelar una cita?
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Ingrese con el código de turno de su comprobante PDF para liberar su cita
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-gray-500 group-hover:text-[#8cc550] transition-colors sm:self-start">
                <span className="text-sm font-medium">Gestionar cita</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        <div className="max-w-xl mx-auto mb-8 sm:mb-12 relative">
          <input
            type="text"
            placeholder="Buscar trámite (ej. compraventa, divorcio...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 sm:px-5 py-3 sm:py-4 pl-10 sm:pl-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm text-gray-700 text-sm sm:text-base"
          />
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <div className="space-y-8 sm:space-y-12">
          {Object.keys(displayTramites).length === 0 && (
            <div className="text-center py-8 sm:py-12 bg-white rounded-lg border border-dashed border-gray-300">
              <svg className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-base sm:text-lg text-gray-600 font-medium">No se encontraron trámites</p>
              <p className="text-sm text-gray-500 mt-1">Intenta buscar con otros términos.</p>
            </div>
          )}

          {Object.entries(displayTramites).map(([categoria, tramites]) => (
            <div key={categoria}>
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 sm:mb-6 border-b border-gray-200 pb-2">
                {categoria}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {tramites.map((tramite) => (
                  <Link
                    key={tramite.id}
                    to={`/tramites/${tramite.id}`}
                    className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4 sm:p-6 border border-gray-100 flex flex-col justify-between group"
                  >
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg text-dark mb-2 group-hover:text-primary transition-colors">
                        {tramite.nombre}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 mb-4">
                        Requisitos: {tramite.requisitos.length} documentos
                      </p>
                    </div>
                    <div className="text-secondary font-medium text-xs sm:text-sm flex items-center">
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

export default Booking;
