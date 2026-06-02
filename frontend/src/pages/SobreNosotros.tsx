import React from 'react';
import { Link } from 'react-router-dom';

const SobreNosotros: React.FC = () => {
  return (
    <div className="w-full bg-[#fcfbfa] min-h-screen">
      <section className="relative bg-gradient-to-r from-dark via-slate-900 to-dark text-white py-20 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-primary filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-secondary filter blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="flex justify-center mb-6">
            <span className="h-1 w-16 bg-primary rounded-full"></span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight tracking-tight mb-6 text-white">
            Sobre la Notaría <span className="text-primary">Cuadragésima Tercera</span> de Los Chillos
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Fe pública, seguridad jurídica y eficiencia legal al servicio de la ciudadanía.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center space-x-2 text-xs font-semibold text-primary uppercase tracking-widest">
              <span>Introducción Institucional</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark leading-tight">
              ¿Quiénes Somos?
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Somos una institución de la Función Judicial enfocada en brindar seguridad, transparencia y eficiencia legal a la ciudadanía. Como depositarios de la fe pública delegados por el Estado ecuatoriano, garantizamos la validez legal de los actos, contratos y declaraciones que confían en nuestras manos, promoviendo la paz social y el correcto ejercicio del derecho.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Ubicados en el sector estratégico del Valle de Los Chillos, en el cantón Quito, nos caracterizamos por ofrecer una atención ágil, moderna y apegada estrictamente al marco ético y jurídico de nuestro país.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative p-8 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full transition-all duration-300 group-hover:scale-110"></div>

              <div className="space-y-6 relative z-10">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                  </svg>
                </div>

                <h3 className="text-xl font-bold text-dark">Nuestros Valores</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center space-x-3">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    <span>Transparencia absoluta</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    <span>Seguridad y validez legal</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    <span>Agilidad e innovación tecnológica</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    <span>Trato humano y ético</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 px-6 md:px-12 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest block mb-3">Historia Notarial</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark">
              Nuestra Trayectoria e Historia
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto mt-4">
              Consolidándonos bajo los más altos estándares del sistema judicial ecuatoriano.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="w-full bg-[#fcfbfa] border border-gray-100 p-8 rounded-2xl shadow-sm text-center">
                <div className="w-36 h-36 mx-auto mb-6 rounded-full overflow-hidden border-2 border-primary/20 bg-gray-100">
                  <img
                    src="/AdministradoresDeLaNotaria43/Mgs.Dr.Fernando Iván Castro Salazar.jpeg"
                    alt="Abg. Fernando Iván Castro Salazar"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop';
                    }}
                  />
                </div>
                <h3 className="text-xl font-bold text-dark">Mgs. Dr. Fernando Iván Castro Salazar</h3>
                <span className="text-primary text-sm font-semibold uppercase tracking-wider block mt-1 mb-4">Notario Titular</span>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  Dirección jurídica de excelencia enfocada en la fe pública y la rigurosidad ética.
                </p>
                <Link
                  to="/abogados"
                  className="inline-flex items-center space-x-2 text-xs font-bold text-primary hover:text-primary-hover uppercase tracking-wider transition-colors"
                >
                  <span>Ver perfil y equipo</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
              <div className="flex space-x-6 relative pl-8">
                <div className="absolute left-[9px] w-4 h-4 bg-primary border-2 border-white rounded-full flex items-center justify-center shadow"></div>
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-primary uppercase tracking-widest">Designación Oficial</span>
                  <h4 className="text-lg font-bold text-dark">Acción de Personal Nro. 13344-DNTH-RO</h4>
                  <p className="text-gray-600 leading-relaxed">
                    El Mgs. Dr. Fernando Iván Castro Salazar fue nombrado oficialmente mediante la Acción de Personal expedida por la Dirección Nacional de Talento Humano del Consejo de la Judicatura.
                  </p>
                </div>
              </div>

              <div className="flex space-x-6 relative pl-8">
                <div className="absolute left-[9px] w-4 h-4 bg-primary border-2 border-white rounded-full flex items-center justify-center shadow"></div>
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-primary uppercase tracking-widest">Proceso de Selección</span>
                  <h4 className="text-lg font-bold text-dark">Concurso Público Nacional</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Su designación fue el fruto directo de una destacada participación en el riguroso Concurso Público de Oposición, Méritos, Impugnación Ciudadana y Control Social para la selección de notarios a nivel nacional.
                  </p>
                </div>
              </div>

              <div className="flex space-x-6 relative pl-8">
                <div className="absolute left-[9px] w-4 h-4 bg-primary border-2 border-white rounded-full flex items-center justify-center shadow"></div>
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-primary uppercase tracking-widest font-sans">21 de Noviembre, 2013</span>
                  <h4 className="text-lg font-bold text-dark">Inicio Formal de Funciones</h4>
                  <p className="text-gray-600 leading-relaxed">
                    La designación oficial rigió formalmente a partir del 21 de noviembre de 2013.
                  </p>
                </div>
              </div>

              <div className="flex space-x-6 relative pl-8">
                <div className="absolute left-[9px] w-4 h-4 bg-primary border-2 border-white rounded-full flex items-center justify-center shadow"></div>
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-primary uppercase tracking-widest">11 de Diciembre, 2013</span>
                  <h4 className="text-lg font-bold text-dark">Posesión Legal y Juramento</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Tomó posesión legal y rindió juramento de su cargo en la ciudad de Quito ante la Dirección General del Consejo de la Judicatura.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest block mb-3">Garantía Constitucional</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark">
            Marco Legal y Sustento Jurídico
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto mt-4">
            Nuestras actuaciones, facultades y competencias no son improvisadas; se sustentan sólidamente en la normativa vigente de la República del Ecuador.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="w-12 h-12 bg-[#b89369]/10 rounded-xl flex items-center justify-center text-primary mb-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-dark mb-4">Sustento Constitucional</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              De conformidad con el <strong>artículo 200 de la Constitución de la República del Ecuador</strong>, ejercemos la función de resguardar y otorgar fe pública a los actos que la ley requiere.
            </p>
          </div>

          <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="w-12 h-12 bg-[#b89369]/10 rounded-xl flex items-center justify-center text-primary mb-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 01-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-dark mb-4">Código Orgánico de la Función Judicial</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Operamos bajo las directrices de los <strong>artículos 73, 74, 75 y 254</strong>, que rigen la administración y disciplina judicial. La permanencia y responsabilidades están normadas según el <strong>artículo 300</strong> de dicho código.
            </p>
          </div>

          <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="w-12 h-12 bg-[#b89369]/10 rounded-xl flex items-center justify-center text-primary mb-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-dark mb-4">Ley Notarial</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Regulados por la Ley Notarial, expedida mediante <strong>Decreto Supremo No. 1404</strong> (Registro Oficial No. 158 el 11 de noviembre de 1966), la cual delimita de forma precisa las atribuciones del servicio.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SobreNosotros;
