import DOMPurify from 'dompurify';

/**
 * Utilidad centralizada de sanitización y validación de entradas
 * para prevenir ataques XSS (Cross-Site Scripting) e Inyección.
 * Cumplimiento con OWASP Top 10 (A03:2021 - Injection / A07:2021 - XSS).
 */

/**
 * Sanitiza texto plano eliminando todas las etiquetas HTML y scripts.
 * Ideal para campos de texto como nombres, cédulas, teléfonos y notas.
 */
export const sanitizeText = (input: string | null | undefined): string => {
  if (!input) return '';
  const str = String(input).trim();
  try {
    if (typeof DOMPurify !== 'undefined' && DOMPurify.sanitize) {
      return DOMPurify.sanitize(str, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }).trim();
    }
  } catch (e) {
    console.warn('DOMPurify no disponible en este entorno, usando fallback regex');
  }
  // Fallback seguro de eliminación de etiquetas HTML y caracteres peligrosos básicos
  return str.replace(/<[^>]*>?/gm, '').replace(/[<>]/g, '').trim();
};

/**
 * Sanitiza contenido HTML permitiendo solo etiquetas seguras de formato.
 * Ideal para contenido enriquecido si se llegara a usar en el futuro.
 */
export const sanitizeHTML = (html: string | null | undefined): string => {
  if (!html) return '';
  const str = String(html).trim();
  try {
    if (typeof DOMPurify !== 'undefined' && DOMPurify.sanitize) {
      return DOMPurify.sanitize(str, {
        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li'],
        ALLOWED_ATTR: ['href', 'target', 'rel'],
      });
    }
  } catch (e) {
    console.warn('DOMPurify no disponible en este entorno, usando fallback regex');
  }
  return str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};

/**
 * Sanitiza recursivamente un objeto de datos de formulario (FormData o JSON)
 * limpiando todas sus propiedades de tipo string.
 */
export const sanitizeObject = <T extends Record<string, any>>(obj: T): T => {
  if (!obj || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) {
    return obj.map((item) => (typeof item === 'string' ? sanitizeText(item) : typeof item === 'object' ? sanitizeObject(item) : item)) as unknown as T;
  }
  const sanitized: Record<string, any> = {};
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    if (typeof value === 'string') {
      sanitized[key] = sanitizeText(value);
    } else if (value && typeof value === 'object') {
      sanitized[key] = sanitizeObject(value);
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized as T;
};

/**
 * Validación estricta de correo electrónico según estándar RFC/OWASP.
 */
export const validateEmail = (email: string): boolean => {
  if (!email) return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
};

/**
 * Validación de cédula o identificación (formato ecuatoriano o estándar 10 dígitos numéricos).
 */
export const validateCedula = (cedula: string): boolean => {
  if (!cedula) return false;
  const cleanCedula = cedula.trim();
  const cedulaRegex = /^[0-9]{10}$/;
  return cedulaRegex.test(cleanCedula);
};

/**
 * Validación de número telefónico (7 a 15 dígitos permitiendo + al inicio y espacios/guiones).
 */
export const validatePhone = (phone: string): boolean => {
  if (!phone) return false;
  const cleanPhone = phone.replace(/[\s-]/g, '').trim();
  const phoneRegex = /^\+?[0-9]{7,15}$/;
  return phoneRegex.test(cleanPhone);
};

/**
 * Validación de complejidad de contraseña (mínimo 6 caracteres).
 */
export const validatePassword = (password: string): { valid: boolean; message?: string } => {
  if (!password || password.length < 6) {
    return { valid: false, message: 'La contraseña debe tener al menos 6 caracteres.' };
  }
  return { valid: true };
};
