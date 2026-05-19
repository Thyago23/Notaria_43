// ============================================
// Trámites Module: Validación de Schemas
// ============================================

import { z } from '../wrappers/validator.wrapper.js';

export const createTramiteSchema = z.object({
  nombre: z
    .string()
    .min(3, 'El nombre del trámite debe tener al menos 3 caracteres')
    .max(200)
    .trim(),
  descripcion: z
    .string()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(1000)
    .trim(),
  duracionMinutos: z
    .number()
    .int()
    .min(15, 'La duración mínima es 15 minutos')
    .max(180, 'La duración máxima es 180 minutos'),
  requisitos: z.array(z.string().trim()).optional().default([]),
});

export const updateTramiteSchema = z.object({
  nombre: z.string().min(3).max(200).trim().optional(),
  descripcion: z.string().min(10).max(1000).trim().optional(),
  duracionMinutos: z.number().int().min(15).max(180).optional(),
  requisitos: z.array(z.string().trim()).optional(),
  isActive: z.boolean().optional(),
});

export const tramiteIdParamSchema = z.object({
  id: z.string().uuid('ID de trámite inválido'),
});
