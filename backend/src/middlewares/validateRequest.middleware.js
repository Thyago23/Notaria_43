// ============================================
// Middleware: Validación de Request
// Usa el wrapper de Zod para validar body/params
// ============================================

import { validateData } from '../modules/wrappers/validator.wrapper.js';
import { AppError } from '../utils/appError.js';
import { HTTP_STATUS } from '../utils/constants.js';

/**
 * Factory que crea un middleware de validación.
 * @param {{ body?: import('zod').ZodSchema, params?: import('zod').ZodSchema, query?: import('zod').ZodSchema }} schemas
 * @returns {import('express').RequestHandler}
 */
export function validateRequest(schemas) {
  return (req, _res, next) => {
    if (schemas.body) {
      const result = validateData(schemas.body, req.body);
      if (!result.success) {
        return next(new AppError('Error de validación', HTTP_STATUS.BAD_REQUEST, result.errors));
      }
      req.body = result.data;
    }

    if (schemas.params) {
      const result = validateData(schemas.params, req.params);
      if (!result.success) {
        return next(new AppError('Parámetros inválidos', HTTP_STATUS.BAD_REQUEST, result.errors));
      }
      req.params = result.data;
    }

    if (schemas.query) {
      const result = validateData(schemas.query, req.query);
      if (!result.success) {
        return next(new AppError('Query inválida', HTTP_STATUS.BAD_REQUEST, result.errors));
      }
      req.query = result.data;
    }

    next();
  };
}
