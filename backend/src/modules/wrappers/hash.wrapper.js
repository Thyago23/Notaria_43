// ============================================
// Wrapper de bcryptjs (Agnosticismo de Dep.)
// ============================================

import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12;

/**
 * Genera un hash seguro a partir de un texto plano.
 * @param {string} plainText
 * @returns {Promise<string>} Hash resultante
 */
export async function hashValue(plainText) {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(plainText, salt);
}

/**
 * Compara un texto plano con un hash.
 * @param {string} plainText
 * @param {string} hashedValue
 * @returns {Promise<boolean>} true si coinciden
 */
export async function compareHash(plainText, hashedValue) {
  return bcrypt.compare(plainText, hashedValue);
}
