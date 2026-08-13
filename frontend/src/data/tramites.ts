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
  },
  {
    id: 'aceptaci-n-de-herencia',
    categoria: 'Trámites notariales referentes a personas y familia',
    nombre: 'Aceptación de herencia',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'aceptaci-n-y-repudio-de-herencia-adulto-mayor',
    categoria: 'Trámites notariales referentes a personas y familia',
    nombre: 'Aceptación y repudio de herencia adulto mayor',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'aclaratoria-ampliatoria-modificatoria-y-rectificatoria-incremento-de-cuant-a',
    categoria: 'Trámites notariales referentes a bienes inmuebles (casas, terrenos y oficinas)',
    nombre: 'Aclaratoria, ampliatoria, modificatoria y rectificatoria (incremento de cuantía)',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'aclaratoria-ampliatoria-modificatoria-rectificatoria-o-ratificatoria',
    categoria: 'Trámites notariales referentes a personas y familia',
    nombre: 'Aclaratoria, ampliatoria, modificatoria, rectificatoria o ratificatoria',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'acta-de-acuerdo-de-jubilaci-n-patronal',
    categoria: 'Trámites notariales referentes a personas y familia',
    nombre: 'Acta de acuerdo de jubilación patronal',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'aprobaci-n-de-constituci-n-de-sociedades-civiles-y-mercantiles',
    categoria: 'Trámites notariales referentes a personas juridicas',
    nombre: 'Aprobación de constitución de sociedades civiles y mercantiles',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'aprobaci-n-de-escisi-n-de-sociedades-civiles-y-mercantiles',
    categoria: 'Trámites notariales referentes a personas juridicas',
    nombre: 'Aprobación de escisión de sociedades civiles y mercantiles',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'aprobaci-n-de-fusi-n-por-absorci-n-de-sociedades-civiles-y-mercantiles',
    categoria: 'Trámites notariales referentes a personas juridicas',
    nombre: 'Aprobación de fusión por absorción de sociedades civiles y mercantiles',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'aprobaci-n-de-reforma-de-sociedades-civiles-y-mercantiles',
    categoria: 'Trámites notariales referentes a personas juridicas',
    nombre: 'Aprobación de reforma de sociedades civiles y mercantiles',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'autorizaci-n-de-inscripci-n-de-matr-culas-de-comercio',
    categoria: 'Trámites notariales referentes a personas juridicas',
    nombre: 'Autorización de inscripción de matrículas de comercio',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'autorizaci-n-para-trabajo-de-menores-de-edad',
    categoria: 'Trámites notariales referentes a personas y familia',
    nombre: 'Autorización para trabajo de menores de edad',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'cancelaci-n-de-contrato-de-prenda',
    categoria: 'Trámites notariales referentes a bienes inmuebles (casas, terrenos y oficinas)',
    nombre: 'Cancelación de contrato de prenda',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'cancelaci-n-de-sociedades',
    categoria: 'Trámites notariales referentes a personas juridicas',
    nombre: 'Cancelación de sociedades',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'capitulaciones-matrimoniales',
    categoria: 'Trámites notariales referentes a personas y familia',
    nombre: 'Capitulaciones matrimoniales',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'cesi-n-de-derechos-fiduciarios',
    categoria: 'Trámites notariales referentes a personas juridicas',
    nombre: 'Cesión de derechos fiduciarios',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'cesi-n-de-derechos-hipotecarios-con-cuant-a-determinada',
    categoria: 'Trámites notariales referentes a bienes inmuebles (casas, terrenos y oficinas)',
    nombre: 'Cesión de derechos hipotecarios con cuantía determinada',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'cesi-n-de-derechos-hipotecarios-con-cuant-a-indeterminada',
    categoria: 'Trámites notariales referentes a bienes inmuebles (casas, terrenos y oficinas)',
    nombre: 'Cesión de derechos hipotecarios con cuantía indeterminada',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'cesi-n-de-participaciones',
    categoria: 'Trámites notariales referentes a personas juridicas',
    nombre: 'Cesión de participaciones',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'comodato',
    categoria: 'Trámites notariales referentes a bienes inmuebles (casas, terrenos y oficinas)',
    nombre: 'Comodato',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'compraventa-de-inmuebles-financiadas-con-el-bono-que-otorga-el-estado-a-trav-s-del-miduvi',
    categoria: 'Trámites notariales referentes a bienes inmuebles (casas, terrenos y oficinas)',
    nombre: 'Compraventa de inmuebles financiadas con el bono que otorga el estado a través del miduvi',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'constituci-n-de-consorcio-con-cuant-a-determinada',
    categoria: 'Trámites notariales referentes a personas juridicas',
    nombre: 'Constitución de consorcio con cuantía determinada',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'constituci-n-de-consorcio-con-cuant-a-indeterminada',
    categoria: 'Trámites notariales referentes a personas juridicas',
    nombre: 'Constitución de consorcio con cuantía indeterminada',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'constituci-n-de-fideicomiso-mercantil',
    categoria: 'Trámites notariales referentes a personas juridicas',
    nombre: 'Constitución de fideicomiso mercantil',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'constituci-n-de-mutuo-hipotecario',
    categoria: 'Trámites notariales referentes a bienes inmuebles (casas, terrenos y oficinas)',
    nombre: 'Constitución de mutuo hipotecario',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'constituci-n-de-mutuo-hipotecario-abierto',
    categoria: 'Trámites notariales referentes a bienes inmuebles (casas, terrenos y oficinas)',
    nombre: 'Constitución de mutuo hipotecario abierto',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'constituci-n-de-patrimonio-familiar',
    categoria: 'Trámites notariales referentes a personas y familia',
    nombre: 'Constitución de patrimonio familiar',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'constituci-n-de-prenda',
    categoria: 'Trámites notariales referentes a bienes inmuebles (casas, terrenos y oficinas)',
    nombre: 'Constitución de prenda',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'constituci-n-de-sociedades',
    categoria: 'Trámites notariales referentes a personas juridicas',
    nombre: 'Constitución de sociedades',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'constituci-n-de-uso-y-habitaci-n',
    categoria: 'Trámites notariales referentes a bienes inmuebles (casas, terrenos y oficinas)',
    nombre: 'Constitución de uso y habitación',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'constituci-n-de-usufructo',
    categoria: 'Trámites notariales referentes a bienes inmuebles (casas, terrenos y oficinas)',
    nombre: 'Constitución de usufructo',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'contrato-de-novaci-n',
    categoria: 'Trámites notariales referentes a personas y familia',
    nombre: 'Contrato de novación',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'contrato-de-prestaci-n-de-servicios-para-la-exploraci-n-y-explotaci-n-de-hidrocarburos-u-otros-contratos-relacionados',
    categoria: 'Trámites notariales referentes a personas y familia',
    nombre: 'Contrato de prestación de servicios para la exploración y explotación de hidrocarburos u otros contratos relacionados',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'contratos-de-mandato-de-persona-jur-dica',
    categoria: 'Trámites notariales referentes a personas juridicas',
    nombre: 'Contratos de mandato de persona jurídica',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'declaraci-n-juramentada-emancipaci-n-voluntaria-del-hijo-adulto',
    categoria: 'Trámites notariales referentes a personas y familia',
    nombre: 'Declaración juramentada emancipación voluntaria del hijo adulto',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'declaraci-n-juramentada-para-extinci-n-de-patrimonio-familiar',
    categoria: 'Trámites notariales referentes a personas y familia',
    nombre: 'Declaración juramentada para extinción de patrimonio familiar',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'declaraci-n-juramentada-para-tramitar-la-posesi-n-notoria-del-estado-civil',
    categoria: 'Trámites notariales referentes a personas y familia',
    nombre: 'Declaración juramentada para tramitar la posesión notoria del estado civil',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'declaraci-n-juramentada-que-justifique-la-baja-de-inventarios',
    categoria: 'Trámites notariales referentes a personas y familia',
    nombre: 'Declaración juramentada que justifique la baja de inventarios',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'declaratoria-de-interdicci-n-de-la-persona-privada-de-la-libertad',
    categoria: 'Trámites notariales referentes a personas y familia',
    nombre: 'Declaratoria de interdicción de la persona privada de la libertad',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'delegaci-n-poder-especial-persona-jur-dica',
    categoria: 'Trámites notariales referentes a personas juridicas',
    nombre: 'Delegación poder especial persona jurídica',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'delegaci-n-poder-especial-persona-natural',
    categoria: 'Trámites notariales referentes a personas y familia',
    nombre: 'Delegación poder especial persona natural',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'delegaci-n-poder-general-persona-jur-dica',
    categoria: 'Trámites notariales referentes a personas juridicas',
    nombre: 'Delegación poder general persona jurídica',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
,
  {
    id: 'designaci-n-de-administrador-com-n',
    categoria: 'Trámites notariales referentes a personas y familia',
    nombre: 'Designación de administrador común',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'disminuci-n-de-capital',
    categoria: 'Trámites notariales referentes a personas juridicas',
    nombre: 'Disminución de capital',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'disoluci-n-de-alianza-estrat-gica',
    categoria: 'Trámites notariales referentes a personas juridicas',
    nombre: 'Disolución de alianza estratégica',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'disoluci-n-de-consorcio',
    categoria: 'Trámites notariales referentes a personas juridicas',
    nombre: 'Disolución de consorcio',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'disoluci-n-de-convenio-de-asociaci-n',
    categoria: 'Trámites notariales referentes a personas y familia',
    nombre: 'Disolución de convenio de asociación',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'disoluci-n-de-la-sociedad-conyugal-incluida-su-protocolizaci-n',
    categoria: 'Trámites notariales referentes a personas y familia',
    nombre: 'Disolución de la sociedad conyugal, incluida su protocolización',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'disoluci-n-de-la-sociedad-de-bienes-en-la-uni-n-de-hecho-incluida-su-protocolizaci-n',
    categoria: 'Trámites notariales referentes a personas y familia',
    nombre: 'Disolución de la sociedad de bienes en la unión de hecho,incluida su protocolización',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'disoluci-n-de-sociedades',
    categoria: 'Trámites notariales referentes a personas juridicas',
    nombre: 'Disolución de sociedades',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'emisi-n-de-obligaciones-y-titularizaciones',
    categoria: 'Trámites notariales referentes a personas juridicas',
    nombre: 'Emisión de obligaciones y titularizaciones',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'encargos-fiduciarios',
    categoria: 'Trámites notariales referentes a personas juridicas',
    nombre: 'Encargos fiduciarios',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'escritura-de-concesi-n-de-frecuencias-de-radio-y-televisi-n',
    categoria: 'Trámites notariales referentes a bienes inmuebles (casas, terrenos y oficinas)',
    nombre: 'Escritura de concesión de frecuencias de radio y televisión',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'escritura-de-concesi-n-de-frecuencias-de-radio-y-televisi-n-comunitaria',
    categoria: 'Trámites notariales referentes a bienes inmuebles (casas, terrenos y oficinas)',
    nombre: 'Escritura de concesión de frecuencias de radio y televisión comunitaria',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'escritura-de-concesi-n-de-minas',
    categoria: 'Trámites notariales referentes a bienes inmuebles (casas, terrenos y oficinas)',
    nombre: 'Escritura de concesión de minas',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'escritura-de-concesiones-que-realicen-los-organismos-del-estado-con-cuant-a-indeterminada',
    categoria: 'Trámites notariales referentes a bienes inmuebles (casas, terrenos y oficinas)',
    nombre: 'Escritura de concesiones que realicen los organismos del estado con cuantía indeterminada',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'escritura-de-transferencia-de-dominio-ley-organica-para-el-cierre-de-la-crisis-bancaria-de-1999-disposici-n-general-innumerada',
    categoria: 'Trámites notariales referentes a personas y familia',
    nombre: 'Escritura de transferencia de dominio - ley organica para el cierre de la crisis bancaria de 1999 (disposición general innumerada)',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'fe-de-la-supervivencia-de-personas-naturales',
    categoria: 'Trámites notariales referentes a personas y familia',
    nombre: 'Fe de la supervivencia de personas naturales',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'fraccionamiento',
    categoria: 'Trámites notariales referentes a bienes inmuebles (casas, terrenos y oficinas)',
    nombre: 'Fraccionamiento',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'fusi-n-de-sociedades',
    categoria: 'Trámites notariales referentes a personas juridicas',
    nombre: 'Fusión de sociedades',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'insinuaci-n-para-donaci-n-adulto-mayor',
    categoria: 'Trámites notariales referentes a personas y familia',
    nombre: 'Insinuación para donación adulto mayor',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'levantamiento-de-protestos-inclu-da-su-protocolizaci-n',
    categoria: 'Trámites notariales referentes a personas juridicas',
    nombre: 'Levantamiento de protestos, incluída su protocolización',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'liquidaci-n-de-la-sociedad-conyugal',
    categoria: 'Trámites notariales referentes a personas y familia',
    nombre: 'Liquidación de la sociedad conyugal',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'liquidaci-n-de-la-sociedad-de-bienes-en-uni-n-de-hecho',
    categoria: 'Trámites notariales referentes a personas y familia',
    nombre: 'Liquidación de la sociedad de bienes en unión de hecho',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'liquidaci-n-de-sociedades',
    categoria: 'Trámites notariales referentes a personas juridicas',
    nombre: 'Liquidación de sociedades',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'modificatoria-poder-especial-persona-jur-dica',
    categoria: 'Trámites notariales referentes a personas juridicas',
    nombre: 'Modificatoria poder especial persona jurídica',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'modificatoria-poder-especial-persona-natural',
    categoria: 'Trámites notariales referentes a personas y familia',
    nombre: 'Modificatoria poder especial persona natural',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'modificatoria-poder-general-persona-jur-dica',
    categoria: 'Trámites notariales referentes a personas juridicas',
    nombre: 'Modificatoria poder general persona jurídica',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'modificatoria-poder-general-persona-natural',
    categoria: 'Trámites notariales referentes a personas y familia',
    nombre: 'Modificatoria poder general persona natural',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },
  {
    id: 'modificatoria-poderes-especiales-para-el-cobro-de-sueldos-pensiones-de-jubilaci-n-invalidez-montep-o-bono-de-desarrollo-humano-o-similares',
    categoria: 'Trámites notariales referentes a personas y familia',
    nombre: 'Modificatoria poderes especiales para el cobro de sueldos, pensiones de jubilación, invalidez, montepío, bono de desarrollo humano o similares',
    requisitos: [
      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'
    ]
  },

];
