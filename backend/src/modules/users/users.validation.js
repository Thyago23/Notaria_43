// ============================================
// Users Module: Validación de Schemas
// ============================================

import { z } from '../wrappers/validator.wrapper.js';

export const updateUserSchema = z.object({
  nombres: z
    .string()
    .min(2, 'Los nombres deben tener al menos 2 caracteres')
    .max(100)
    .trim()
    .optional(),
  apellidos: z
    .string()
    .min(2, 'Los apellidos deben tener al menos 2 caracteres')
    .max(100)
    .trim()
    .optional(),
  email: z.string().email('Debe proporcionar un email válido').trim().toLowerCase().optional(),
});

export const userIdParamSchema = z.object({
  id: z.string().uuid('ID de usuario inválido'),
});

export const createStaffUserSchema = z.object({
  cedula: z
    .string()
    .length(10, 'La cédula debe tener exactamente 10 dígitos')
    .regex(/^\d{10}$/, 'La cédula debe contener solo dígitos'),
  nombres: z.string().min(2).max(100).trim(),
  apellidos: z.string().min(2).max(100).trim(),
  email: z.string().email().trim().toLowerCase(),
  password: z.string().min(8),
  role: z.enum(['ADMINISTRATIVO', 'NOTARIO']),
});
