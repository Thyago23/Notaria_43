import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-100 py-4 px-6 md:px-12 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="text-3xl font-heading font-bold text-dark tracking-tight">
        Notaria 43
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-8">
        <Link to="/" className="text-sm font-semibold text-gray-600 hover:text-[#8cc550] transition-colors">Inicio</Link>
        <Link to="/sobre-nosotros" className="text-sm font-semibold text-gray-600 hover:text-[#8cc550] transition-colors">Sobre la notaría</Link>
        <Link to="/abogados" className="text-sm font-semibold text-gray-600 hover:text-[#8cc550] transition-colors">Abogados</Link>
        <Link to="/booking" className="text-sm font-semibold text-gray-600 hover:text-[#8cc550] transition-colors">Trámites y documentos</Link>
        <a href="/LISTADEPRECIOSAÑO2026.pdf" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-gray-600 hover:text-[#8cc550] transition-colors">Tarifas</a>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <>
            <Link
              to="/admin/dashboard"
              className="text-sm font-semibold text-gray-600 hover:text-[#8cc550] transition-colors uppercase tracking-wider"
            >
              PANEL ADMINISTRATIVO
            </Link>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-8 text-sm uppercase tracking-wider transition-colors"
            >
              CERRAR SESIÓN
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-[#8cc550] hover:bg-[#7ab345] text-white font-medium py-3 px-8 text-sm uppercase tracking-wider transition-colors"
          >
            ACCEDER
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
