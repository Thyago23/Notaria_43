import React from 'react';

const PoliticaPrivacidad: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Política de Privacidad</h1>
      <p className="mb-4">Última actualización: {new Date().toLocaleDateString()}</p>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">1. Información que recopilamos</h2>
        <p className="mb-2">Recopilamos únicamente los datos necesarios para procesar sus trámites y citas. Esto incluye:</p>
        <ul className="list-disc pl-6 mb-2">
          <li>Nombres y apellidos.</li>
          <li>Número de cédula o identificación.</li>
          <li>Dirección de correo electrónico.</li>
          <li>Número de teléfono.</li>
          <li>Información específica requerida para el trámite notarial solicitado.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">2. Uso de la información</h2>
        <p className="mb-2">La información recopilada se utiliza exclusivamente para:</p>
        <ul className="list-disc pl-6 mb-2">
          <li>Gestionar y agendar sus citas en la Notaría.</li>
          <li>Contactarle sobre el estado de sus trámites.</li>
          <li>Cumplir con las obligaciones legales y regulatorias de la función notarial en Ecuador.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">3. Compartir información</h2>
        <p className="mb-2">No vendemos, alquilamos ni compartimos su información personal con terceros, excepto cuando sea estrictamente necesario para cumplir con requerimientos legales o de instituciones públicas gubernamentales competentes.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">4. Seguridad de sus datos</h2>
        <p className="mb-2">Implementamos medidas de seguridad técnicas y organizativas para proteger sus datos personales contra acceso no autorizado, alteración, divulgación o destrucción.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">5. Sus derechos</h2>
        <p className="mb-2">De acuerdo con la Ley Orgánica de Protección de Datos Personales de Ecuador, usted tiene derecho a:</p>
        <ul className="list-disc pl-6 mb-2">
          <li>Acceder a sus datos personales.</li>
          <li>Solicitar la rectificación de datos inexactos.</li>
          <li>Solicitar la eliminación de sus datos (cuando la ley notarial lo permita).</li>
          <li>Oponerse al tratamiento de sus datos.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">6. Contacto</h2>
        <p className="mb-2">Para ejercer sus derechos o si tiene alguna duda sobre esta política, por favor contáctenos a: <strong>notaria43_quito@hotmail.com</strong></p>
      </section>
    </div>
  );
};

export default PoliticaPrivacidad;
