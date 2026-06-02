export interface Tramite {
  id: string;
  categoria: string;
  nombre: string;
  requisitos: string[];
}

export const TRAMITES_DATA: Tramite[] = [
  // Trámites notariales referentes a bienes inmuebles
  {
    id: 'compraventa-inmuebles',
    categoria: 'Trámites notariales referentes a bienes inmuebles (casas, terrenos y oficinas)',
    nombre: 'Compraventa de bienes inmuebles',
    requisitos: [
      'Minuta',
      'Originales y una copia a color de cédula y papeleta de votación de compradores y vendedores',
      'Constancia de pagos de impuesto (predial, alcabala municipal, consejo provincial) Si aplica obras y plusvalia',
      'Certificado de gravamen vigente del Registro de la Propiedad',
      'Si aplica propiedad horizontal, certificado de expensas, acta y nombramiento de administrador, copia de cédula y papeleta de votacion del administrador',
      'Comparecencia de las partes'
    ]
  },
  {
    id: 'promesa-compraventa',
    categoria: 'Trámites notariales referentes a bienes inmuebles (casas, terrenos y oficinas)',
    nombre: 'Promesa de compraventa de bienes inmuebles',
    requisitos: [
      'Minuta',
      'Originales y una copia a color de cédula y papeleta de votación de promitentes compradores y vendedores',
      'Certificado de gravamen vigente del Registro de la Propiedad',
      'Comparecencia de las partes'
    ]
  },
  {
    id: 'insinuacion-donacion',
    categoria: 'Trámites notariales referentes a bienes inmuebles (casas, terrenos y oficinas)',
    nombre: 'Insinuación para la donación',
    requisitos: [
      'Minuta',
      'Originales y una copia a color de cédula y papeleta de votación de donantes y donatarios y dos testigos',
      'Certificado de gravamen vigente del Registro de la Propiedad',
      'Comparecencia de las partes'
    ]
  },
  {
    id: 'donacion-inmuebles',
    categoria: 'Trámites notariales referentes a bienes inmuebles (casas, terrenos y oficinas)',
    nombre: 'Donación de bienes inmuebles',
    requisitos: [
      'Minuta',
      'Escritura de insinuación para la donación',
      'Originales y una copia a color de cédula y papeleta de votación de donantes y donatarios',
      'Constancia de pagos de impuesto (predial, alcabala municipal, consejo provincial) Si aplica obras',
      'Certificado de gravamen vigente del Registro de la Propiedad',
      'Si aplica propiedad horizontal, certificado de expensas, acta y nombramiento de administrador, copia de cédula y papeleta de votación del administrador',
      'Comparecencia de las partes'
    ]
  },
  {
    id: 'constitucion-hipoteca',
    categoria: 'Trámites notariales referentes a bienes inmuebles (casas, terrenos y oficinas)',
    nombre: 'Constitución de hipoteca',
    requisitos: [
      'Minuta',
      'Originales y una copia a color de cédula y papeleta de votación de acreedores y deudores',
      'Si el acreedor hipotecario es persona jurídica se requiere el nombramiento o poder de la persona jurídica que representa, RUC',
      'Comparecencia de las partes',
      'Certificado del Registro de la Propiedad',
      'Pago del impuesto predial actualizado'
    ]
  },
  {
    id: 'cancelacion-hipoteca',
    categoria: 'Trámites notariales referentes a bienes inmuebles (casas, terrenos y oficinas)',
    nombre: 'Cancelación de hipoteca',
    requisitos: [
      'Minuta',
      'Originales y una copia a color de cédula y papeleta de votación de acreedores y deudores',
      'Si el acreedor hipotecario es persona jurídica se requiere el nombramiento o poder de la persona jurídica que representa, RUC',
      'Comparecencia de las partes'
    ]
  },
  {
    id: 'declaratoria-propiedad-horizontal',
    categoria: 'Trámites notariales referentes a bienes inmuebles (casas, terrenos y oficinas)',
    nombre: 'Declaratoria de propiedad horizontal',
    requisitos: [
      'Minuta',
      'Originales y una copia a color de cédula y papeleta de votación de comparecientes',
      'Original y planos aprobados por el Municipio',
      'Certificado de gravamen vigente del Registro de la Propiedad',
      'Comparecencia de las partes',
      'Carpeta completa que le entrega el Municipio de Quito, donde se aprueba la Declaratoria de Propiedad Horizontal',
      'Pago del impuesto predial'
    ]
  },
  {
    id: 'cancelacion-patrimonio-familiar',
    categoria: 'Trámites notariales referentes a bienes inmuebles (casas, terrenos y oficinas)',
    nombre: 'Cancelación de patrimonio familiar',
    requisitos: [
      'Minuta',
      'Oficio de la entidad financiera autorizando la cancelación del patrimonio familiar',
      'Originales y una copia a color de cédula y papeleta de votación de comparecientes',
      'Certificado de gravamen vigente del Registro de la Propiedad',
      'Comparecencia de las partes (peticionarios y dos testigos)'
    ]
  },
  {
    id: 'extincion-usufructo',
    categoria: 'Trámites notariales referentes a bienes inmuebles (casas, terrenos y oficinas)',
    nombre: 'Extinción de usufructo por muerte',
    requisitos: [
      'Minuta',
      'Originales y una copla a color de cédula y papeleta de votación de comparecientes',
      'Certificado de gravamen vigente del Registro de la Propiedad',
      'Partida de defunción',
      'Comparecencia de las partes'
    ]
  },

  // Arrendamiento de bienes inmuebles
  {
    id: 'inscripcion-arrendamiento',
    categoria: 'Arrendamiento de bienes inmuebles',
    nombre: 'Inscripción de contratos de arrendamiento',
    requisitos: [
      'Tres contratos originales de arrendamientos suscritos por las partes',
      'Originales y tres copias de cédulas y papeleta de votación de arrendadora y arrendataria',
      'Tres copias de planilla de luz, agua, teléfono a nombre de arrendador o pago del impuesto predial'
    ]
  },
  {
    id: 'desahucio',
    categoria: 'Arrendamiento de bienes inmuebles',
    nombre: 'Desahucio',
    requisitos: [
      'Petitorio suscrito por abogado',
      'Contratos de arrendamientos debidamente inscritos',
      'Originales y tres copias de cédula y papeleta de votación'
    ]
  },

  // Compraventa de vehículos/motos y demás automotores
  {
    id: 'vehiculos-casado-soltero',
    categoria: 'Compraventa de vehículos/motos y demás automotores',
    nombre: 'Reconocimientos de firmas de vehículos (Vendedor estado civil casado o soltero)',
    requisitos: [
      'Certificado único vehicular emitido por la Agencia Nacional de Tránsito',
      'Dos contratos originales llenos y firmados',
      'Originales y dos copias a color de la matrícula',
      'Originales y dos copias a color de cédula y papeleta de votación de compradores y vendedores',
      'Comparecencia de compradores y vendedores (Vendedor casado: deben firmar ambos cónyuges)'
    ]
  },
  {
    id: 'vehiculos-viudo',
    categoria: 'Compraventa de vehículos/motos y demás automotores',
    nombre: 'Reconocimientos de firmas de vehículos (Vendedor estado civil viudo)',
    requisitos: [
      'Certificado único vehicular emitido por la Agencia Nacional de Tránsito',
      'Dos contratos originales llenos y firmados',
      'Originales y dos copias a color de la matricula',
      'Originales y dos copias a color de cédula y papeleta de votación de compradores y vendedores',
      'Escritura de posesión efectiva (pagos de impuesto a la herencia). - Si el vehículo fue adquirido siendo de estado civil viudo adjuntar acta de defunción.',
      'Comparecencia de compradores y vendedor'
    ]
  },
  {
    id: 'vehiculos-divorciado',
    categoria: 'Compraventa de vehículos/motos y demás automotores',
    nombre: 'Reconocimientos de firmas de vehículos (Vendedor estado civil divorciado)',
    requisitos: [
      'Certificado único vehicular emitido por la Agencia Nacional de Tránsito',
      'Dos contratos originales llenos y firmados',
      'Originales y dos copias a color de la matricula',
      'Originales y dos copias a color de cédula y papeleta de votación de compradores y vendedores',
      'Partida de matrimonio con la respectiva marginación de divorcio',
      'Comparecencia de compradores y vendedor'
    ]
  },
  {
    id: 'vehiculos-juridica',
    categoria: 'Compraventa de vehículos/motos y demás automotores',
    nombre: 'Reconocimientos de firmas de vehículos (Vendedor persona jurídica-empresa)',
    requisitos: [
      'Certificado único vehicular emitido por la Agencia Nacional de Tránsito',
      'Dos contratos originales llenos y firmados',
      'Originales y dos copias a color de la matricula',
      'Originales y dos copias a color de cédula y papeleta de votación de compradores y vendedores',
      'Acta de Junta autorizando la venta del vehículo',
      'RUC de la persona jurídica',
      'Nombramiento vigente del representante legal de la persona jurídica',
      'Comparecencia de compradores y vendedor (representante legal de la persona juridica)'
    ]
  },

  // Trámites notariales referentes a personas y familia
  {
    id: 'certificaciones',
    categoria: 'Trámites notariales referentes a personas y familia',
    nombre: 'Certificaciones (fiel copia del original)',
    requisitos: [
      'Original del documento que se quiera certificar',
      'Dos copias (uno a color y una en blanco y negro) del documento que se quiera certificar'
    ]
  },
  {
    id: 'declaracion-juramentada',
    categoria: 'Trámites notariales referentes a personas y familia',
    nombre: 'Declaración juramentada persona natural',
    requisitos: [
      'Comparecencia del declarante',
      'Originales y una copia a color de cédula y papeleta de votación del compareciente.'
    ]
  },
  {
    id: 'salida-pais',
    categoria: 'Trámites notariales referentes a personas y familia',
    nombre: 'Salida del país menor de edad',
    requisitos: [
      'Petitorio de abogado',
      'Originales y una copia a color de cédula y papeleta de votación de los padres que autorizan la salida',
      'Copia de la cédula del menor de edad',
      'Compareciente del otorgante'
    ]
  },
  {
    id: 'poder-general',
    categoria: 'Trámites notariales referentes a personas y familia',
    nombre: 'Poder general o especial de persona natural',
    requisitos: [
      'Minuta',
      'Originales y una copia a color de cédula y papeleta de votación de las personas que otorgan el poder',
      'Compareciente del mandante'
    ]
  },
  {
    id: 'divorcio-mutuo',
    categoria: 'Trámites notariales referentes a personas y familia',
    nombre: 'Divorcio por mutuo consentimiento',
    requisitos: [
      'Formulario del Consejo de la Judicatura suscrito por las partes',
      'Original de partida de matrimonio',
      'Originales y una copia a color de cédula y papeleta de votación de los cónyuges',
      'En caso de tener hijos menores de edad, adjuntar resolución judical o acta de mediación sobre tenencia, alimentos y visitas'
    ]
  },
  {
    id: 'disolucion-sociedad',
    categoria: 'Trámites notariales referentes a personas y familia',
    nombre: 'Disolución de la sociedad conyugal por mutuo acuerdo',
    requisitos: [
      'Minuta',
      'Original de partida de matrimonio',
      'Originales y una copia a color de cédula y papeleta de votación de los cónyuges'
    ]
  },
  {
    id: 'garantia-economica',
    categoria: 'Trámites notariales referentes a personas y familia',
    nombre: 'Garantía Económica',
    requisitos: [
      'Minuta',
      'Originales y una copia a color de cédula y papeleta de votación de los comparecientes',
      'Certificado bancario',
      'Pago del impuesto predial'
    ]
  },
  {
    id: 'informacion-sumaria',
    categoria: 'Trámites notariales referentes a personas y familia',
    nombre: 'Información sumaria',
    requisitos: [
      'Minuta',
      'Originales y una copia a color de cédula y papeleta de votación de los comparecientes y testigos',
      'Comparecencia del solicitante y dos testigos'
    ]
  },
  {
    id: 'posesion-efectiva',
    categoria: 'Trámites notariales referentes a personas y familia',
    nombre: 'Posesión efectiva',
    requisitos: [
      'Petitorio de abogado',
      'Acta de defunción y copias de la cédula del causante',
      'Originales y una copia a color de cédula y papeleta de votacion de los herederos',
      'Partida de matrimonio (si existe cónyuge sobreviviente)',
      'Partida de nacimiento (si el fallecido tenia hijos)',
      'Comparecencia de los herederos'
    ]
  },
  {
    id: 'testamento-abierto',
    categoria: 'Trámites notariales referentes a personas y familia',
    nombre: 'Testamento Abierto',
    requisitos: [
      'Minuta',
      'Original y copia de la cédula y papeleta de votación a color del testador y testigos',
      'Comparecencia del testador y tres testigos'
    ]
  },

  // Trámites notariales referentes a personas jurídicas
  {
    id: 'declaracion-juramentada-juridica',
    categoria: 'Trámites notariales referentes a personas juridicas',
    nombre: 'Declaración juramentada persona juridica',
    requisitos: [
      'Comparecencia del representante legal de la persona juridica',
      'Originales y una copia a color de cedula y papeleta de votacion del representante legal de la persona jurídica',
      'RUC de la persona juridica.',
      'Nombramiento vigente del representante legal de la persona jurídica.'
    ]
  },
  {
    id: 'poder-general-juridica',
    categoria: 'Trámites notariales referentes a personas juridicas',
    nombre: 'Poder general o especial de persona juridica',
    requisitos: [
      'Minuta',
      'Comparecencia del representante legal de la persona juridica (mandante)',
      'Originales y una copia a color de cedula y papeleta de votación del mandante y mandatario',
      'RUC de la persona juridica.',
      'Nombramiento vigente del representante legal de la persona juridica.'
    ]
  },
  {
    id: 'constitucion-companias',
    categoria: 'Trámites notariales referentes a personas juridicas',
    nombre: 'Constitución en linea de compañias',
    requisitos: [
      'Llenar formulario respectivo en la web de la Superintendencia de Compañias http://www.supercias.gob.ec/portal/ConstitucionElectronica/',
      'Elegir la Notaría 43 del cantón Quito',
      'Cancelar las tasas notariales e inscripcion del Registro Mercantil',
      'Originales y una copia a color de cédula y papeleta de votacion de los socios',
      'Comparecencia de los integrantes de la compañia el dia señalado para la firma de la escritura'
    ]
  },
  {
    id: 'aumento-capital',
    categoria: 'Trámites notariales referentes a personas juridicas',
    nombre: 'Aumento de capital',
    requisitos: [
      'Minuta',
      'Acta de Junta',
      'Originales y una copia a color de cedula y papeleta de votación del representante legal de la persona juridica.',
      'RUC de la persona juridica.',
      'Nombramiento vigente del representante legal de la persona juridica.',
      'Comparecencia del representante legal de la persona juridica.'
    ]
  },
  {
    id: 'reforma-estatutos',
    categoria: 'Trámites notariales referentes a personas juridicas',
    nombre: 'Reforma de estatutos',
    requisitos: [
      'Minuta',
      'Acta de Junta',
      'Originales y una copia a color de cédula y papeleta de votación del representante legal de la persona juridica.',
      'RUC de la persona juridica',
      'Nombramiento vigente del representante legal de la persona jurídica.',
      'Comparecencia del representante legal de la persona juridica.'
    ]
  }
];
