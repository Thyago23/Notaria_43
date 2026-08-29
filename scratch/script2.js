const fs = require('fs');

const fromImages = [
"DESIGNACIÓN DE ADMINISTRADOR COMÚN",
"DISMINUCIÓN DE CAPITAL",
"DISOLUCIÓN DE ALIANZA ESTRATÉGICA",
"DISOLUCIÓN DE CONSORCIO",
"DISOLUCIÓN DE CONVENIO DE ASOCIACIÓN",
"DISOLUCIÓN DE LA SOCIEDAD CONYUGAL, INCLUIDA SU PROTOCOLIZACIÓN",
"DISOLUCIÓN DE LA SOCIEDAD DE BIENES EN LA UNIÓN DE HECHO,INCLUIDA SU PROTOCOLIZACIÓN",
"DISOLUCIÓN DE SOCIEDADES",
"DIVORCIO POR MUTUO CONSENTIMIENTO, INCLUIDA SU PROTOCOLIZACIÓN",
"DONACIÓN",
"EMANCIPACIÓN VOLUNTARIA DEL HIJO ADULTO",
"EMISIÓN DE OBLIGACIONES Y TITULARIZACIONES",
"ENCARGOS FIDUCIARIOS",
"ESCISIÓN DE SOCIEDADES",
"ESCRITURA DE CONCESIÓN DE FRECUENCIAS DE RADIO Y TELEVISIÓN",
"ESCRITURA DE CONCESIÓN DE FRECUENCIAS DE RADIO Y TELEVISIÓN COMUNITARIA",
"ESCRITURA DE CONCESIÓN DE MINAS",
"ESCRITURA DE CONCESIONES QUE REALICEN LOS ORGANISMOS DEL ESTADO CON CUANTÍA INDETERMINADA",
"ESCRITURA DE TRANSFERENCIA DE DOMINIO - LEY ORGANICA PARA EL CIERRE DE LA CRISIS BANCARIA DE 1999 (DISPOSICIÓN GENERAL INNUMERADA)",
"FE DE LA SUPERVIVENCIA DE PERSONAS NATURALES",
"FRACCIONAMIENTO",
"FUSIÓN DE SOCIEDADES",
"GARANTÍA ECONÓMICA ADULTO MAYOR",
"GARANTÍA ECONÓMICA DE PERSONAS JURÍDICAS",
"GARANTÍA ECONÓMICA DE PERSONAS NATURALES",
"INFORMACIÓN SUMARIA Y DE NUDO HECHO",
"INSINUACIÓN PARA DONACIÓN ADULTO MAYOR",
"INSINUACIÓN PARA LA DONACIÓN, INCLUIDA SU PROTOCOLIZACIÓN",
"LEVANTAMIENTO DE PROTESTOS, INCLUÍDA SU PROTOCOLIZACIÓN",
"LIQUIDACIÓN DE LA SOCIEDAD CONYUGAL",
"LIQUIDACIÓN DE LA SOCIEDAD DE BIENES EN UNIÓN DE HECHO",
"LIQUIDACIÓN DE SOCIEDADES",
"MODIFICATORIA PODER ESPECIAL PERSONA JURÍDICA",
"MODIFICATORIA PODER ESPECIAL PERSONA NATURAL",
"MODIFICATORIA PODER GENERAL PERSONA JURÍDICA",
"MODIFICATORIA PODER GENERAL PERSONA NATURAL",
"MODIFICATORIA PODERES ESPECIALES PARA EL COBRO DE SUELDOS, PENSIONES DE JUBILACIÓN, INVALIDEZ, MONTEPÍO, BONO DE DESARROLLO HUMANO O SIMILARES",
"MODIFICATORIA, RECTIFICATORIA, AMPLIATORIA, RATIFICATORIA DE ALÍCUOTAS DE DECLARATORIA DE PROPIEDAD HORIZONTAL"
];

const tramitesFile = '../frontend/src/data/tramites.ts';
let content = fs.readFileSync(tramitesFile, 'utf8');

// Extract all existing 'nombre: "..."' strings
const existingNamesMatch = [...content.matchAll(/nombre:\s*['"]([^'"]+)['"]/g)];
const existingNames = existingNamesMatch.map(m => m[1]);

// Helper to normalize strings for comparison
const normalize = s => s.toLowerCase().trim().replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i').replace(/ó/g, 'o').replace(/ú/g, 'u').replace(/ñ/g, 'n');

const existingNormalized = existingNames.map(normalize);

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
    
    if (norm === 'divorcio por mutuo consentimiento, incluida su protocolizacion' || norm === 'donacion' || norm === 'garantia economica de personas naturales' || norm === 'insinuacion para la donacion, incluida su protocolizacion') {
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

content = content.replace(/\n\];[\s\n]*$/, ',\n' + resultStr + '\n];\n');
fs.writeFileSync(tramitesFile, content);

console.log('Added ' + missing.length + ' new tramites to tramites.ts');
