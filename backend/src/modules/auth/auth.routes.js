// ============================================
// Auth Module: Rutas
// ============================================

import { Router } from 'express';
import { handleRegister, handleLogin } from './auth.controller.js';
import { validateRequest } from '../../middlewares/validateRequest.middleware.js';
import { registerSchema, loginSchema } from './auth.validation.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateRequest({ body: registerSchema }),
  handleRegister
);

authRouter.post(
  '/login',
  validateRequest({ body: loginSchema }),
  handleLogin
);

export { authRouter };
