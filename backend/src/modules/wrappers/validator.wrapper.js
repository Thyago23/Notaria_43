// ============================================
// Wrapper de Zod (Agnosticismo de Dependencias)
// ============================================

import { z } from 'zod';

// Re-exportamos Zod a través de nuestro wrapper
// Si se cambia Zod por Joi u otra lib, solo se edita este archivo.
export { z };

/**
 * Valida datos contra un esquema Zod.
 * @param {import('zod').ZodSchema} schema
 * @param {unknown} data
 * @returns {{ success: true, data: unknown } | { success: false, errors: Array<{ field: string, message: string }> }}
 */
export function validateData(schema, data) {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors = result.error.issues.map((issue) => ({
    field: issue.path.join('.'),
    message: issue.message,
  }));

  return { success: false, errors };
}
