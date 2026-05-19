// ============================================
// Notificaciones Module: Cola de Email
// RF-04: Cola de reintentos con backoff exponencial
// Mitigación: Indisponibilidad del SMTP (ERS §6)
// ============================================

import { getDatabase } from '../../config/database.js';
import { sendEmail } from '../wrappers/email.wrapper.js';
import { environment } from '../../config/environment.js';
import { EMAIL_STATUS } from '../../utils/constants.js';

/**
 * Procesa un email de la cola con reintentos y backoff exponencial.
 * @param {string} emailId
 */
async function processEmailWithRetry(emailId) {
  const database = getDatabase();

  const emailRecord = await database.emailQueue.findUnique({
    where: { id: emailId },
  });

  if (!emailRecord || emailRecord.status === EMAIL_STATUS.SENT) return;

  const { maxRetries, retryBaseDelayMs } = environment.email;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      await sendEmail({
        to: emailRecord.to,
        subject: emailRecord.subject,
        html: emailRecord.htmlContent,
      });

      await database.emailQueue.update({
        where: { id: emailId },
        data: { status: EMAIL_STATUS.SENT, retries: attempt },
      });

      console.log(`[EMAIL] Enviado exitosamente a ${emailRecord.to} (intento ${attempt + 1})`);
      return;
    } catch (error) {
      console.warn(
        `[EMAIL] Fallo al enviar a ${emailRecord.to} (intento ${attempt + 1}/${maxRetries + 1}): ${error.message}`
      );

      if (attempt < maxRetries) {
        // Backoff exponencial: 1s, 2s, 4s
        const delay = retryBaseDelayMs * Math.pow(2, attempt);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        // Máximo de reintentos alcanzado
        await database.emailQueue.update({
          where: { id: emailId },
          data: {
            status: EMAIL_STATUS.FAILED,
            retries: attempt + 1,
            lastError: error.message,
          },
        });

        console.error(
          `[EMAIL] Fallido definitivamente para ${emailRecord.to} después de ${maxRetries + 1} intentos`
        );
      }
    }
  }
}

/**
 * Encola un email para envío asíncrono.
 * @param {{ to: string, subject: string, html: string }} emailData
 */
export async function enqueueEmail({ to, subject, html }) {
  const database = getDatabase();

  const emailRecord = await database.emailQueue.create({
    data: {
      to,
      subject,
      htmlContent: html,
    },
  });

  // Procesar asíncronamente — no bloquea la respuesta HTTP
  processEmailWithRetry(emailRecord.id).catch((error) => {
    console.error('[EMAIL QUEUE] Error procesando email:', error.message);
  });

  return emailRecord;
}
