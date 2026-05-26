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
              className="bg-primary hover:bg-primary-hover text-white font-medium py-3 px-8 text-sm transition-colors text-center"
            >
              ¡Agenda tu cita ahora!
            </Link>
            <Link
              to="/sobre-nosotros"
              className="border border-primary text-primary hover:bg-primary/5 font-medium py-3 px-8 text-sm transition-colors text-center"
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
      <section id="sobre-nosotros" className="bg-gray-200/70 py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col gap-20">

          {/* Row 1: Equipo profesional */}
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Card 1 */}
            <div className="w-full lg:w-1/3 flex flex-col bg-white shadow-md rounded-lg overflow-hidden shrink-0">
              <div className="h-64 overflow-hidden bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
                  alt="Professional team"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 pb-10">
                <h3 className="text-xl font-bold mb-3">Equipo profesional</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  Servicios exclusivos para cada cliente<br />de nuestras empresas
                </p>
              </div>
              <div className="mt-auto">
                <Link to="/abogados" className="w-full bg-secondary hover:bg-teal-700 text-white py-4 text-sm font-medium transition-colors uppercase text-center block">
                  Abogados
                </Link>
              </div>
            </div>

            {/* Description 1 */}
            <div className="w-full lg:w-2/3 flex flex-col justify-center text-left space-y-4">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark">
                Asesoría Legal con Excelencia Profesional
              </h2>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                Contamos con un equipo de profesionales jurídicos altamente capacitados y con amplia experiencia en la función judicial. Nos dedicamos a brindar asesoría legal y administrativa personalizada, garantizando la seguridad, validez y confidencialidad en cada uno de sus actos y contratos notariales.
              </p>
            </div>
          </div>

          {/* Row 2: Trabajo de calidad */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-10 lg:gap-16">
            {/* Card 2 */}
            <div className="w-full lg:w-1/3 flex flex-col bg-white shadow-md rounded-lg overflow-hidden shrink-0">
              <div className="h-64 overflow-hidden bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=800&auto=format&fit=crop"
                  alt="Quality work"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 pb-10">
                <h3 className="text-xl font-bold mb-3">Trabajo de calidad</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  Servicios exclusivos para cada cliente<br />de nuestras empresas
                </p>
              </div>
              <div className="mt-auto">
                <Link to="/booking" className="w-full bg-muted hover:bg-[#8f7262] text-white py-4 text-sm font-medium transition-colors uppercase text-center block">
                  ¿Qué necesitas?
                </Link>
              </div>
            </div>

            {/* Description 2 */}
            <div className="w-full lg:w-2/3 flex flex-col justify-center text-left space-y-4">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark">
                Trámites Notariales Ágiles y Modernos
              </h2>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                Garantizamos la máxima rigurosidad y transparencia en cada trámite que realizamos. Nuestro compromiso institucional es facilitar sus procesos notariales de manera ágil y eficiente, ofreciendo respuestas claras y soluciones apegadas estrictamente al marco ético y jurídico nacional.
              </p>
            </div>
          </div>

          {/* Row 3: Abogados confiables */}
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Card 3 */}
            <div className="w-full lg:w-1/3 flex flex-col bg-white shadow-md rounded-lg overflow-hidden shrink-0">
              <div className="h-64 overflow-hidden bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop"
                  alt="Reliable lawyers"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 pb-10">
                <h3 className="text-xl font-bold mb-3">Abogados confiables</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  Servicios exclusivos para cada cliente<br />de nuestras empresas
                </p>
              </div>
              <div className="mt-auto">
                <Link to="/sobre-nosotros" className="w-full bg-dark hover:bg-black text-white py-4 text-sm font-medium transition-colors uppercase text-center block">
                  Testimonios
                </Link>
              </div>
            </div>

            {/* Description 3 */}
            <div className="w-full lg:w-2/3 flex flex-col justify-center text-left space-y-4">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark">
                Trayectoria de Confianza y Seguridad Jurídica
              </h2>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                La confianza de nuestros usuarios es el pilar de nuestra trayectoria. Como depositarios de la fe pública delegados por el Estado ecuatoriano, promovemos el correcto ejercicio del derecho para brindar seguridad legal plena a las familias y empresas en el cantón Quito.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Home;
