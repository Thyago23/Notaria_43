// ============================================
// Wrapper de JWT (Agnosticismo de Dependencias)
// Si se cambia jsonwebtoken por otra lib, solo
// se edita este archivo.
// ============================================

import jwt from 'jsonwebtoken';
import { environment } from '../../config/environment.js';

/**
 * Genera un token JWT con el payload proporcionado.
 * @param {{ userId: string, role: string }} payload
 * @returns {string} Token firmado
 */
export function generateToken(payload) {
  return jwt.sign(payload, environment.jwt.secret, {
    expiresIn: environment.jwt.expiresIn,
  });
}

/**
 * Verifica y decodifica un token JWT.
 * @param {string} token
 * @returns {{ userId: string, role: string }} Payload decodificado
 * @throws {Error} Si el token es inválido o ha expirado
 */
export function verifyToken(token) {
  return jwt.verify(token, environment.jwt.secret);
}
