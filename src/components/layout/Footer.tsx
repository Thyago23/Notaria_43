import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const services = [
    'Cancelación de hipoteca',
    'Compra - venta',
    'Constitución de hipoteca',
    'Declaración juramentada Invitación cubanos',
    'Declaración juramentada de expensas',
    'Extinción de patrimonio familiar',
    'Permiso de salida',
    'Posesión efectiva',
    'Promesa de compra venta',
    'Requisitos 1er Garantías económicas',
    'Requisitos para compra venta vehículo',
    'Testamento',
    'Y otros servicios'
  ];

  return (
    <footer className="bg-dark text-white pt-16 pb-8 border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Brand & Socials */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start space-y-6">
            <Link to="/" className="text-3xl font-heading font-bold tracking-tight text-white">
              Notaría <span className="text-[#b89369]">43</span>
            </Link>
            <p className="text-gray-400 text-sm text-center md:text-left max-w-xs leading-relaxed">
              Seguridad, transparencia y confianza jurídica en el Valle de Los Chillos.
            </p>
            
            {/* Social Icons with Elegant Circular Outlines */}
            <div className="flex space-x-4 pt-2">
              {/* Facebook */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:text-[#b89369] hover:border-[#b89369] transition-all duration-300 transform hover:scale-105"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6c0-.88.39-1 1-1h2V2h-3c-2.9 0-4 1.55-4 3.5V8z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:text-[#b89369] hover:border-[#b89369] transition-all duration-300 transform hover:scale-105"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              {/* WhatsApp */}
              <a 
                href="https://wa.me/5932868248" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:text-[#b89369] hover:border-[#b89369] transition-all duration-300 transform hover:scale-105"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.739-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.588 2.015 14.12 1.014 11.5 1.014 6.066 1.014 1.64 5.385 1.636 10.812c-.001 1.708.452 3.378 1.311 4.869l-1.02 3.722 3.82 1.002z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Middle Column: Services (with Border Divider) */}
          <div className="md:col-span-5 border-t md:border-t-0 md:border-r border-gray-700/60 pt-8 md:pt-0 md:pr-8">
            <h3 className="text-xl font-heading font-bold text-white mb-6 text-center md:text-left tracking-wide">
              Servicios
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-400">
              {services.map((service, index) => (
                <li 
                  key={index}
                  className="flex items-center space-x-2 hover:text-[#b89369] transition-colors duration-200 cursor-pointer py-1"
                >
                  <span className="w-1.5 h-1.5 bg-[#b89369] rounded-full shrink-0"></span>
                  <span className="truncate">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Contact & Location */}
          <div className="md:col-span-4 space-y-6 pt-8 md:pt-0">
            <h3 className="text-xl font-heading font-bold text-white leading-tight">
              La Notaría <span className="text-[#b89369] font-medium font-sans italic text-lg font-semibold block sm:inline">cuadragésima tercera</span> del cantón Quito
            </h3>
            
            <div className="space-y-4 text-sm text-gray-400">
              {/* Clickable Address that opens Google Maps */}
              <a 
                href="https://maps.app.goo.gl/rPLSRBUJtjfbNHpx6" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start space-x-3 group hover:text-white transition-colors duration-200"
              >
                <svg className="w-5 h-5 text-[#b89369] group-hover:scale-110 transition-transform shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <div className="space-y-1">
                  <span className="font-semibold text-white block">Dirección:</span>
                  <span className="block leading-relaxed group-hover:underline">
                    Av. Ilalo Y Rio Tivacuno Oe11-323, Vía Al Tingo (Valle De Los Chillos), Quito, Pichincha
                  </span>
                </div>
              </a>

              {/* Telephone */}
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-[#b89369] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <div>
                  <span className="font-semibold text-white block">Teléfono:</span>
                  <a href="tel:02868248" className="hover:text-white transition-colors">(02) 868-248</a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-[#b89369] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <div>
                  <span className="font-semibold text-white block">Correo Electrónico:</span>
                  <a href="mailto:contacto@notaria43.com" className="hover:text-[#b89369] transition-colors">contacto@notaria43.com</a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-800">
              <Link to="#" className="text-sm text-gray-500 hover:text-white transition-colors">
                Política de Privacidad
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Notaría 43 del cantón Quito. Todos los derechos reservados.</p>
          <p className="mt-2 sm:mt-0">Diseñado con excelencia y seguridad jurídica</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
