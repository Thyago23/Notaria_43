import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';

interface AppointmentData {
  cliente_nombre: string;
  cliente_email: string;
  tramite_nombre: string;
  fecha_hora: string;
  turnoId?: string;
}

export const generateBookingPDF = async (data: AppointmentData) => {
  console.log('=== INICIANDO GENERACIÓN DE PDF ===');
  console.log('Datos recibidos:', data);
  const doc = new jsPDF();

  // Add Notary Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('NOTARÍA 43', 105, 20, { align: 'center' });

  doc.setFontSize(14);
  doc.text('Comprobante de Cita Notarial', 105, 30, { align: 'center' });

  // Add Content
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);

  doc.text('Detalles de la Cita:', 20, 50);

  doc.text(`Nombre del Cliente: ${data.cliente_nombre}`, 20, 65);
  doc.text(`Email de Contacto: ${data.cliente_email}`, 20, 75);
  doc.text(`Trámite Solicitado: ${data.tramite_nombre}`, 20, 85);

  // Parse fecha_hora which is in format "DateTTime"
  const [datePart, timePart] = data.fecha_hora.split('T');
  const formattedDate = new Date(datePart).toLocaleDateString('es-EC', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  doc.text(`Fecha y Hora: ${formattedDate} a las ${timePart}`, 20, 95);

  // Add Turno ID prominently
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(`CÓDIGO DE TURNO: ${data.turnoId ? data.turnoId.toUpperCase() : 'N/A'}`, 20, 115);

  // Generate QR Code with cancellation URL
  let qrGenerated = false;
  if (data.turnoId) {
    const cancellationUrl = `https://notaria-43.vercel.app/cancelar?id=${data.turnoId}`;
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(cancellationUrl, {
        width: 120,
        margin: 2,
        errorCorrectionLevel: 'H',
      });
      console.log('QR generado exitosamente');

      // Add QR code with white background for better visibility
      doc.setFillColor(255, 255, 255);
      doc.rect(130, 125, 60, 60, 'F');
      doc.addImage(qrCodeDataUrl, 'PNG', 135, 130, 50, 50);

      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text('Escanee para cancelar', 135, 190);
      qrGenerated = true;
    } catch (qrError: any) {
      console.error('Error generating QR code:', qrError);
      // Fallback: show text if QR fails
      doc.setFontSize(8);
      doc.setTextColor(200, 0, 0);
      doc.text('Error generando QR', 135, 150);
    }
  }

  // Add Cancellation Instructions
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text('Instrucciones de Cancelación:', 20, 130);
  doc.text('Si necesita cancelar su cita, puede hacerlo:', 20, 138);
  if (qrGenerated) {
    doc.text('1. Escaneando el código QR de este documento', 20, 146);
    doc.text('2. Ingresando el código de turno en: https://notaria-43.vercel.app/cancelar', 20, 154);
  } else {
    doc.text('Ingresando el código de turno en: https://notaria-43.vercel.app/cancelar', 20, 146);
  }

  // Add Footer
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text('Por favor, preséntese 10 minutos antes de su cita con los requisitos necesarios.', 20, 190);
  doc.text('Este documento es su comprobante oficial de cita. Guárdelo para referencia.', 20, 197);

  // Save the PDF
  console.log('Guardando PDF...');
  doc.save(`cita_notarial_${data.cliente_nombre.replace(/\s+/g, '_')}.pdf`);
  console.log('PDF guardado exitosamente');
};
