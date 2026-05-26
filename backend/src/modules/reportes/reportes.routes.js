// ============================================
// Reportes: Rutas
// ============================================

import { Router } from 'express';
import { handleGetReport } from '../turnos/turnos.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { roleMiddleware } from '../../middlewares/role.middleware.js';
import { validateRequest } from '../../middlewares/validateRequest.middleware.js';
import { reporteQuerySchema } from '../turnos/turnos.validation.js';
import { USER_ROLES } from '../../utils/constants.js';

const reportesRouter = Router();

reportesRouter.use(authMiddleware);

reportesRouter.get(
  '/turnos',
  roleMiddleware(USER_ROLES.ADMINISTRATIVO),
  validateRequest({ query: reporteQuerySchema }),
  handleGetReport
);

export { reportesRouter };
