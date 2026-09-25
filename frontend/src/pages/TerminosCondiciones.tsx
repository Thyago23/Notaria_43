import React from 'react';

const TerminosCondiciones: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Términos y Condiciones</h1>
      <p className="mb-4">Última actualización: {new Date().toLocaleDateString()}</p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">1. Aceptación de los Términos</h2>
        <p className="mb-2">Al acceder y utilizar este sitio web para el agendamiento de citas y consultas de trámites en la Notaría 43 de Quito, usted acepta estar sujeto a estos términos y condiciones.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">2. Uso del Servicio</h2>
        <p className="mb-2">Este sitio web tiene como finalidad facilitar la información y el agendamiento de servicios notariales. Usted se compromete a:</p>
        <ul className="list-disc pl-6 mb-2">
          <li>Proporcionar información veraz, precisa y actualizada al momento de agendar una cita.</li>
          <li>No utilizar el sitio web con fines ilícitos o fraudulentos.</li>
          <li>Respetar las fechas y horarios de las citas agendadas, o cancelarlas con la debida anticipación.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">3. Servicios Notariales</h2>
        <p className="mb-2">La información proporcionada en el sitio web sobre requisitos y costos es orientativa. El Notario tiene la facultad de solicitar documentación adicional según las particularidades de cada caso y la legislación vigente.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">4. Propiedad Intelectual</h2>
        <p className="mb-2">Todo el contenido de este sitio web, incluyendo textos, gráficos, logotipos e imágenes, está protegido por leyes de propiedad intelectual y es propiedad exclusiva de la Notaría 43 o de sus respectivos autores.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">5. Modificaciones</h2>
        <p className="mb-2">Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento sin previo aviso. Los cambios entrarán en vigor a partir de su publicación en el sitio web.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">6. Legislación Aplicable</h2>
        <p className="mb-2">Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes de la República del Ecuador.</p>
      </section>
    </div>
  );
};

export default TerminosCondiciones;
