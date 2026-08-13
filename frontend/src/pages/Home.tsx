import { Link } from 'react-router-dom';
import { useState } from 'react';

const Home = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
              src="/FotoDocumentaciónlegalalalcancedeunclic.jpeg"
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
              src="/FotoExpertoscuidandotusintereses.jpeg"
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
              Conoce a los profesionales del derecho que analizarán y gestionarán tu caso con total confidencialidad y rigor legal.
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
              src="/FotoMásdeunadécadadeconfianza.jpg"
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

      {/* Sección 4: Ubicación */}
      <section id="ubicacion" className="bg-white py-20 px-6 md:px-12 flex justify-center items-center">
        <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row-reverse gap-12 lg:gap-20 items-center">

          {/* Right Map Section (acting as the 'Foto') */}
          <div className="w-full lg:w-[45%] relative h-[450px] md:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl group shrink-0 border-4 border-white bg-slate-50">
            <iframe
              src="https://maps.google.com/maps?q=-0.2959549,-78.4531404&hl=es&z=17&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Notaría 43"
              className="rounded-[2.5rem]"
            ></iframe>
          </div>

          {/* Left Content Section (acting as the 'Descripción') */}
          <div className="w-full lg:w-[55%] flex flex-col justify-center py-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center">
                <svg className="w-7 h-7 text-[#8cc550]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-heading font-extrabold text-gray-900 leading-[1.15] tracking-tight">
                Estamos ubicados en:
              </h2>
            </div>

            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              <a
                href="https://www.google.com/maps/place/Notar%C3%ADa+43/@-0.2958093,-78.4539041,398m/data=!3m1!1e3!4m6!3m5!1s0x91d5bd5e2d63f903:0x5e55a3ba0d107483!8m2!3d-0.2959549!4d-78.4531404!16s%2Fg%2F11c1p6x1y4!5m2!1e2!1e4?entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start text-lg text-gray-700 hover:text-[#8cc550] transition-colors group font-medium"
              >
                <svg className="w-6 h-6 text-[#8cc550] mr-3 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="underline-offset-4 group-hover:underline">Av. Ilaló Y Río Tivacuno Oe11-323, Vía Al Tingo (Valle De Los Chillos), Quito, Pichincha</span>
              </a>
            </p>

            {/* Galería de Fotos Reales */}
            <div className="grid grid-cols-2 grid-rows-[auto_auto] gap-4 w-full mt-4">
              <div 
                className="col-span-2 h-[220px] rounded-[1.5rem] overflow-hidden shadow-lg border-2 border-white hover:shadow-xl transition-shadow relative bg-slate-100 cursor-pointer group"
                onClick={() => setSelectedImage('/EntradaNotariaFoto1.png')}
              >
                <img src="/EntradaNotariaFoto1.png" alt="Fachada Notaría 43" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop'; }} />
              </div>
              <div 
                className="h-[160px] rounded-[1.5rem] overflow-hidden shadow-lg border-2 border-white hover:shadow-xl transition-shadow relative bg-slate-100 cursor-pointer group"
                onClick={() => setSelectedImage('/EdiNotaria43Foto2.png')}
              >
                <img src="/EdiNotaria43Foto2.png" alt="Ingreso Notaría 43" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?q=80&w=600&auto=format&fit=crop'; }} />
              </div>
              <div 
                className="h-[160px] rounded-[1.5rem] overflow-hidden shadow-lg border-2 border-white hover:shadow-xl transition-shadow relative bg-slate-100 cursor-pointer group"
                onClick={() => setSelectedImage('/Notaria43Foto3.png')}
              >
                <img src="/Notaria43Foto3.png" alt="Exteriores Notaría 43" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop'; }} />
              </div>
            </div>
            
          </div>
        </div>
      </section>
      {/* Image Modal (Lightbox) */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-[#8cc550] transition-colors p-2 bg-black/50 rounded-full"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img 
            src={selectedImage} 
            alt="Ampliación" 
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl" 
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </div>
  );
};

export default Home;
