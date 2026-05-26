// ============================================
// Entry Point: Servidor Express
// Sistema de Gestión de Turnos — Notaría 43
// ============================================

import express from 'express';
import cors from 'cors';
import { environment } from './config/environment.js';
import { corsOptions } from './config/cors.js';
import { errorHandlerMiddleware } from './middlewares/errorHandler.middleware.js';
import { disconnectDatabase } from './config/database.js';
import { runSeedIfEmpty } from './config/seed.js';

// Importar rutas de módulos
import { authRouter } from './modules/auth/auth.routes.js';
import { usersRouter } from './modules/users/users.routes.js';
import { tramitesRouter } from './modules/tramites/tramites.routes.js';
import { turnosRouter } from './modules/turnos/turnos.routes.js';
import { reportesRouter } from './modules/reportes/reportes.routes.js';

const app = express();

// ============================================
// Middlewares Globales
// ============================================
app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// ============================================
// Health Check
// ============================================
app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    message: 'Backend Notaría 43 funcionando correctamente',
    timestamp: new Date().toISOString(),
    environment: environment.nodeEnv,
  });
});

// ============================================
// Rutas de la API
// ============================================
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/tramites', tramitesRouter);
app.use('/api/turnos', turnosRouter);
app.use('/api/reportes', reportesRouter);

// ============================================
// Ruta 404
// ============================================
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Recurso no encontrado',
  });
});

// ============================================
// Manejador Global de Errores
// ============================================
app.use(errorHandlerMiddleware);

// ============================================
// Iniciar Servidor
// ============================================
const server = app.listen(environment.port, async () => {
  console.log(`\n🏛️  Backend Notaría 43`);
  console.log(`📍 Servidor corriendo en http://localhost:${environment.port}`);
  console.log(`🌍 Entorno: ${environment.nodeEnv}`);
  console.log(`🔗 CORS permitido: ${environment.cors.origin}\n`);

  // Ejecutar seed automático si la BD está vacía
  await runSeedIfEmpty();
});

// ============================================
// Graceful Shutdown
// ============================================
async function gracefulShutdown(signal) {
  console.log(`\n[${signal}] Cerrando servidor...`);
  await disconnectDatabase();
  server.close(() => {
    console.log('Servidor cerrado correctamente.');
    process.exit(0);
  });
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

export { app };
