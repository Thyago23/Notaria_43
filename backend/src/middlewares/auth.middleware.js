// ============================================
// Middleware: Autenticación JWT
// Verifica el token en Authorization: Bearer
// ============================================

import { verifyToken } from '../modules/wrappers/jwt.wrapper.js';
import { AppError } from '../utils/appError.js';
import { HTTP_STATUS } from '../utils/constants.js';

/**
 * Middleware que verifica la presencia y validez del JWT.
 * Inyecta `req.user` con { userId, role } si el token es válido.
 */
export function authMiddleware(req, _res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Token de autenticación requerido', HTTP_STATUS.UNAUTHORIZED));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.user = { userId: decoded.userId, role: decoded.role };
    next();
  } catch (error) {
    return next(new AppError('Token inválido o expirado', HTTP_STATUS.UNAUTHORIZED));
  }
}
