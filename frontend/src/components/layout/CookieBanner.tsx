import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-dark text-white p-4 shadow-xl z-50 border-t border-[#8cc550]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-300">
          Utilizamos cookies propias para mejorar nuestros servicios y su experiencia en el sitio. 
          Al continuar navegando, consideramos que acepta su uso. 
          Puede leer más sobre esto en nuestra{' '}
          <Link to="/politica-cookies" className="text-[#8cc550] hover:underline font-semibold">
            Política de Cookies
          </Link>.
        </p>
        <button
          onClick={handleAccept}
          className="bg-[#8cc550] hover:bg-[#7ab043] text-gray-900 px-6 py-2 rounded-md font-semibold transition-colors duration-200 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#8cc550] focus:ring-offset-2 focus:ring-offset-dark"
        >
          Aceptar Cookies
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
