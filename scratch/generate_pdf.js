const fs = require('fs');
const PDFDocument = require('pdfkit');

// Create a document
const doc = new PDFDocument({ margin: 50 });

// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
doc.pipe(fs.createWriteStream('../Nuevos_Tramites_Agregados.pdf'));

// Add some styling and title
doc.fontSize(20).text('Lista de Nuevos Trámites Agregados', { align: 'center' });
doc.moveDown();
doc.fontSize(12).text('A continuación se presenta el listado de los 69 trámites que fueron incorporados recientemente al catálogo de la Notaría 43, organizados por tandas de revisión.', { align: 'justify' });
doc.moveDown(2);

const tanda1 = [
"1. Aceptación de herencia",
"2. Aceptación y repudio de herencia adulto mayor",
"3. Aclaratoria, ampliatoria, modificatoria y rectificatoria (incremento de cuantía)",
"4. Aclaratoria, ampliatoria, modificatoria, rectificatoria o ratificatoria",
"5. Acta de acuerdo de jubilación patronal",
"6. Aprobación de constitución de sociedades civiles y mercantiles",
"7. Aprobación de escisión de sociedades civiles y mercantiles",
"8. Aprobación de fusión por absorción de sociedades civiles y mercantiles",
"9. Aprobación de reforma de sociedades civiles y mercantiles",
"10. Autorización de inscripción de matrículas de comercio",
"11. Autorización para trabajo de menores de edad",
"12. Cancelación de contrato de prenda",
"13. Cancelación de sociedades",
"14. Capitulaciones matrimoniales",
"15. Cesión de derechos fiduciarios",
"16. Cesión de derechos hipotecarios con cuantía determinada",
"17. Cesión de derechos hipotecarios con cuantía indeterminada",
"18. Cesión de participaciones",
"19. Comodato",
"20. Compraventa de inmuebles financiadas con el bono que otorga el estado a través del miduvi",
"21. Constitución de consorcio con cuantía determinada",
"22. Constitución de consorcio con cuantía indeterminada",
"23. Constitución de fideicomiso mercantil",
"24. Constitución de mutuo hipotecario",
"25. Constitución de mutuo hipotecario abierto",
"26. Constitución de patrimonio familiar",
"27. Constitución de prenda",
"28. Constitución de sociedades",
"29. Constitución de uso y habitación",
"30. Constitución de usufructo",
"31. Contrato de novación",
"32. Contrato de prestación de servicios para la exploración y explotación de hidrocarburos u otros contratos relacionados",
"33. Contratos de mandato de persona jurídica",
"34. Declaración juramentada emancipación voluntaria del hijo adulto",
"35. Declaración juramentada para extinción de patrimonio familiar",
"36. Declaración juramentada para tramitar la posesión notoria del estado civil",
"37. Declaración juramentada que justifique la baja de inventarios",
"38. Declaratoria de interdicción de la persona privada de la libertad",
"39. Delegación poder especial persona jurídica",
"40. Delegación poder especial persona natural",
"41. Delegación poder general persona jurídica"
];

const tanda2 = [
"42. Designación de administrador común",
"43. Disminución de capital",
"44. Disolución de alianza estratégica",
"45. Disolución de consorcio",
"46. Disolución de convenio de asociación",
"47. Disolución de la sociedad conyugal, incluida su protocolización",
"48. Disolución de la sociedad de bienes en la unión de hecho, incluida su protocolización",
"49. Disolución de sociedades",
"50. Emisión de obligaciones y titularizaciones",
"51. Encargos fiduciarios",
"52. Escritura de concesión de frecuencias de radio y televisión",
"53. Escritura de concesión de frecuencias de radio y televisión comunitaria",
"54. Escritura de concesión de minas",
"55. Escritura de concesiones que realicen los organismos del estado con cuantía indeterminada",
"56. Escritura de transferencia de dominio - ley organica para el cierre de la crisis bancaria de 1999 (disposición general innumerada)",
"57. Fe de la supervivencia de personas naturales",
"58. Fraccionamiento",
"59. Fusión de sociedades",
"60. Insinuación para donación adulto mayor",
"61. Levantamiento de protestos, incluída su protocolización",
"62. Liquidación de la sociedad conyugal",
"63. Liquidación de la sociedad de bienes en unión de hecho",
"64. Liquidación de sociedades",
"65. Modificatoria poder especial persona jurídica",
"66. Modificatoria poder especial persona natural",
"67. Modificatoria poder general persona jurídica",
"68. Modificatoria poder general persona natural",
"69. Modificatoria poderes especiales para el cobro de sueldos, pensiones de jubilación, invalidez, montepío, bono de desarrollo humano o similares"
];

doc.fontSize(14).text('Trámites Agregados (Tanda 1)', { underline: true });
doc.moveDown(0.5);
doc.fontSize(10);
tanda1.forEach(t => {
  doc.text(t);
});

doc.moveDown(2);
doc.fontSize(14).text('Trámites Agregados (Tanda 2)', { underline: true });
doc.moveDown(0.5);
doc.fontSize(10);
tanda2.forEach(t => {
  doc.text(t);
});

// Finalize PDF file
doc.end();

console.log("PDF Created!");
