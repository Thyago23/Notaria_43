// ============================================
// Users Module: Rutas
// ============================================

import { Router } from 'express';
import {
  handleGetProfile,
  handleUpdateProfile,
  handleCreateStaffUser,
  handleListUsers,
  handleUpdateUser,
  handleDeleteUser
} from './users.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { roleMiddleware } from '../../middlewares/role.middleware.js';
import { validateRequest } from '../../middlewares/validateRequest.middleware.js';
import { updateUserSchema, createStaffUserSchema } from './users.validation.js';
import { USER_ROLES } from '../../utils/constants.js';

const usersRouter = Router();

// Todas las rutas de usuario requieren autenticación
usersRouter.use(authMiddleware);

// Perfil del usuario autenticado
usersRouter.get('/profile', handleGetProfile);

usersRouter.put(
  '/profile',
  validateRequest({ body: updateUserSchema }),
  handleUpdateProfile
);

// Gestión de usuarios (solo Administrativo)
usersRouter.get(
  '/',
  roleMiddleware(USER_ROLES.ADMINISTRATIVO),
  handleListUsers
);

usersRouter.post(
  '/staff',
  roleMiddleware(USER_ROLES.ADMINISTRATIVO),
  validateRequest({ body: createStaffUserSchema }),
  handleCreateStaffUser
);

usersRouter.put(
  '/:id',
  roleMiddleware(USER_ROLES.ADMINISTRATIVO),
  handleUpdateUser
);

usersRouter.delete(
  '/:id',
  roleMiddleware(USER_ROLES.ADMINISTRATIVO),
  handleDeleteUser
);

export { usersRouter };
