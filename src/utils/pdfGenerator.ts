import { jsPDF } from 'jspdf';

interface AppointmentData {
  cliente_nombre: string;
  cliente_email: string;
  tramite_nombre: string;
  fecha_hora: string;
}

export const generateBookingPDF = (data: AppointmentData) => {
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

  // Add Footer
  doc.setFontSize(10);
  doc.text('Por favor, preséntese 10 minutos antes de su cita con los requisitos necesarios.', 20, 120);

  // Save the PDF
  doc.save(`cita_notarial_${data.cliente_nombre.replace(/\s+/g, '_')}.pdf`);
};
