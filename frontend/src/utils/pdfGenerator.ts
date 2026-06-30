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
  doc.text(`Fecha y Hora: ${new Date(data.fecha_hora).toLocaleString()}`, 20, 95);

  // Add Turno ID prominently
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(`CÓDIGO DE TURNO: ${data.turnoId ? data.turnoId.toUpperCase() : 'N/A'}`, 20, 115);

  // Generate QR Code with cancellation URL
  if (data.turnoId) {
    const cancellationUrl = `https://notaria43.com/cancelar?id=${data.turnoId}`;
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(cancellationUrl, {
        width: 100,
        margin: 1,
      });
      doc.addImage(qrCodeDataUrl, 'PNG', 140, 120, 50, 50);
      doc.setFontSize(8);
      doc.text('Escanee para cancelar', 140, 175);
    } catch (qrError) {
      console.error('Error generating QR code:', qrError);
    }
  }

  // Add Cancellation Instructions
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('Instrucciones de Cancelación:', 20, 130);
  doc.text('Si necesita cancelar su cita, puede hacerlo ingresando el código de turno en:', 20, 138);
  doc.text('https://notaria43.com/cancelar', 20, 146);
  doc.text('o escaneando el código QR de este documento.', 20, 154);

  // Add Footer
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text('Por favor, preséntese 10 minutos antes de su cita con los requisitos necesarios.', 20, 190);
  doc.text('Este documento es su comprobante oficial de cita. Guárdelo para referencia.', 20, 197);

  // Save the PDF
  doc.save(`cita_notarial_${data.cliente_nombre.replace(/\s+/g, '_')}.pdf`);
};
