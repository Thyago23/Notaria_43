import { jsPDF, GState } from 'jspdf';
import QRCode from 'qrcode';

interface AppointmentData {
  cliente_nombre: string;
  cliente_email: string;
  tramite_nombre: string;
  fecha_hora: string;
  turnoId?: string;
}

const COLOR_DARK: [number, number, number] = [26, 26, 26];
const COLOR_PRIMARY: [number, number, number] = [140, 197, 80];
const COLOR_PRIMARY_DARK: [number, number, number] = [35, 85, 30];
const COLOR_GRAY: [number, number, number] = [110, 110, 110];
const COLOR_BORDER: [number, number, number] = [220, 224, 216];

const PAGE_WIDTH = 210;
const MARGIN = 20;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

async function loadImageAsDataUrl(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const blob = await response.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export const generateBookingPDF = async (data: AppointmentData) => {
  const doc = new jsPDF();
  const logoDataUrl = await loadImageAsDataUrl('/logo_notaria.png');
  const logoOffsetX = logoDataUrl ? MARGIN + 22 : MARGIN;

  // ---------- Encabezado (membrete) ----------
  if (logoDataUrl) {
    doc.addImage(logoDataUrl, 'PNG', MARGIN, 14, 18, 18);
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(19);
  doc.setTextColor(...COLOR_PRIMARY_DARK);
  doc.text('NOTARÍA 43', logoOffsetX, 23);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...COLOR_GRAY);
  doc.text('Notaría Cuadragésima Tercera del Cantón Quito', logoOffsetX, 29);

  doc.setDrawColor(...COLOR_PRIMARY);
  doc.setLineWidth(0.8);
  doc.line(MARGIN, 36, PAGE_WIDTH - MARGIN, 36);

  doc.setFontSize(7.5);
  doc.setTextColor(...COLOR_GRAY);
  doc.text(
    'Av. Ilaló y Río Tivacuno Oe11-323, Vía al Tingo (Valle de los Chillos), Quito · Tel: 0958644106 · notaria43_quito@hotmail.com',
    PAGE_WIDTH / 2,
    41,
    { align: 'center' }
  );

  // ---------- Título del documento ----------
  doc.setFillColor(...COLOR_PRIMARY);
  doc.rect(MARGIN, 48, CONTENT_WIDTH, 9, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text('COMPROBANTE DE CITA NOTARIAL', PAGE_WIDTH / 2, 54, { align: 'center' });

  // ---------- Marca de agua ----------
  if (logoDataUrl) {
    doc.saveGraphicsState();
    doc.setGState(new GState({ opacity: 0.06 }));
    const watermarkSize = 110;
    doc.addImage(
      logoDataUrl,
      'PNG',
      (PAGE_WIDTH - watermarkSize) / 2,
      100,
      watermarkSize,
      watermarkSize
    );
    doc.restoreGraphicsState();
  }

  // ---------- Detalles de la cita ----------
  const [datePart, timePart] = data.fecha_hora.split('T');
  // new Date('YYYY-MM-DD') parses as UTC midnight, which shifts to the previous
  // day once toLocaleDateString renders it in a timezone behind UTC (e.g. Ecuador).
  // Building the Date from numeric components keeps everything in local time.
  const [year, month, day] = datePart.split('-').map(Number);
  const formattedDate = capitalize(
    new Date(year, month - 1, day).toLocaleDateString('es-EC', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  );

  const [rawHour, rawMinute] = timePart.split(':').map(Number);
  const period = rawHour >= 12 ? 'PM' : 'AM';
  const hour12 = rawHour % 12 === 0 ? 12 : rawHour % 12;
  const formattedTime = `${hour12}:${String(rawMinute).padStart(2, '0')} ${period}`;

  let cursorY = 68;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...COLOR_PRIMARY_DARK);
  doc.text('DETALLES DE LA CITA', MARGIN, cursorY);
  cursorY += 4;

  const rows: [string, string][] = [
    ['Cliente', data.cliente_nombre],
    ['Correo de contacto', data.cliente_email],
    ['Trámite', data.tramite_nombre],
    ['Fecha', formattedDate],
    ['Hora', formattedTime],
  ];

  const rowHeight = 9;
  const boxTop = cursorY + 2;
  const boxHeight = rows.length * rowHeight + 4;

  doc.setDrawColor(...COLOR_BORDER);
  doc.setLineWidth(0.3);
  doc.roundedRect(MARGIN, boxTop, CONTENT_WIDTH, boxHeight, 2, 2, 'S');

  rows.forEach(([label, value], index) => {
    const rowY = boxTop + 7 + index * rowHeight;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...COLOR_GRAY);
    doc.text(label.toUpperCase(), MARGIN + 5, rowY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.5);
    doc.setTextColor(...COLOR_DARK);
    doc.text(value, MARGIN + 55, rowY, { maxWidth: CONTENT_WIDTH - 60 });

    if (index < rows.length - 1) {
      doc.setDrawColor(...COLOR_BORDER);
      doc.line(MARGIN + 5, rowY + 3, PAGE_WIDTH - MARGIN - 5, rowY + 3);
    }
  });

  // ---------- Código de turno + QR (estilo boleto) ----------
  const ticketTop = boxTop + boxHeight + 10;
  const ticketHeight = 42;
  const codeBoxWidth = 100;
  const qrBoxWidth = CONTENT_WIDTH - codeBoxWidth - 6;
  const qrX = MARGIN + codeBoxWidth + 6;

  doc.setDrawColor(...COLOR_PRIMARY_DARK);
  doc.setLineWidth(0.6);
  doc.roundedRect(MARGIN, ticketTop, codeBoxWidth, ticketHeight, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...COLOR_GRAY);
  doc.text('CÓDIGO DE TURNO', MARGIN + codeBoxWidth / 2, ticketTop + 10, { align: 'center' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...COLOR_PRIMARY_DARK);
  const codeText = data.turnoId ? data.turnoId.toUpperCase() : 'N/A';
  doc.text(codeText, MARGIN + codeBoxWidth / 2, ticketTop + 22, {
    align: 'center',
    maxWidth: codeBoxWidth - 10,
  });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...COLOR_GRAY);
  doc.text('Presente este código o el QR para cancelar su cita', MARGIN + codeBoxWidth / 2, ticketTop + 34, {
    align: 'center',
    maxWidth: codeBoxWidth - 10,
  });

  let qrGenerated = false;
  if (data.turnoId) {
    try {
      const cancellationUrl = `https://notaria-43.vercel.app/cancelar?id=${data.turnoId}`;
      const qrCodeDataUrl = await QRCode.toDataURL(cancellationUrl, {
        width: 150,
        margin: 1,
        errorCorrectionLevel: 'H',
      });

      doc.setDrawColor(...COLOR_BORDER);
      doc.setLineWidth(0.3);
      doc.roundedRect(qrX, ticketTop, qrBoxWidth, ticketHeight, 2, 2, 'S');

      const qrSize = ticketHeight - 14;
      doc.addImage(
        qrCodeDataUrl,
        'PNG',
        qrX + (qrBoxWidth - qrSize) / 2,
        ticketTop + 4,
        qrSize,
        qrSize
      );

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(...COLOR_GRAY);
      doc.text('Escanee para cancelar', qrX + qrBoxWidth / 2, ticketTop + ticketHeight - 4, {
        align: 'center',
      });
      qrGenerated = true;
    } catch (qrError) {
      console.error('Error generating QR code:', qrError);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(200, 0, 0);
      doc.text('No se pudo generar el QR', qrX + qrBoxWidth / 2, ticketTop + ticketHeight / 2, {
        align: 'center',
      });
    }
  }

  // ---------- Instrucciones de cancelación ----------
  let instructionsY = ticketTop + ticketHeight + 12;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...COLOR_PRIMARY_DARK);
  doc.text('INSTRUCCIONES DE CANCELACIÓN', MARGIN, instructionsY);
  instructionsY += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...COLOR_DARK);
  const instructions = qrGenerated
    ? [
        '1. Escaneando el código QR de este documento.',
        '2. Ingresando el código de turno en: https://notaria-43.vercel.app/cancelar',
      ]
    : ['Ingresando el código de turno en: https://notaria-43.vercel.app/cancelar'];

  instructions.forEach((line, i) => {
    doc.text(line, MARGIN, instructionsY + i * 6);
  });

  // ---------- Pie de página ----------
  const footerY = 275;
  doc.setDrawColor(...COLOR_BORDER);
  doc.setLineWidth(0.3);
  doc.line(MARGIN, footerY - 8, PAGE_WIDTH - MARGIN, footerY - 8);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(...COLOR_GRAY);
  doc.text('Por favor, preséntese 10 minutos antes de su cita con los requisitos necesarios.', MARGIN, footerY - 2);
  doc.text('Este documento es su comprobante oficial de cita. Guárdelo para referencia.', MARGIN, footerY + 4);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.text(
    `Generado electrónicamente el ${new Date().toLocaleString('es-EC')}`,
    PAGE_WIDTH / 2,
    footerY + 12,
    { align: 'center' }
  );

  doc.save(`cita_notarial_${data.cliente_nombre.replace(/\s+/g, '_')}.pdf`);
};
