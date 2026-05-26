// ============================================
// Configuración CORS Estricta
// Solo permite el dominio del frontend en Vercel
// Mitigación: Fuga de datos por CORS (ERS §6)
// ============================================

import { environment } from './environment.js';

export const corsOptions = Object.freeze({
  origin: environment.cors.origin,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400,
});
