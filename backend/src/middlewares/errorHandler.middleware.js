// ============================================
// Middleware: Manejador Global de Errores
// Nunca silencia un error (Clean Code §IV)
// ============================================

import { AppError } from '../utils/appError.js';
import { HTTP_STATUS } from '../utils/constants.js';
import { environment } from '../config/environment.js';

/**
 * Middleware global de manejo de errores.
 * Captura todos los errores propagados y responde con formato consistente.
 */
export function errorHandlerMiddleware(err, _req, res, _next) {
  // Errores operacionales (controlados)
  if (err instanceof AppError) {
    const response = {
      success: false,
      message: err.message,
    };

    if (err.validationErrors) {
      response.errors = err.validationErrors;
    }

    return res.status(err.statusCode).json(response);
  }

  // Errores de Prisma conocidos
  if (err.code === 'P2002') {
    return res.status(HTTP_STATUS.CONFLICT).json({
      success: false,
      message: 'El registro ya existe. Verifique los datos e intente nuevamente.',
    });
  }

  if (err.code === 'P2025') {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      message: 'El registro solicitado no fue encontrado.',
    });
  }

  // Errores de exclusión GIST (condición de carrera en turnos)
  if (err.code === '23P01') {
    return res.status(HTTP_STATUS.CONFLICT).json({
      success: false,
      message: 'El horario seleccionado ya no está disponible. Por favor seleccione otro.',
    });
  }

  // Errores inesperados - se registran pero no se exponen al cliente
  console.error('[ERROR NO CONTROLADO]', err);

  return res.status(HTTP_STATUS.INTERNAL_ERROR).json({
    success: false,
    message: `Error interno: ${err.message}`,
    stack: err.stack,
  });
}
