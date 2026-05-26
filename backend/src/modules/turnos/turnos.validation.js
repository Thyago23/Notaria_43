// ============================================
// Turnos Module: Validación de Schemas
// ============================================

import { z } from '../wrappers/validator.wrapper.js';

export const createTurnoSchema = z.object({
  tramiteId: z.string().uuid('ID de trámite inválido'),
  fecha: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'La fecha debe tener formato YYYY-MM-DD'),
  horaInicio: z
    .string()
    .regex(/^\d{2}:\d{2}$/, 'La hora de inicio debe tener formato HH:MM'),
  notas: z.string().max(500).optional(),
});

export const createGuestTurnoSchema = z.object({
  tramiteId: z.string().uuid('ID de trámite inválido'),
  fecha: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'La fecha debe tener formato YYYY-MM-DD'),
  horaInicio: z
    .string()
    .regex(/^\d{2}:\d{2}$/, 'La hora de inicio debe tener formato HH:MM'),
  clienteNombre: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .trim(),
  clienteEmail: z
    .string()
    .email('Debe proporcionar un email válido')
    .trim()
    .toLowerCase(),
  notas: z.string().max(500).optional(),
});

export const turnoIdParamSchema = z.object({
  id: z.string().uuid('ID de turno inválido'),
});

export const agendaQuerySchema = z.object({
  fecha: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'La fecha debe tener formato YYYY-MM-DD')
    .optional(),
  fechaInicio: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato inválido')
    .optional(),
  fechaFin: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato inválido')
    .optional(),
});

export const disponibilidadQuerySchema = z.object({
  fecha: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'La fecha debe tener formato YYYY-MM-DD'),
  tramiteId: z.string().uuid('ID de trámite inválido'),
});

export const reporteQuerySchema = z.object({
  fechaInicio: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato inválido'),
  fechaFin: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato inválido'),
  status: z.enum(['PENDIENTE', 'ATENDIDO', 'CANCELADO']).optional(),
});
