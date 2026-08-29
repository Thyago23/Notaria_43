const fs = require('fs');

const fromImages = [
"ACEPTACIÓN DE HERENCIA",
"ACEPTACIÓN Y REPUDIO DE HERENCIA ADULTO MAYOR",
"ACLARATORIA, AMPLIATORIA, MODIFICATORIA y RECTIFICATORIA (INCREMENTO DE CUANTÍA)",
"ACLARATORIA, AMPLIATORIA, MODIFICATORIA, RECTIFICATORIA O RATIFICATORIA",
"ACTA DE ACUERDO DE JUBILACIÓN PATRONAL",
"APROBACIÓN DE AUMENTO DE CAPITAL DE SOCIEDADES CIVILES Y MERCANTILES",
"APROBACIÓN DE CONSTITUCIÓN DE SOCIEDADES CIVILES Y MERCANTILES",
"APROBACIÓN DE ESCISIÓN DE SOCIEDADES CIVILES Y MERCANTILES",
"APROBACIÓN DE FUSIÓN POR ABSORCIÓN DE SOCIEDADES CIVILES Y MERCANTILES",
"APROBACIÓN DE REFORMA DE SOCIEDADES CIVILES Y MERCANTILES",
"AUMENTO DE CAPITAL EN ESPECIE",
"AUMENTO DE CAPITAL EN NUMERARIO",
"AUTORIZACIÓN DE INSCRIPCIÓN DE MATRÍCULAS DE COMERCIO",
"AUTORIZACIÓN DE SALIDA DEL PAÍS",
"AUTORIZACIÓN PARA TRABAJO DE MENORES DE EDAD",
"CANCELACIÓN DE CONTRATO DE PRENDA",
"CANCELACIÓN DE HIPOTECA",
"CANCELACIÓN DE HIPOTECA ADULTO MAYOR",
"CANCELACIÓN DE SOCIEDADES",
"CAPITULACIONES MATRIMONIALES",
"CESIÓN DE DERECHOS FIDUCIARIOS",
"CESIÓN DE DERECHOS HIPOTECARIOS CON CUANTÍA DETERMINADA",
"CESIÓN DE DERECHOS HIPOTECARIOS CON CUANTÍA INDETERMINADA",
"CESIÓN DE PARTICIPACIONES",
"COMODATO",
"COMPRAVENTA",
"COMPRAVENTA DE INMUEBLES FINANCIADAS CON EL BONO QUE OTORGA EL ESTADO A TRAVÉS DEL MIDUVI",
"CONSTITUCIÓN DE CONSORCIO CON CUANTÍA DETERMINADA",
"CONSTITUCIÓN DE CONSORCIO CON CUANTÍA INDETERMINADA",
"CONSTITUCIÓN DE FIDEICOMISO MERCANTIL",
"CONSTITUCIÓN DE HIPOTECA A FAVOR DEL BIESS - ISSFA -ISSPOL- MUNICIPALIDADES - MUTUALISTAS DE AHORRO Y CRÉDITO PARA LA VIVIENDA Y COOPERATIVAS DE VIVIENDA CON SUS ASOCIADOS",
"CONSTITUCIÓN DE HIPOTECA ABIERTA",
"CONSTITUCIÓN DE HIPOTECA CERRADA",
"CONSTITUCIÓN DE HIPOTECA EN LA QUE INTERVENGA EL MIDUVI",
"CONSTITUCIÓN DE MUTUO HIPOTECARIO",
"CONSTITUCIÓN DE MUTUO HIPOTECARIO ABIERTO",
"CONSTITUCIÓN DE PATRIMONIO FAMILIAR",
"CONSTITUCIÓN DE PRENDA",
"CONSTITUCIÓN DE SOCIEDADES",
"CONSTITUCIÓN DE SOCIEDADES EN LINEA",
"CONSTITUCIÓN DE USO Y HABITACIÓN",
"CONSTITUCIÓN DE USUFRUCTO",
"CONTRATO DE ARRENDAMIENTO POR ESCRITURA PÚBLICA",
"CONTRATO DE NOVACIÓN",
"CONTRATO DE PRESTACIÓN DE SERVICIOS PARA LA EXPLORACIÓN Y EXPLOTACIÓN DE HIDROCARBUROS U OTROS CONTRATOS RELACIONADOS",
"CONTRATOS DE MANDATO DE PERSONA JURÍDICA",
"DECLARACIÓN JURAMENTADA EMANCIPACIÓN VOLUNTARIA DEL HIJO ADULTO",
"DECLARACIÓN JURAMENTADA PARA EXTINCIÓN DE PATRIMONIO FAMILIAR",
"DECLARACIÓN JURAMENTADA PARA TRAMITAR LA POSESIÓN NOTORIA DEL ESTADO CIVIL",
"DECLARACIÓN JURAMENTADA PERSONA JURÍDICA",
"DECLARACIÓN JURAMENTADA PERSONA NATURAL",
"DECLARACIÓN JURAMENTADA QUE JUSTIFIQUE LA BAJA DE INVENTARIOS",
"DECLARATORIA DE INTERDICCIÓN DE LA PERSONA PRIVADA DE LA LIBERTAD",
"DECLARATORIA DE PROPIEDAD HORIZONTAL DE ALÍCUOTAS DE VIVIENDA",
"DECLARATORIA DE PROPIEDAD HORIZONTAL DE ALÍCUOTAS PARCIALES DE GIRO COMERCIAL",
"DECLARATORIA DE PROPIEDAD HORIZONTAL GIRO COMERCIAL Y DE VIVIENDA",
"DELEGACIÓN PODER ESPECIAL PERSONA JURÍDICA",
"DELEGACIÓN PODER ESPECIAL PERSONA NATURAL",
"DELEGACIÓN PODER GENERAL PERSONA JURÍDICA"
];

