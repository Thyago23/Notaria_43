// ============================================
// RF-01: Validación algorítmica de cédula
// ecuatoriana (10 dígitos, módulo 10)
// ============================================

/**
 * Valida una cédula ecuatoriana usando el algoritmo
 * oficial de módulo 10.
 *
 * Reglas:
 * - Exactamente 10 dígitos numéricos
 * - Los 2 primeros dígitos = código de provincia (01-24 o 30)
 * - El tercer dígito debe ser < 6
 * - Verificación con módulo 10
 *
 * @param {string} cedula - Cédula a validar
 * @returns {boolean} true si la cédula es válida
 */
export function isValidCedulaEcuatoriana(cedula) {
  if (!cedula || typeof cedula !== 'string') return false;

  const cleanCedula = cedula.trim();

  if (!/^\d{10}$/.test(cleanCedula)) return false;

  const provinceCode = parseInt(cleanCedula.substring(0, 2), 10);
  const isValidProvince = (provinceCode >= 1 && provinceCode <= 24) || provinceCode === 30;
  if (!isValidProvince) return false;

  const thirdDigit = parseInt(cleanCedula[2], 10);
  if (thirdDigit >= 6) return false;

  const coefficients = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  let totalSum = 0;

  for (let i = 0; i < 9; i++) {
    let digit = parseInt(cleanCedula[i], 10) * coefficients[i];
    if (digit > 9) {
      digit -= 9;
    }
    totalSum += digit;
  }

  const checkDigit = parseInt(cleanCedula[9], 10);
  const remainder = totalSum % 10;
  const expectedCheckDigit = remainder === 0 ? 0 : 10 - remainder;

  return checkDigit === expectedCheckDigit;
}
