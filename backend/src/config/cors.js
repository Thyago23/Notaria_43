// ============================================
// Configuración CORS Estricta
// Solo permite el dominio del frontend en Vercel
// Mitigación: Fuga de datos por CORS (ERS §6)
// ============================================

import { environment } from './environment.js';

export const corsOptions = Object.freeze({
  origin: (origin, callback) => {
    const allowedOrigins = environment.cors.allowedOrigins || [environment.cors.origin];
    // Permitir requests sin origin (como mobile apps o curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400,
});
