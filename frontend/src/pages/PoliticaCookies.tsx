import React from 'react';

const PoliticaCookies: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Política de Cookies</h1>
      <p className="mb-4">Última actualización: {new Date().toLocaleDateString()}</p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">1. ¿Qué son las cookies?</h2>
        <p className="mb-2">Las cookies son pequeños archivos de texto que los sitios web almacenan en su ordenador o dispositivo móvil cuando los visita. Ayudan al sitio a recordar sus acciones y preferencias durante un período de tiempo.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">2. ¿Cómo usamos las cookies?</h2>
        <p className="mb-2">Utilizamos cookies estrictamente necesarias para el funcionamiento del sitio (por ejemplo, para mantener su sesión iniciada o recordar si aceptó nuestro aviso de cookies). No utilizamos cookies de rastreo invasivas.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">3. Tipos de cookies que usamos</h2>
        <ul className="list-disc pl-6 mb-2">
          <li><strong>Cookies Técnicas (Necesarias):</strong> Esenciales para el correcto funcionamiento del sitio web y agendamiento de citas.</li>
          <li><strong>Cookies de Consentimiento:</strong> Para recordar si ha aceptado nuestra política de privacidad.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">4. Controlar las cookies</h2>
        <p className="mb-2">Puede controlar y/o eliminar las cookies según lo desee. Puede eliminar todas las cookies que ya están en su computadora y configurar la mayoría de los navegadores para evitar que se coloquen. Sin embargo, si hace esto, es posible que deba ajustar manualmente algunas preferencias cada vez que visite el sitio y que algunos servicios no funcionen correctamente.</p>
      </section>
    </div>
  );
};

export default PoliticaCookies;
