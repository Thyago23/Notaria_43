// ============================================
// Middleware: Autorización por Rol
// Restringe acceso según roles permitidos
// ============================================

import { AppError } from '../utils/appError.js';
import { HTTP_STATUS } from '../utils/constants.js';

/**
 * Factory que crea un middleware de autorización
 * para los roles especificados.
 * @param  {...string} allowedRoles - Roles permitidos (USER_ROLES.*)
 * @returns {import('express').RequestHandler}
 */
export function roleMiddleware(...allowedRoles) {
  return (req, _res, next) => {
    if (!req.user) {
      return next(new AppError('Autenticación requerida', HTTP_STATUS.UNAUTHORIZED));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new AppError(
          `Acceso denegado. Roles permitidos: ${allowedRoles.join(', ')}`,
          HTTP_STATUS.FORBIDDEN
        )
      );
    }

    next();
  };
}
