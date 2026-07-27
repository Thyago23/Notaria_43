import { describe, it, expect } from 'vitest';
import { sanitizeText, sanitizeHTML, sanitizeObject, validateEmail, validateCedula, validatePhone, validatePassword } from '../../utils/sanitizer';

describe('Sanitization & Validation Utilities (OWASP Compliance)', () => {
  describe('sanitizeText', () => {
    it('strips <script> tags and XSS payloads from input string', () => {
      const maliciousInput = 'Juan Perez <script>alert("XSS")</script>';
      const clean = sanitizeText(maliciousInput);
      expect(clean).not.toContain('<script>');
      expect(clean).not.toContain('alert');
      expect(clean).toBe('Juan Perez');
    });

    it('handles null or undefined inputs gracefully', () => {
      expect(sanitizeText(null)).toBe('');
      expect(sanitizeText(undefined)).toBe('');
    });

    it('strips img onerror payloads', () => {
      const input = '<img src=x onerror=alert(1)>Carlos';
      expect(sanitizeText(input)).toBe('Carlos');
    });
  });

  describe('sanitizeHTML', () => {
    it('allows basic formatting tags but removes scripts', () => {
      const input = '<b>Importante:</b> <script>stealCookies()</script><p>Revisar documento.</p>';
      const clean = sanitizeHTML(input);
      expect(clean).toContain('<b>Importante:</b>');
      expect(clean).toContain('<p>Revisar documento.</p>');
      expect(clean).not.toContain('<script>');
      expect(clean).not.toContain('stealCookies');
    });
  });

  describe('sanitizeObject', () => {
    it('recursively cleans string properties in form objects', () => {
      const formData = {
        nombre: 'Maria <script>alert(1)</script>',
        email: 'test@example.com',
        detalles: {
          notas: 'urgente <img src=x onerror=x()>',
          edad: 30
        }
      };
      const cleaned = sanitizeObject(formData);
      expect(cleaned.nombre).toBe('Maria');
      expect(cleaned.email).toBe('test@example.com');
      expect(cleaned.detalles.notas).toBe('urgente');
      expect(cleaned.detalles.edad).toBe(30);
    });
  });

  describe('Validation functions', () => {
    it('validateEmail correctly validates RFC email standards', () => {
      expect(validateEmail('admin@notaria43.com')).toBe(true);
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('test@domain')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });

    it('validateCedula validates 10-digit Ecuadorian ID format', () => {
      expect(validateCedula('1712345678')).toBe(true);
      expect(validateCedula('171234567')).toBe(false); // 9 digits
      expect(validateCedula('abcdefghij')).toBe(false);
    });

    it('validatePhone validates phone number formats', () => {
      expect(validatePhone('+593991234567')).toBe(true);
      expect(validatePhone('0991234567')).toBe(true);
      expect(validatePhone('123')).toBe(false);
    });

    it('validatePassword checks minimum security requirements', () => {
      expect(validatePassword('sec123').valid).toBe(true);
      expect(validatePassword('12345').valid).toBe(false);
    });
  });
});
