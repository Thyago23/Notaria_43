// ============================================
// Auth Module: Controlador
// La UI es "tonta" — solo muestra datos
// ============================================

import { registerCitizen, loginUser } from './auth.service.js';
import { HTTP_STATUS } from '../../utils/constants.js';

export async function handleRegister(req, res, next) {
  try {
    const result = await registerCitizen(req.body);

    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function handleLogin(req, res, next) {
  try {
    const result = await loginUser(req.body);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Inicio de sesión exitoso',
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
