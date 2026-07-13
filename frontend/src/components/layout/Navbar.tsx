import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 relative z-50">
      <div className="py-4 px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-3xl font-heading font-bold text-dark tracking-tight">
          Notaria 43
        </Link>

        {/* Hamburger Menu Button - All screen sizes */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-600 hover:text-[#8cc550] focus:outline-none p-2 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          <span className="sr-only">Abrir menú</span>
          <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            {isMobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12"></path>
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            )}
          </svg>
        </button>
      </div>

      {/* Menu Dropdown - All screen sizes */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-lg flex flex-col px-6 py-4 space-y-4 z-50">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-semibold text-gray-600 hover:text-[#8cc550] transition-colors">Inicio</Link>
          <Link to="/sobre-nosotros" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-semibold text-gray-600 hover:text-[#8cc550] transition-colors">Sobre la notaría</Link>
          <Link to="/abogados" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-semibold text-gray-600 hover:text-[#8cc550] transition-colors">Abogados</Link>
          <Link to="/booking" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-semibold text-gray-600 hover:text-[#8cc550] transition-colors">Trámites y documentos</Link>
          <a href="/LISTADEPRECIOSAÑO2026.pdf" target="_blank" rel="noopener noreferrer" className="text-base font-semibold text-gray-600 hover:text-[#8cc550] transition-colors">Tarifas</a>
          
          <div className="pt-4 border-t border-gray-100 flex flex-col space-y-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/admin/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-center text-sm font-semibold text-gray-600 hover:text-[#8cc550] uppercase tracking-wider py-2 transition-colors"
                >
                  PANEL ADMINISTRATIVO
                </Link>
                <button
                  onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                  className="w-full bg-slate-600 hover:bg-slate-700 text-white font-medium py-3 px-8 text-sm uppercase tracking-wider rounded transition-colors"
                >
                  CERRAR SESIÓN
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center bg-[#8cc550] hover:bg-[#7ab345] text-white font-medium py-3 px-8 text-sm uppercase tracking-wider rounded transition-colors"
              >
                ACCEDER
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
