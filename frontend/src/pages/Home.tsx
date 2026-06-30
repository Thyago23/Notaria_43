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
              className="bg-[#8cc550] hover:bg-[#7ab345] text-white font-medium py-3 px-8 rounded-full text-sm transition-colors text-center"
            >
              ¡Agenda tu cita ahora!
            </Link>
            <Link
              to="/sobre-nosotros"
              className="border border-[#8cc550] text-[#8cc550] hover:bg-[#8cc550]/5 font-medium py-3 px-8 rounded-full text-sm transition-colors text-center"
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

      {/* Sección 1: Trámites Notariales */}
      <section id="tramites" className="bg-slate-50 py-20 px-6 md:px-12 flex justify-center items-center">
        <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Left Image Section */}
          <div className="w-full lg:w-[45%] relative h-[450px] md:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl group shrink-0">
            <img
              src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200&auto=format&fit=crop"
              alt="Trámites Notariales"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
              <span className="text-[#8cc550] font-semibold text-xs tracking-[0.2em] uppercase mb-3 block">
                GESTIÓN ÁGIL
              </span>
              <h2 className="text-white text-3xl font-bold leading-tight">
                Documentación legal al alcance de un clic
              </h2>
            </div>
          </div>

          {/* Right Content Section */}
          <div className="w-full lg:w-[55%] flex flex-col justify-center py-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center">
                <svg className="w-7 h-7 text-[#8cc550]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-heading font-extrabold text-gray-900 leading-[1.15] tracking-tight">
                Trámites Notariales
              </h2>
            </div>
            
            <p className="text-gray-600 text-lg mb-10 leading-relaxed">
              Revisa nuestro catálogo completo de trámites, conoce los requisitos exactos y agenda tu cita en línea en menos de 2 minutos. Simplificamos tus gestiones legales para que no pierdas tiempo en filas.
            </p>

            <div>
              <Link to="/booking" className="bg-[#8cc550] hover:bg-[#7ab345] text-white font-semibold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-center inline-flex items-center group">
                Ver catálogo de trámites
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 2: Equipo de Abogados */}
      <section id="abogados" className="bg-white py-20 px-6 md:px-12 flex justify-center items-center">
        <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row-reverse gap-12 lg:gap-20 items-center">
          
          {/* Right Image Section */}
          <div className="w-full lg:w-[45%] relative h-[450px] md:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl group shrink-0">
            <img
              src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1200&auto=format&fit=crop"
              alt="Equipo de Abogados"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
              <span className="text-[#8cc550] font-semibold text-xs tracking-[0.2em] uppercase mb-3 block">
                PROFESIONALISMO
              </span>
              <h2 className="text-white text-3xl font-bold leading-tight">
                Expertos cuidando tus intereses
              </h2>
            </div>
          </div>

          {/* Left Content Section */}
          <div className="w-full lg:w-[55%] flex flex-col justify-center py-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center">
                <svg className="w-7 h-7 text-[#8cc550]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-heading font-extrabold text-gray-900 leading-[1.15] tracking-tight">
                Equipo de Abogados
              </h2>
            </div>
            
            <p className="text-gray-600 text-lg mb-10 leading-relaxed">
              Conoce a los profesionales del derecho que analizarán y gestionarán tu caso con total confidencialidad y rigor legal. Desde compraventas hasta testamentos, te acompañamos en cada decisión.
            </p>

            <div>
              <Link to="/abogados" className="bg-[#8cc550] hover:bg-[#7ab345] text-white font-semibold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-center inline-flex items-center group">
                Conoce a nuestro equipo
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 3: Nuestra Notaría */}
      <section id="sobre-nosotros" className="bg-slate-50 py-20 px-6 md:px-12 flex justify-center items-center">
        <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          {/* Left Image Section */}
          <div className="w-full lg:w-[45%] relative h-[450px] md:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl group shrink-0">
            <img
              src="https://images.unsplash.com/photo-1577415124269-fc1140a69e91?q=80&w=1200&auto=format&fit=crop"
              alt="Nuestra Notaría"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
              <span className="text-[#8cc550] font-semibold text-xs tracking-[0.2em] uppercase mb-3 block">
                TRAYECTORIA
              </span>
              <h2 className="text-white text-3xl font-bold leading-tight">
                Más de una década de confianza
              </h2>
            </div>
          </div>

          {/* Right Content Section */}
          <div className="w-full lg:w-[55%] flex flex-col justify-center py-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center">
                <svg className="w-7 h-7 text-[#8cc550]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-heading font-extrabold text-gray-900 leading-[1.15] tracking-tight">
                Nuestra Notaría
              </h2>
            </div>
            
            <p className="text-gray-600 text-lg mb-10 leading-relaxed">
              Descubre nuestra historia, instalaciones y el compromiso ético que nos impulsa a brindar la mejor seguridad jurídica del Valle de Los Chillos.
            </p>

            <div>
              <Link to="/sobre-nosotros" className="bg-[#8cc550] hover:bg-[#7ab345] text-white font-semibold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-center inline-flex items-center group">
                Saber más sobre nosotros
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
