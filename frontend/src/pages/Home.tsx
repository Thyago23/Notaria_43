import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row w-full min-h-[600px]">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 py-16">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-dark leading-[1.1] mb-6">
            ¡La <span className="text-primary">Notaria 43</span><br />
            mejorará su vida!
          </h1>

          <p className="text-gray-700 font-medium mb-10 max-w-lg leading-relaxed">
            Seguridad jurídica, transparencia y eficiencia en el corazón del Valle de Los Chillos. Más de una década respaldando los actos y contratos de nuestra comunidad con absoluta fidelidad a la ley.
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <Link
              to="/booking"
              className="bg-[#8cc550] hover:bg-[#7ab345] text-white font-medium py-3 px-8 text-sm transition-colors text-center"
            >
              ¡Agenda tu cita ahora!
            </Link>
            <Link
              to="/sobre-nosotros"
              className="border border-[#8cc550] text-[#8cc550] hover:bg-[#8cc550]/5 font-medium py-3 px-8 text-sm transition-colors text-center"
            >
              Sobre nosotros
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-1/2 min-h-[400px] lg:min-h-full relative bg-dark">
          <img
            src="/AdministradoresDeLaNotaria43/HomeDrFernando.jpeg"
            alt="Mgs. Dr. Fernando Iván Castro Salazar"
            className="absolute inset-0 w-full h-full object-cover object-top opacity-90 mix-blend-luminosity"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1200&auto=format&fit=crop';
            }}
          />
        </div>
      </section>

      {/* Services/Features Section */}
      <section id="servicios" className="bg-slate-50 py-20 px-6 md:px-12 flex justify-center items-center">
        <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          {/* Left Image Section */}
          <div className="w-full lg:w-[45%] relative h-[500px] md:h-[650px] rounded-[2.5rem] overflow-hidden shadow-2xl group shrink-0">
            <img
              src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=800&auto=format&fit=crop"
              alt="Instalaciones de la Notaría"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
              <span className="text-[#8cc550] font-semibold text-xs tracking-[0.2em] uppercase mb-4 block">
                NUESTROS SERVICIOS
              </span>
              <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight">
                Gestión notarial integral en un solo lugar
              </h2>
            </div>
          </div>

          {/* Right Content Section */}
          <div className="w-full lg:w-[55%] flex flex-col justify-center py-6">
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-heading font-extrabold text-gray-900 leading-[1.15] mb-6 tracking-tight">
              Conoce todo lo que podemos hacer por ti
            </h2>
            
            <p className="text-gray-600 text-lg mb-12 leading-relaxed max-w-2xl">
              Descubre nuestras áreas de especialidad. Desde la reserva de tu turno hasta el asesoramiento legal personalizado, estamos listos para atenderte.
            </p>

            <div className="space-y-8 mb-14">
              
              {/* Feature 1 - Trámites */}
              <Link to="/booking" className="flex items-start group hover:bg-white p-4 -ml-4 rounded-2xl transition-colors border border-transparent hover:border-gray-100 hover:shadow-sm">
                <div className="flex-shrink-0 w-14 h-14 bg-green-50 group-hover:bg-[#8cc550]/10 rounded-2xl flex items-center justify-center mt-1 transition-colors">
                  <svg className="w-7 h-7 text-[#8cc550]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#8cc550] transition-colors">Trámites Notariales</h3>
                  <p className="text-gray-500 leading-relaxed text-sm">
                    Revisa nuestro catálogo completo de trámites, conoce los requisitos exactos y agenda tu cita en línea en menos de 2 minutos.
                  </p>
                </div>
              </Link>

              {/* Feature 2 - Abogados */}
              <Link to="/abogados" className="flex items-start group hover:bg-white p-4 -ml-4 rounded-2xl transition-colors border border-transparent hover:border-gray-100 hover:shadow-sm">
                <div className="flex-shrink-0 w-14 h-14 bg-blue-50 group-hover:bg-blue-100 rounded-2xl flex items-center justify-center mt-1 transition-colors">
                  <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="ml-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Equipo de Abogados</h3>
                  <p className="text-gray-500 leading-relaxed text-sm">
                    Conoce a los profesionales del derecho que analizarán y gestionarán tu caso con total confidencialidad y rigor legal.
                  </p>
                </div>
              </Link>

              {/* Feature 3 - Sobre Nosotros */}
              <Link to="/sobre-nosotros" className="flex items-start group hover:bg-white p-4 -ml-4 rounded-2xl transition-colors border border-transparent hover:border-gray-100 hover:shadow-sm">
                <div className="flex-shrink-0 w-14 h-14 bg-indigo-50 group-hover:bg-indigo-100 rounded-2xl flex items-center justify-center mt-1 transition-colors">
                  <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="ml-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">Nuestra Notaría</h3>
                  <p className="text-gray-500 leading-relaxed text-sm">
                    Más de una década de trayectoria en el Valle de Los Chillos. Descubre nuestra historia, instalaciones y testimonios.
                  </p>
                </div>
              </Link>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
