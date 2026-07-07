// ============================================
// Wrapper de Nodemailer (Agnosticismo de Dep.)
// ============================================

import nodemailer from 'nodemailer';
import { environment } from '../../config/environment.js';

let transporterInstance = null;

function createTransporter() {
  // Validate SMTP credentials
  if (!environment.smtp.user || !environment.smtp.pass) {
    console.error('[EMAIL] SMTP credentials are missing. Email sending will fail.');
  }

  return nodemailer.createTransport({
    host: environment.smtp.host,
    port: environment.smtp.port,
    secure: environment.smtp.secure,
    auth: {
      user: environment.smtp.user,
      pass: environment.smtp.pass,
    },
    connectionTimeout: 30000, // 30 seconds
    greetingTimeout: 15000, // 15 seconds
    socketTimeout: 30000, // 30 seconds
    tls: {
      rejectUnauthorized: false, // Allow self-signed certificates
    },
  });
}

function getTransporter() {
  if (!transporterInstance) {
    transporterInstance = createTransporter();
  }
  return transporterInstance;
}

/**
 * Envía un correo electrónico.
 * @param {{ to: string, subject: string, html: string }} options
 * @returns {Promise<object>} Resultado del envío
 */
export async function sendEmail({ to, subject, html }) {
  const transporter = getTransporter();

  return transporter.sendMail({
    from: environment.smtp.from,
    to,
    subject,
    html,
  });
}
