import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-100 py-4 px-6 md:px-12 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="text-3xl font-heading font-bold text-dark tracking-tight">
        Notaria 43
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-8">
        <Link to="/" className="text-sm font-semibold text-gray-600 hover:text-primary transition-colors">Inicio</Link>
        <Link to="/sobre-nosotros" className="text-sm font-semibold text-gray-600 hover:text-primary transition-colors">Sobre la notaría</Link>
        <Link to="/booking" className="text-sm font-semibold text-gray-600 hover:text-primary transition-colors">Trámites y documentos</Link>
        <a href="/LISTADEPRECIOSAÑO2026.pdf" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-gray-600 hover:text-primary transition-colors">Tarifas</a>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center space-x-4">
        <Link
          to="/login"
          className="bg-[#b89369] hover:bg-[#a5845e] text-white font-medium py-3 px-8 text-sm uppercase tracking-wider transition-colors"
        >
          ACCEDER
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
