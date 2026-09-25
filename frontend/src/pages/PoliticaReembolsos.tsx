import React from 'react';

const PoliticaReembolsos: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Política de Pagos y Reembolsos</h1>
      <p className="mb-4">Última actualización: {new Date().toLocaleDateString()}</p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">1. Aranceles Notariales</h2>
        <p className="mb-2">Los costos de los servicios notariales se rigen estrictamente por los aranceles fijados por el Consejo de la Judicatura de la República del Ecuador. El monto exacto de cada trámite puede variar dependiendo de la cuantía y particularidades del acto notarial.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">2. Agendamiento de Citas</h2>
        <p className="mb-2">El servicio de agendamiento de citas a través de nuestra plataforma es <strong>totalmente gratuito</strong>. No realizamos cobros a través de la página web.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">3. Reembolsos por Trámites Notariales</h2>
        <p className="mb-2">Dado que el cobro por los servicios notariales se realiza de forma presencial en las instalaciones de la Notaría 43, una vez que el acto notarial ha sido celebrado, protocolizado o certificado, los valores pagados no son reembolsables, conforme a la normativa legal vigente.</p>
        <p className="mb-2">En caso de pagos anticipados presenciales para trámites no concluidos por desistimiento de las partes, el reembolso estará sujeto a la deducción de los gastos administrativos e impuestos generados hasta esa fecha.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">4. Contacto para Inquietudes</h2>
        <p className="mb-2">Si tiene alguna duda relacionada con facturación o aranceles, por favor comuníquese con nosotros directamente en nuestras oficinas o al correo: <strong>notaria43_quito@hotmail.com</strong></p>
      </section>
    </div>
  );
};

export default PoliticaReembolsos;
