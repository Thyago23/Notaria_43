// ============================================
// Configuración de Variables de Entorno
// Centraliza y valida toda la configuración
// ============================================

import { config } from 'dotenv';
config();

function requireEnv(name, defaultValue) {
  const value = process.env[name] || defaultValue;
  if (value === undefined) {
    throw new Error(`Variable de entorno requerida no encontrada: ${name}`);
  }
  return value;
}

export const environment = Object.freeze({
  nodeEnv: requireEnv('NODE_ENV', 'development'),
  port: parseInt(requireEnv('PORT', '3000'), 10),
  isDevelopment: requireEnv('NODE_ENV', 'development') === 'development',
  isProduction: requireEnv('NODE_ENV', 'development') === 'production',

  database: Object.freeze({
    url: requireEnv('DATABASE_URL'),
  }),

  jwt: Object.freeze({
    secret: requireEnv('JWT_SECRET'),
    expiresIn: requireEnv('JWT_EXPIRES_IN', '24h'),
  }),

  cors: Object.freeze({
    origin: requireEnv('CORS_ORIGIN', 'http://localhost:5173'),
<<<<<<< HEAD
    // Permitir CORS_ORIGIN y puertos de desarrollo
    allowedOrigins: [
      ...requireEnv('CORS_ORIGIN', 'http://localhost:5173').split(',').map(o => o.trim()),
      'http://localhost:5173', 
      'http://localhost:5174'
=======
    allowedOrigins: [
      requireEnv('CORS_ORIGIN', 'http://localhost:5173'),
      'http://localhost:5173',
      'http://localhost:5174',
>>>>>>> b3bf90fdc1285441407ab922015324e8c94b4e06
    ],
  }),

  smtp: Object.freeze({
    host: requireEnv('SMTP_HOST', 'smtp.gmail.com'),
    port: parseInt(requireEnv('SMTP_PORT', '587'), 10),
    secure: requireEnv('SMTP_SECURE', 'false') === 'true',
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: requireEnv('SMTP_FROM', 'Notaría 43 <noreply@notaria43.com>'),
  }),

  email: Object.freeze({
    maxRetries: parseInt(requireEnv('EMAIL_MAX_RETRIES', '3'), 10),
    retryBaseDelayMs: parseInt(requireEnv('EMAIL_RETRY_BASE_DELAY_MS', '1000'), 10),
  }),
});