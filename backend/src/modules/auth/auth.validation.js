// ============================================
// Auth Module: Validación de Schemas
// ============================================

import { z } from '../wrappers/validator.wrapper.js';

export const registerSchema = z.object({
  cedula: z
    .string()
    .length(10, 'La cédula debe tener exactamente 10 dígitos')
    .regex(/^\d{10}$/, 'La cédula debe contener solo dígitos'),
  nombres: z
    .string()
    .min(2, 'Los nombres deben tener al menos 2 caracteres')
    .max(100, 'Los nombres no pueden exceder 100 caracteres')
    .trim(),
  apellidos: z
    .string()
    .min(2, 'Los apellidos deben tener al menos 2 caracteres')
    .max(100, 'Los apellidos no pueden exceder 100 caracteres')
    .trim(),
  email: z.string().email('Debe proporcionar un email válido').trim().toLowerCase(),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
});

export const loginSchema = z.object({
  cedula: z.string().min(1, 'La cédula es requerida'),
  password: z.string().min(1, 'La contraseña es requerida'),
});
