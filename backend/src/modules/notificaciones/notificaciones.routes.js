// ============================================
// Notificaciones Module: Rutas
// ============================================

import { Router } from 'express';
import { handleGetFailedEmails } from './notificaciones.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { roleMiddleware } from '../../middlewares/role.middleware.js';
import { USER_ROLES } from '../../utils/constants.js';

const notificacionesRouter = Router();

// Todas las rutas requieren autenticación
notificacionesRouter.use(authMiddleware);

// Obtener emails fallidos (Administrativo)
notificacionesRouter.get(
  '/failed',
  roleMiddleware(USER_ROLES.ADMINISTRATIVO),
  handleGetFailedEmails
);

export { notificacionesRouter };
