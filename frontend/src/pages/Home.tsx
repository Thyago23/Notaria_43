import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="w-full bg-slate-50 min-h-[90vh] py-12 md:py-20 px-6 md:px-12 flex justify-center items-center">
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
        
        {/* Left Image Section */}
        <div className="w-full lg:w-[45%] relative h-[500px] md:h-[700px] rounded-[2.5rem] overflow-hidden shadow-2xl group shrink-0">
          <img
            src="/AdministradoresDeLaNotaria43/HomeDrFernando.jpeg"
            alt="Mgs. Dr. Fernando Iván Castro Salazar"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1200&auto=format&fit=crop';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
            <span className="text-blue-300 font-semibold text-xs tracking-[0.2em] uppercase mb-4 block">
              EFICIENCIA Y RAPIDEZ
            </span>
            <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight">
              Un ambiente seguro y confiable para tus trámites
            </h2>
          </div>
        </div>

        {/* Right Content Section */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center py-6">
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-heading font-extrabold text-gray-900 leading-[1.1] mb-6 tracking-tight">
            Más que una notaría, una experiencia de confianza
          </h1>
          
          <p className="text-gray-600 text-lg mb-12 leading-relaxed max-w-2xl">
            Nos enorgullece redefinir el cuidado de sus trámites en el Valle de Los Chillos. Priorizamos su bienestar legal y emocional a través de procesos precisos, ágiles y guiados por un equipo humano excepcional que lo acompaña en cada paso.
          </p>

          <div className="space-y-10 mb-14">
            
            {/* Feature 1 */}
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mt-1">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </div>
              <div className="ml-5">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Atención Humana y Empática</h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  Entendemos que los trámites legales pueden generar dudas. Diseñamos una experiencia ágil, sin complicaciones y sumamente empática.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mt-1">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-5">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Especialistas en Cada Área</h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  Desde compraventas hasta poderes y herencias, su caso es tratado exclusivamente por profesionales altamente especializados en la materia.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-[#8cc550]/10 rounded-xl flex items-center justify-center mt-1">
                <svg className="w-6 h-6 text-[#8cc550]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="ml-5">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Garantía, Seguridad y Confianza</h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  Utilizamos estrictos protocolos legales y éticos para proteger el patrimonio de su familia, garantizando absoluta seguridad jurídica.
                </p>
              </div>
            </div>

          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              to="/booking"
              className="bg-[#8cc550] hover:bg-[#7ab345] text-white font-semibold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-center inline-block"
            >
              Agendar cita ahora
            </Link>
            <Link
              to="/sobre-nosotros"
              className="bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-4 px-10 rounded-full transition-all duration-300 text-center inline-block"
            >
              Conocer más
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
