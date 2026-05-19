// ============================================
// Constantes del Sistema (Tokens semánticos)
// Evita magic strings/numbers en el código
// ============================================

export const USER_ROLES = Object.freeze({
  CIUDADANO: 'CIUDADANO',
  ADMINISTRATIVO: 'ADMINISTRATIVO',
  NOTARIO: 'NOTARIO',
});

export const TURNO_STATUS = Object.freeze({
  PENDIENTE: 'PENDIENTE',
  ATENDIDO: 'ATENDIDO',
  CANCELADO: 'CANCELADO',
});

export const EMAIL_STATUS = Object.freeze({
  PENDING: 'PENDING',
  SENT: 'SENT',
  FAILED: 'FAILED',
});

// Horario de atención de la notaría
export const SCHEDULE = Object.freeze({
  START_HOUR: 8,     // 08:00
  END_HOUR: 17,      // 17:00
  LUNCH_START: 13,   // 13:00
  LUNCH_END: 14,     // 14:00
  SLOT_MINUTES: 30,  // Duración base de un slot
});

export const HTTP_STATUS = Object.freeze({
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_ERROR: 500,
});
