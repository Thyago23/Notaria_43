// ============================================
// Notificaciones Module: Servicio
// RF-04: Envío automático de confirmación SMTP
// ============================================

import { enqueueEmail } from './email.queue.js';

/**
 * Formatea una hora de tipo Date a string legible.
 */
function formatTime(timeDate) {
  const date = new Date(timeDate);
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

/**
 * Formatea una fecha a string legible en español.
 */
function formatDate(dateValue) {
  const date = new Date(dateValue);
  return date.toLocaleDateString('es-EC', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Genera y encola el email de confirmación de turno.
 * @param {object} turno - Turno con relaciones user y tramite incluidas
 */
export async function enqueueConfirmationEmail(turno) {
  const userName = turno.user
    ? `${turno.user.nombres} ${turno.user.apellidos}`
    : turno.guestNombre || 'Cliente';
  const recipientEmail = turno.user ? turno.user.email : turno.guestEmail;
  const tramiteName = turno.tramite.nombre;
  const fecha = formatDate(turno.fecha);
  const horaInicio = formatTime(turno.horaInicio);
  const horaFin = formatTime(turno.horaFin);

  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f6f9; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
        .header { background: linear-gradient(135deg, #1a365d 0%, #2b6cb0 100%); color: white; padding: 30px 24px; text-align: center; }
        .header h1 { margin: 0; font-size: 22px; font-weight: 600; }
        .header p { margin: 8px 0 0; opacity: 0.9; font-size: 14px; }
        .body { padding: 32px 24px; }
        .body h2 { color: #1a365d; font-size: 18px; margin-top: 0; }
        .detail { background: #f7fafc; border-left: 4px solid #2b6cb0; padding: 16px 20px; margin: 20px 0; border-radius: 0 8px 8px 0; }
        .detail p { margin: 6px 0; color: #4a5568; font-size: 14px; }
        .detail strong { color: #1a365d; }
        .footer { text-align: center; padding: 20px; color: #a0aec0; font-size: 12px; border-top: 1px solid #e2e8f0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Notaría 43</h1>
          <p>Confirmación de Turno</p>
        </div>
        <div class="body">
          <h2>¡Hola, ${userName}!</h2>
          <p>Su turno ha sido reservado exitosamente. A continuación los detalles:</p>
          <div class="detail">
            <p><strong>Trámite:</strong> ${tramiteName}</p>
            <p><strong>Fecha:</strong> ${fecha}</p>
            <p><strong>Horario:</strong> ${horaInicio} - ${horaFin}</p>
            <p><strong>Código de turno:</strong> ${turno.id.substring(0, 8).toUpperCase()}</p>
          </div>
          <p style="color: #718096; font-size: 13px;">
            Por favor, presente su cédula de identidad al momento de ser atendido.
            Si necesita cancelar su turno, puede hacerlo desde el sistema.
          </p>
        </div>
        <div class="footer">
          <p>Este es un correo automático, por favor no responda a este mensaje.</p>
          <p>&copy; Notaría 43 — Sistema de Gestión de Turnos</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return enqueueEmail({
    to: recipientEmail,
    subject: `Confirmación de Turno — ${tramiteName} — ${fecha}`,
    html,
  });
}

/**
 * Genera y encola el email de notificación al administrativo.
 * @param {object} turno - Turno con relaciones user y tramite incluidas
 */
export async function enqueueAdminNotificationEmail(turno) {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@notaria43.com';
  const userName = turno.user
    ? `${turno.user.nombres} ${turno.user.apellidos}`
    : turno.guestNombre || 'Cliente';
  const userPhone = turno.guestPhone || 'No proporcionado';
  const recipientEmail = turno.user ? turno.user.email : turno.guestEmail;
  const tramiteName = turno.tramite.nombre;
  const fecha = formatDate(turno.fecha);
  const horaInicio = formatTime(turno.horaInicio);
  const horaFin = formatTime(turno.horaFin);

  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f6f9; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
        .header { background: linear-gradient(135deg, #8cc550 0%, #7ab345 100%); color: white; padding: 30px 24px; text-align: center; }
        .header h1 { margin: 0; font-size: 22px; font-weight: 600; }
        .header p { margin: 8px 0 0; opacity: 0.9; font-size: 14px; }
        .body { padding: 32px 24px; }
        .body h2 { color: #1a365d; font-size: 18px; margin-top: 0; }
        .detail { background: #f7fafc; border-left: 4px solid #8cc550; padding: 16px 20px; margin: 20px 0; border-radius: 0 8px 8px 0; }
        .detail p { margin: 6px 0; color: #4a5568; font-size: 14px; }
        .detail strong { color: #1a365d; }
        .footer { text-align: center; padding: 20px; color: #a0aec0; font-size: 12px; border-top: 1px solid #e2e8f0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Notaría 43</h1>
          <p>Nueva Cita Agendada</p>
        </div>
        <div class="body">
          <h2>Notificación de Nueva Reserva</h2>
          <p>Se ha agendado una nueva cita. A continuación los detalles:</p>
          <div class="detail">
            <p><strong>Cliente:</strong> ${userName}</p>
            <p><strong>Teléfono:</strong> ${userPhone}</p>
            <p><strong>Email del cliente:</strong> ${recipientEmail}</p>
            <p><strong>Trámite:</strong> ${tramiteName}</p>
            <p><strong>Fecha:</strong> ${fecha}</p>
            <p><strong>Horario:</strong> ${horaInicio} - ${horaFin}</p>
            <p><strong>ID del turno:</strong> ${turno.id}</p>
          </div>
          <p style="color: #718096; font-size: 13px;">
            Por favor, verifique esta información en el sistema administrativo.
          </p>
        </div>
        <div class="footer">
          <p>Este es un correo automático, por favor no responda a este mensaje.</p>
          <p>&copy; Notaría 43 — Sistema de Gestión de Turnos</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return enqueueEmail({
    to: adminEmail,
    subject: `Nueva Cita Agendada — ${userName} — ${tramiteName} — ${fecha}`,
    html,
  });
}