const existing = [
  "Compraventa de bienes inmuebles",
  "Promesa de compraventa de bienes inmuebles",
  "Insinuación para la donación",
  "Donación de bienes inmuebles",
  "Constitución de hipoteca",
  "Cancelación de hipoteca",
  "Declaratoria de propiedad horizontal",
  "Cancelación de patrimonio familiar",
  "Extinción de usufructo por muerte",
  "Inscripción de contratos de arrendamiento",
  "Desahucio",
  "Reconocimientos de firmas de vehículos (Vendedor estado civil casado o soltero)",
  "Reconocimientos de firmas de vehículos (Vendedor estado civil viudo)",
  "Reconocimientos de firmas de vehículos (Vendedor estado civil divorciado)",
  "Reconocimientos de firmas de vehículos (Vendedor persona jurídica-empresa)",
  "Certificaciones (fiel copia del original)",
  "Declaración juramentada persona natural",
  "Salida del país menor de edad",
  "Poder general o especial de persona natural",
  "Divorcio por mutuo consentimiento",
  "Disolución de la sociedad conyugal por mutuo acuerdo",
  "Garantía Económica",
  "Información sumaria",
  "Posesión efectiva",
  "Testamento Abierto",
  "Declaración juramentada persona juridica",
  "Poder general o especial de persona juridica",
  "Constitución en linea de compañias",
  "Aumento de capital",
  "Reforma de estatutos"
];

// Helper to normalize strings for comparison
const normalize = s => s.toLowerCase().trim().replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i').replace(/ó/g, 'o').replace(/ú/g, 'u').replace(/ñ/g, 'n');

const existingNormalized = existing.map(normalize);

const missing = [];
for(const item of fromImages) {
    const norm = normalize(item);
    
    // Exact or loose match in existing array
    let found = false;
    for(const ext of existingNormalized) {
        if(ext === norm || ext.includes(norm) || norm.includes(ext)) {
            found = true;
            break;
        }
    }
    
    if (norm === 'compraventa' || norm === 'autorizacion de salida del pais' || norm === 'constitucion de sociedades en linea' || norm === 'contrato de arrendamiento por escritura publica' || norm === 'declaratoria de propiedad horizontal giro comercial y de vivienda' || norm === 'aumento de capital en numerario') {
       found = true; 
    }

    if(!found) {
        missing.push(item);
    }
}

let resultStr = "";
for(const m of missing) {
   let id = m.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
   let title = m.charAt(0) + m.slice(1).toLowerCase();
   
   resultStr += "  {\n";
   resultStr += "    id: '" + id + "',\n";
   resultStr += "    categoria: 'Otros trámites notariales',\n";
   resultStr += "    nombre: '" + title + "',\n";
   resultStr += "    requisitos: [\n";
   resultStr += "      'Para conocer los requisitos específicos de este trámite, por favor contáctenos a través de nuestros canales oficiales o acérquese a la Notaría 43.'\n";
   resultStr += "    ]\n";
   resultStr += "  },\n";
}

fs.writeFileSync('missing_tramites.txt', resultStr);
console.log('Written to missing_tramites.txt! Count: ', missing.length);
