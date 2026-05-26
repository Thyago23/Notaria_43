// ============================================
// Seed: Datos iniciales para desarrollo
// ============================================

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de datos...\n');

  // Crear usuario Administrativo
  const adminPassword = await bcrypt.hash('Admin12345', 12);
  const admin = await prisma.user.upsert({
    where: { cedula: '1710034065' },
    update: {},
    create: {
      cedula: '1710034065',
      nombres: 'María',
      apellidos: 'González Pérez',
      email: 'admin@notaria43.com',
      password: adminPassword,
      role: 'ADMINISTRATIVO',
    },
  });
  console.log(`✅ Administrativo creado: ${admin.nombres} ${admin.apellidos} (${admin.cedula})`);

  // Crear usuario Notario
  const notarioPassword = await bcrypt.hash('Notario12345', 12);
  const notario = await prisma.user.upsert({
    where: { cedula: '1720408838' },
    update: {},
    create: {
      cedula: '1720408838',
      nombres: 'Carlos',
      apellidos: 'Rodríguez López',
      email: 'notario@notaria43.com',
      password: notarioPassword,
      role: 'NOTARIO',
    },
  });
  console.log(`✅ Notario creado: ${notario.nombres} ${notario.apellidos} (${notario.cedula})`);

  // Crear usuario Ciudadano de prueba
  const ciudadanoPassword = await bcrypt.hash('Ciudadano12345', 12);
  const ciudadano = await prisma.user.upsert({
    where: { cedula: '1713175567' },
    update: {},
    create: {
      cedula: '1713175567',
      nombres: 'Ana',
      apellidos: 'Martínez Solano',
      email: 'ana.martinez@gmail.com',
      password: ciudadanoPassword,
      role: 'CIUDADANO',
    },
  });
  console.log(`✅ Ciudadano creado: ${ciudadano.nombres} ${ciudadano.apellidos} (${ciudadano.cedula})`);

  // Crear catálogo de trámites
  const tramites = [
    {
      nombre: 'Escritura Pública de Compraventa',
      descripcion: 'Otorgamiento de escritura pública para transferencia de dominio de bienes inmuebles.',
      duracionMinutos: 60,
      requisitos: [
        'Cédulas originales de vendedor y comprador',
        'Certificado de gravámenes actualizado',
        'Pago de impuestos municipales',
        'Avalúo catastral',
      ],
    },
    {
      nombre: 'Poder General',
      descripcion: 'Otorgamiento de poder general para representación legal en actos civiles y comerciales.',
      duracionMinutos: 30,
      requisitos: [
        'Cédula original del poderdante',
        'Datos completos del apoderado',
        'Especificación de facultades',
      ],
    },
    {
      nombre: 'Declaración Juramentada',
      descripcion: 'Declaración bajo juramento sobre hechos o circunstancias específicas.',
      duracionMinutos: 30,
      requisitos: [
        'Cédula original del declarante',
        'Detalle de la declaración a realizar',
      ],
    },
    {
      nombre: 'Reconocimiento de Firma',
      descripcion: 'Autenticación notarial de la firma en documentos privados.',
      duracionMinutos: 15,
      requisitos: [
        'Cédula original del firmante',
        'Documento original a reconocer',
      ],
    },
    {
      nombre: 'Autorización de Viaje de Menores',
      descripcion: 'Autorización notarial para que un menor de edad pueda viajar fuera del país.',
      duracionMinutos: 30,
      requisitos: [
        'Cédulas originales de ambos padres',
        'Partida de nacimiento del menor',
        'Itinerario de viaje',
        'Datos del acompañante',
      ],
    },
    {
      nombre: 'Protocolización de Documentos',
      descripcion: 'Incorporación de documentos al protocolo notarial para su custodia y fe pública.',
      duracionMinutos: 45,
      requisitos: [
        'Cédula del solicitante',
        'Documentos originales a protocolizar',
        'Solicitud escrita',
      ],
    },
    {
      nombre: 'Compraventa de bienes inmuebles',
      descripcion: 'Compraventa de bienes inmuebles como casas, terrenos y oficinas.',
      duracionMinutos: 60,
      requisitos: [
        'Minuta',
        'Originales y una copia a color de cédula y papeleta de votación de compradores y vendedores',
        'Constancia de pagos de impuesto (predial, alcabala municipal, consejo provincial) Si aplica obras y plusvalia',
        'Certificado de gravamen vigente del Registro de la Propiedad',
        'Si aplica propiedad horizontal, certificado de expensas, acta y nombramiento de administrador, copia de cédula y papeleta de votacion del administrador',
        'Comparecencia de las partes',
      ],
    },
    {
      nombre: 'Promesa de compraventa de bienes inmuebles',
      descripcion: 'Promesa de compraventa de bienes inmuebles.',
      duracionMinutos: 45,
      requisitos: [
        'Minuta',
        'Originales y una copia a color de cédula y papeleta de votación de promitentes compradores y vendedores',
        'Certificado de gravamen vigente del Registro de la Propiedad',
        'Comparecencia de las partes',
      ],
    },
    {
      nombre: 'Insinuación para la donación',
      descripcion: 'Insinuación para la donación de bienes inmuebles.',
      duracionMinutos: 45,
      requisitos: [
        'Minuta',
        'Originales y una copia a color de cédula y papeleta de votación de donantes y donatarios y dos testigos',
        'Certificado de gravamen vigente del Registro de la Propiedad',
        'Comparecencia de las partes',
      ],
    },
    {
      nombre: 'Donación de bienes inmuebles',
      descripcion: 'Donación de bienes inmuebles ante notaría.',
      duracionMinutos: 60,
      requisitos: [
        'Minuta',
        'Escritura de insinuación para la donación',
        'Originales y una copia a color de cédula y papeleta de votación de donantes y donatarios',
        'Constancia de pagos de impuesto (predial, alcabala municipal, consejo provincial) Si aplica obras',
        'Certificado de gravamen vigente del Registro de la Propiedad',
        'Si aplica propiedad horizontal, certificado de expensas, acta y nombramiento de administrador, copia de cédula y papeleta de votación del administrador',
        'Comparecencia de las partes',
      ],
    },
    {
      nombre: 'Constitución de hipoteca',
      descripcion: 'Constitución de hipoteca sobre bienes inmuebles.',
      duracionMinutos: 45,
      requisitos: [
        'Minuta',
        'Originales y una copia a color de cédula y papeleta de votación de acreedores y deudores',
        'Si el acreedor hipotecario es persona jurídica se requiere el nombramiento o poder de la persona jurídica que representa, RUC',
        'Comparecencia de las partes',
        'Certificado del Registro de la Propiedad',
        'Pago del impuesto predial actualizado',
      ],
    },
    {
      nombre: 'Cancelación de hipoteca',
      descripcion: 'Cancelación de hipoteca registrada en el Registro de la Propiedad.',
      duracionMinutos: 45,
      requisitos: [
        'Minuta',
        'Originales y una copia a color de cédula y papeleta de votación de acreedores y deudores',
        'Si el acreedor hipotecario es persona jurídica se requiere el nombramiento o poder de la persona jurídica que representa, RUC',
        'Comparecencia de las partes',
      ],
    },
    {
      nombre: 'Declaratoria de propiedad horizontal',
      descripcion: 'Declaratoria notarial de propiedad horizontal en bienes inmuebles.',
      duracionMinutos: 60,
      requisitos: [
        'Minuta',
        'Originales y una copia a color de cédula y papeleta de votación de comparecientes',
        'Original y planos aprobados por el Municipio',
        'Certificado de gravamen vigente del Registro de la Propiedad',
        'Comparecencia de las partes',
        'Carpeta completa que le entrega el Municipio de Quito, donde se aprueba la Declaratoria de Propiedad Horizontal',
        'Pago del impuesto predial',
      ],
    },
    {
      nombre: 'Cancelación de patrimonio familiar',
      descripcion: 'Cancelación notarial de patrimonio familiar registrado.',
      duracionMinutos: 45,
      requisitos: [
        'Minuta',
        'Oficio de la entidad financiera autorizando la cancelación del patrimonio familiar',
        'Originales y una copia a color de cédula y papeleta de votación de comparecientes',
        'Certificado de gravamen vigente del Registro de la Propiedad',
        'Comparecencia de las partes (peticionarios y dos testigos)',
      ],
    },
    {
      nombre: 'Extinción de usufructo por muerte',
      descripcion: 'Extinción de usufructo notarial por fallecimiento.',
      duracionMinutos: 45,
      requisitos: [
        'Minuta',
        'Originales y una copia a color de cédula y papeleta de votación de comparecientes',
        'Certificado de gravamen vigente del Registro de la Propiedad',
        'Partida de defunción',
        'Comparecencia de las partes',
      ],
    },
    {
      nombre: 'Inscripción de contratos de arrendamiento',
      descripcion: 'Inscripción de contratos de arrendamiento de bienes inmuebles.',
      duracionMinutos: 45,
      requisitos: [
        'Tres contratos originales de arrendamientos suscritos por las partes',
        'Originales y tres copias de cédulas y papeleta de votación de arrendadora y arrendataria',
        'Tres copias de planilla de luz, agua, teléfono a nombre de arrendador o pago del impuesto predial',
      ],
    },
    {
      nombre: 'Desahucio',
      descripcion: 'Procedimiento notarial para desahucio de arrendamientos inscritos.',
      duracionMinutos: 45,
      requisitos: [
        'Petitorio suscrito por abogado',
        'Contratos de arrendamientos debidamente inscritos',
        'Originales y tres copias de cédula y papeleta de votación',
      ],
    },
    {
      nombre: 'Reconocimientos de firmas de vehículos (Vendedor estado civil casado o soltero)',
      descripcion: 'Reconocimiento de firmas en compraventa de vehículos para vendedor casado o soltero.',
      duracionMinutos: 30,
      requisitos: [
        'Certificado único vehicular emitido por la Agencia Nacional de Tránsito',
        'Dos contratos originales llenos y firmados',
        'Originales y dos copias a color de la matrícula',
        'Originales y dos copias a color de cédula y papeleta de votación de compradores y vendedores',
        'Comparecencia de compradores y vendedores (Vendedor casado: deben firmar ambos cónyuges)',
      ],
    },
    {
      nombre: 'Reconocimientos de firmas de vehículos (Vendedor estado civil viudo)',
      descripcion: 'Reconocimiento de firmas en compraventa de vehículos para vendedor viudo.',
      duracionMinutos: 30,
      requisitos: [
        'Certificado único vehicular emitido por la Agencia Nacional de Tránsito',
        'Dos contratos originales llenos y firmados',
        'Originales y dos copias a color de la matricula',
        'Originales y dos copias a color de cédula y papeleta de votación de compradores y vendedores',
        'Escritura de posesión efectiva (pagos de impuesto a la herencia). - Si el vehículo fue adquirido siendo de estado civil viudo adjuntar acta de defunción.',
        'Comparecencia de compradores y vendedor',
      ],
    },
    {
      nombre: 'Reconocimientos de firmas de vehículos (Vendedor estado civil divorciado)',
      descripcion: 'Reconocimiento de firmas en compraventa de vehículos para vendedor divorciado.',
      duracionMinutos: 30,
      requisitos: [
        'Certificado único vehicular emitido por la Agencia Nacional de Tránsito',
        'Dos contratos originales llenos y firmados',
        'Originales y dos copias a color de la matricula',
        'Originales y dos copias a color de cédula y papeleta de votación de compradores y vendedores',
        'Partida de matrimonio con la respectiva marginación de divorcio',
        'Comparecencia de compradores y vendedor',
      ],
    },
    {
      nombre: 'Reconocimientos de firmas de vehículos (Vendedor persona jurídica-empresa)',
      descripcion: 'Reconocimiento de firmas en compraventa de vehículos vendida por persona jurídica.',
      duracionMinutos: 30,
      requisitos: [
        'Certificado único vehicular emitido por la Agencia Nacional de Tránsito',
        'Dos contratos originales llenos y firmados',
        'Originales y dos copias a color de la matricula',
        'Originales y dos copias a color de cédula y papeleta de votación de compradores y vendedores',
        'Acta de Junta autorizando la venta del vehículo',
        'RUC de la persona jurídica',
        'Nombramiento vigente del representante legal de la persona jurídica',
        'Comparecencia de compradores y vendedor (representante legal de la persona juridica)',
      ],
    },
    {
      nombre: 'Certificaciones (fiel copia del original)',
      descripcion: 'Certificación notarial de fiel copia del documento original.',
      duracionMinutos: 15,
      requisitos: [
        'Original del documento que se quiera certificar',
        'Dos copias (uno a color y una en blanco y negro) del documento que se quiera certificar',
      ],
    },
    {
      nombre: 'Declaración juramentada persona natural',
      descripcion: 'Declaración juramentada en nombre de persona natural.',
      duracionMinutos: 30,
      requisitos: [
        'Comparecencia del declarante',
        'Originales y una copia a color de cédula y papeleta de votación del compareciente.',
      ],
    },
    {
      nombre: 'Salida del país menor de edad',
      descripcion: 'Autorización notarial para salida del país de menor de edad.',
      duracionMinutos: 30,
      requisitos: [
        'Petitorio de abogado',
        'Originales y una copia a color de cédula y papeleta de votación de los padres que autorizan la salida',
        'Copia de la cédula del menor de edad',
        'Compareciente del otorgante',
      ],
    },
    {
      nombre: 'Poder general o especial de persona natural',
      descripcion: 'Otorgamiento de poder general o especial para persona natural.',
      duracionMinutos: 30,
      requisitos: [
        'Minuta',
        'Originales y una copia a color de cédula y papeleta de votación de las personas que otorgan el poder',
        'Compareciente del mandante',
      ],
    },
    {
      nombre: 'Divorcio por mutuo consentimiento',
      descripcion: 'Divorcio notarial por mutuo consentimiento entre cónyuges.',
      duracionMinutos: 45,
      requisitos: [
        'Formulario del Consejo de la Judicatura suscrito por las partes',
        'Original de partida de matrimonio',
        'Originales y una copia a color de cédula y papeleta de votación de los cónyuges',
        'En caso de tener hijos menores de edad, adjuntar resolución judical o acta de mediación sobre tenencia, alimentos y visitas',
      ],
    },
    {
      nombre: 'Disolución de la sociedad conyugal por mutuo acuerdo',
      descripcion: 'Disolución de la sociedad conyugal por mutuo acuerdo entre cónyuges.',
      duracionMinutos: 45,
      requisitos: [
        'Minuta',
        'Original de partida de matrimonio',
        'Originales y una copia a color de cédula y papeleta de vetación de los cónyuges',
      ],
    },
    {
      nombre: 'Garantía Económica',
      descripcion: 'Otorgamiento de garantía económica notarial.',
      duracionMinutos: 30,
      requisitos: [
        'Minuta',
        'Originales y una copia a color de cédula y papeleta de votación de los comparecientes',
        'Certificado bancario',
        'Pago del impuesto predial',
      ],
    },
    {
      nombre: 'Información sumaria',
      descripcion: 'Información sumaria notarial con comparecientes y testigos.',
      duracionMinutos: 30,
      requisitos: [
        'Minuta',
        'Originales y una copia a color de cédula y papeleta de votación de los comparecientes y testigos',
        'Comparecencia del solicitante y dos testigos',
      ],
    },
    {
      nombre: 'Posesión efectiva',
      descripcion: 'Trámite de posesión efectiva ante notaría.',
      duracionMinutos: 45,
      requisitos: [
        'Petitorio de abogado',
        'Acta de defunción y copias de la cédula del causante',
        'Originales y una copia a color de cédula y papeleta de votacion de los herederos',
        'Partida de matrimonio (si existe cónyuge sobreviviente)',
        'Partida de nacimiento (si el fallecido tenia hijos)',
        'Comparecencia de los herederos',
      ],
    },
    {
      nombre: 'Testamento Abierto',
      descripcion: 'Otorgamiento de testamento abierto con testigos notariales.',
      duracionMinutos: 45,
      requisitos: [
        'Minuta',
        'Original y copia de la cédula y papeleta de votación a color del testador y testigos',
        'Comparecencia del testador y tres testigos',
      ],
    },
    {
      nombre: 'Declaración juramentada persona juridica',
      descripcion: 'Declaración juramentada en representación de persona jurídica.',
      duracionMinutos: 30,
      requisitos: [
        'Comparecencia del representante legal de la persona juridica',
        'Originales y una copia a color de cedula y papeleta de votacion del representante legal de la persona jurídica',
        'RUC de la persona juridica.',
        'Nombramiento vigente del representante legal de la persona jurídica.',
      ],
    },
    {
      nombre: 'Poder general o especial de persona juridica',
      descripcion: 'Otorgamiento de poder general o especial para persona jurídica.',
      duracionMinutos: 30,
      requisitos: [
        'Minuta',
        'Comparecencia del representante legal de la persona juridica (mandante)',
        'Originales y una copia a color de cedula y papeleta de votación del mandante y mandatario',
        'RUC de la persona juridica.',
        'Nombramiento vigente del representante legal de la persona juridica.',
      ],
    },
    {
      nombre: 'Constitución en linea de compañias',
      descripcion: 'Constitución de compañías en línea ante Superintendencia de Compañías.',
      duracionMinutos: 60,
      requisitos: [
        'Llenar formulario respectivo en la web de la Superintendencia de Compañias http://www.supercias.gob.ec/portal/ConstitucionElectronica/',
        'Elegir la Notaría 43 del cantón Quito',
        'Cancelar las tasas notariales e inscripcion del Registro Mercantil',
        'Originales y una copia a color de cédula y papeleta de votacion de los socios',
        'Comparecencia de los integrantes de la compañia el dia señalado para la firma de la escritura',
      ],
    },
    {
      nombre: 'Aumento de capital',
      descripcion: 'Aumento de capital de persona jurídica ante notaría.',
      duracionMinutos: 60,
      requisitos: [
        'Minuta',
        'Acta de Junta',
        'Originales y una copia a color de cedula y papeleta de votación del representante legal de la persona juridica.',
        'RUC de la persona juridica.',
        'Nombramiento vigente del representante legal de la persona juridica.',
        'Comparecencia del representante legal de la persona juridica.',
      ],
    },
    {
      nombre: 'Reforma de estatutos',
      descripcion: 'Reforma de estatutos de persona jurídica ante notaría.',
      duracionMinutos: 60,
      requisitos: [
        'Minuta',
        'Acta de Junta',
        'Originales y una copia a color de cédula y papeleta de votación del representante legal de la persona juridica.',
        'RUC de la persona juridica',
        'Nombramiento vigente del representante legal de la persona jurídica.',
        'Comparecencia del representante legal de la persona juridica.',
      ],
    },
  ];

  for (const tramiteData of tramites) {
    const tramite = await prisma.tramite.upsert({
      where: { nombre: tramiteData.nombre },
      update: {},
      create: tramiteData,
    });
    console.log(`✅ Trámite creado: ${tramite.nombre} (${tramite.duracionMinutos} min)`);
  }

  console.log('\n🎉 Seed completado exitosamente!\n');
  console.log('=== Credenciales de Prueba ===');
  console.log('Administrativo: cédula=1710034065, contraseña=Admin12345');
  console.log('Notario:        cédula=1720408838, contraseña=Notario12345');
  console.log('Ciudadano:      cédula=1713175567, contraseña=Ciudadano12345');
}

main()
  .catch((error) => {
    console.error('❌ Error en seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
