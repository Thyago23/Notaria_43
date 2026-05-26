// ============================================
// Clase de Error de Aplicación
// Permite errores tipados con código HTTP
// ============================================

export class AppError extends Error {
  /**
   * @param {string} message - Mensaje descriptivo del error
   * @param {number} statusCode - Código HTTP (400, 401, 403, 404, 409, 500)
   * @param {Array<{field: string, message: string}>} [validationErrors] - Errores de validación
   */
  constructor(message, statusCode, validationErrors = null) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.isOperational = true;
    this.validationErrors = validationErrors;
  }
}
