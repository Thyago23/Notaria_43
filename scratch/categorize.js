const fs = require('fs');
const path = '../frontend/src/data/tramites.ts';

let content = fs.readFileSync(path, 'utf8');

const categories = {
  inmuebles: 'Trámites notariales referentes a bienes inmuebles (casas, terrenos y oficinas)',
  arrendamiento: 'Arrendamiento de bienes inmuebles',
  vehiculos: 'Compraventa de vehículos/motos y demás automotores',
  personasFamilia: 'Trámites notariales referentes a personas y familia',
  personasJuridicas: 'Trámites notariales referentes a personas juridicas'
};

function getCategory(name) {
  name = name.toLowerCase();
  
  if (name.includes('sociedad') || name.includes('mercantil') || name.includes('capital') || 
      name.includes('consorcio') || name.includes('participacion') || name.includes('fiduciario') || 
      name.includes('fideicomiso') || name.includes('jurídica') || name.includes('comercio') || 
      name.includes('escisión') || name.includes('fusión') || name.includes('alianza') || 
      name.includes('acciones') || name.includes('titularizacion') || name.includes('protesto') ||
      name.includes('compañia') || name.includes('empresa') || name.includes('nombramiento')) {
    
    // Except if it's sociedad conyugal or sociedad de bienes (unión de hecho)
    if (name.includes('sociedad conyugal') || name.includes('sociedad de bienes') || name.includes('unión de hecho')) {
      return categories.personasFamilia;
    }
    return categories.personasJuridicas;
  }

  if (name.includes('herencia') || name.includes('adulto mayor') || name.includes('estado civil') || 
      name.includes('emancipación') || name.includes('interdicción') || name.includes('capitulaciones') || 
      name.includes('divorcio') || name.includes('jubilación') || name.includes('donación') || 
      name.includes('supervivencia') || name.includes('unión de hecho') || name.includes('persona natural') ||
      name.includes('hijo') || name.includes('privada de la libertad')) {
    return categories.personasFamilia;
  }

  if (name.includes('hipoteca') || name.includes('inmueble') || name.includes('propiedad horizontal') || 
      name.includes('cuantía') || name.includes('alícuota') || name.includes('habitaci') || 
      name.includes('usufructo') || name.includes('miduvi') || name.includes('biess') || 
      name.includes('municipalidad') || name.includes('concesión') || name.includes('fraccionamiento') ||
      name.includes('comodato') || name.includes('prenda')) {
    return categories.inmuebles;
  }

  if (name.includes('arrendamiento') || name.includes('desahucio')) {
    return categories.arrendamiento;
  }
  
  if (name.includes('vehículo') || name.includes('automotor') || name.includes('moto')) {
    return categories.vehiculos;
  }

  // Fallbacks based on typical legal terminology
  if (name.includes('aclaratoria') || name.includes('ampliatoria') || name.includes('modificatoria') || name.includes('rectificatoria') || name.includes('ratificatoria') || name.includes('novación') || name.includes('baja de inventarios') || name.includes('información sumaria') || name.includes('poder especial') || name.includes('poder general')) {
    return categories.personasFamilia; 
  }

  // Default
  return categories.personasFamilia;
}

// Regex to find and replace the category in the objects
const objRegex = /\{\s*id:\s*'[^']+',\s*categoria:\s*'Otros trámites notariales',\s*nombre:\s*'([^']+)',/g;

content = content.replace(objRegex, (match, nombre) => {
  const newCat = getCategory(nombre);
  return match.replace('Otros trámites notariales', newCat);
});

fs.writeFileSync(path, content);
console.log('Categorized successfully!');
