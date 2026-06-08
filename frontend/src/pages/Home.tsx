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
      <section id="sobre-nosotros" className="bg-light py-20 px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">

          {/* Card 1 */}
          <div className="flex flex-col bg-white">
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
              <Link to="/abogados" className="w-full bg-[#8cc550] hover:bg-[#7ab345] text-white py-4 text-sm font-medium transition-colors uppercase text-center block">
                Abogados
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col bg-white relative -mt-4 mb-4 shadow-lg z-10 transform scale-105">
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
              <Link to="/booking" className="w-full bg-[#8cc550] hover:bg-[#7ab345] text-white py-4 text-lg font-medium transition-colors uppercase text-center block">
                ¿Qué necesitas?
              </Link>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col bg-white">
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
              <Link to="/sobre-nosotros" className="w-full bg-[#8cc550] hover:bg-[#7ab345] text-white py-4 text-sm font-medium transition-colors uppercase text-center block">
                Testimonios
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Home;
