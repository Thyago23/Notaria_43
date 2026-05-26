// Script temporal para generar hashes bcrypt reales
// Ejecutar: node prisma/generate_hashes.js

import bcrypt from 'bcryptjs';

const passwords = [
  { role: 'Administrativo', cedula: '1710034065', plain: 'Admin12345' },
  { role: 'Notario',        cedula: '1720408838', plain: 'Notario12345' },
  { role: 'Ciudadano',      cedula: '1713175567', plain: 'Ciudadano12345' },
];

for (const entry of passwords) {
  const hash = bcrypt.hashSync(entry.plain, 12);
  console.log(`-- ${entry.role} (${entry.cedula}): ${entry.plain}`);
  console.log(`-- Hash: ${hash}`);
  console.log();
}
