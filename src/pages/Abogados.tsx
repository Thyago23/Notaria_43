import React from 'react';
import { Link } from 'react-router-dom';

interface Administrator {
  name: string;
  title: string;
  email: string;
  image: string;
}

const staff: Administrator[] = [
  {
    name: 'Mgs. Dr. Fernando Iván Castro Salazar',
    title: 'Notario Principal',
    email: 'contacto@notaria43.com',
    image: '/AdministradoresDeLaNotaria43/Mgs.Dr.Fernando Iván Castro Salazar.jpeg'
  },
  {
    name: 'Dra. Fernanda Rojas',
    title: 'Asesora Jurídica / Abogada de Familia',
    email: 'contacto@notaria43.com',
    image: '/AdministradoresDeLaNotaria43/Fernanda Rojas.jpeg'
  },
  {
    name: 'Ab. Joao Aguirre',
    title: 'Asesor Legal / Especialista en Derecho Civil',
    email: 'contacto@notaria43.com',
    image: '/AdministradoresDeLaNotaria43/Joao Aguirre.jpeg'
  },
  {
    name: 'Ab. Marcos Simbaña',
    title: 'Especialista en Derecho Inmobiliario',
    email: 'contacto@notaria43.com',
    image: '/AdministradoresDeLaNotaria43/Marcos Simbaña .jpeg'
  },
  {
    name: 'Dr. Rodrigo Roman',
    title: 'Especialista en Trámites Societarios',
    email: 'contacto@notaria43.com',
    image: '/AdministradoresDeLaNotaria43/Rodrigo Roman .jpeg'
  },
  {
    name: 'Dra. Veronica Toapanta',
    title: 'Asistente Jurídica / Especialista de Actas',
    email: 'contacto@notaria43.com',
    image: '/AdministradoresDeLaNotaria43/Veronica Toapanta .jpeg'
  }
];

const Abogados: React.FC = () => {
  return (
    <div className="w-full bg-[#fcfbfa] py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs / Header */}
        <div className="mb-12 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-2 text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-primary transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">Equipo Profesional</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-dark mb-4">
            Nuestro <span className="text-primary">Equipo Profesional</span>
          </h1>
          <p className="text-gray-600 max-w-2xl leading-relaxed">
            Conozca a los profesionales y administradores de la Notaría 43 capacitados para brindarle la mejor asesoría legal y administrativa en sus trámites.
          </p>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {staff.map((admin, index) => (
            <div 
              key={index}
              className="flex flex-col bg-white border border-gray-100 hover:border-primary/20 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Photo Container */}
              <div className="h-80 overflow-hidden bg-gray-50 relative group">
                <img
                  src={admin.image}
                  alt={admin.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback in case of loading issues
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white text-xs font-semibold uppercase tracking-wider bg-primary px-3 py-1.5 rounded-full">
                    Contacto Notarial
                  </span>
                </div>
              </div>

              {/* Info Container */}
              <div className="p-6 md:p-8 flex flex-col flex-grow text-center">
                <h3 className="text-xl font-heading font-bold text-dark mb-2">
                  {admin.name}
                </h3>
                <span className="text-[#b89369] font-semibold text-sm tracking-wider uppercase mb-6 block">
                  {admin.title}
                </span>

                <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col items-center">
                  <span className="text-xs text-gray-400 uppercase tracking-widest mb-1">Correo de la Notaría</span>
                  <a 
                    href={`mailto:${admin.email}`}
                    className="text-sm font-semibold text-gray-600 hover:text-primary transition-colors flex items-center space-x-2"
                  >
                    <svg 
                      className="w-4 h-4 text-primary" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                      />
                    </svg>
                    <span>{admin.email}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Abogados;
