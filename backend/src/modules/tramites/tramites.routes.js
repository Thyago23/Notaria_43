// ============================================
// Trámites Module: Rutas
// ============================================

import { Router } from 'express';
import {
  handleListTramites,
  handleGetTramite,
  handleCreateTramite,
  handleUpdateTramite,
  handleDeleteTramite,
} from './tramites.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { roleMiddleware } from '../../middlewares/role.middleware.js';
import { validateRequest } from '../../middlewares/validateRequest.middleware.js';
import {
  createTramiteSchema,
  updateTramiteSchema,
  tramiteIdParamSchema,
} from './tramites.validation.js';
import { USER_ROLES } from '../../utils/constants.js';

const tramitesRouter = Router();

// Listado público de trámites activos
tramitesRouter.get('/', handleListTramites);

// Detalle de trámite (público)
tramitesRouter.get(
  '/:id',
  validateRequest({ params: tramiteIdParamSchema }),
  handleGetTramite
);

// CRUD protegido (solo Administrativo)
tramitesRouter.post(
  '/',
  authMiddleware,
  roleMiddleware(USER_ROLES.ADMINISTRATIVO),
  validateRequest({ body: createTramiteSchema }),
  handleCreateTramite
);

tramitesRouter.put(
  '/:id',
  authMiddleware,
  roleMiddleware(USER_ROLES.ADMINISTRATIVO),
  validateRequest({ params: tramiteIdParamSchema, body: updateTramiteSchema }),
  handleUpdateTramite
);

tramitesRouter.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(USER_ROLES.ADMINISTRATIVO),
  validateRequest({ params: tramiteIdParamSchema }),
  handleDeleteTramite
);

export { tramitesRouter };
