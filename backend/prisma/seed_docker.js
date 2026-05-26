// ============================================
// Script de Seed con hashes reales de bcrypt
// Se ejecuta DESPUÉS de init.sql
// Uso: docker exec notaria43-backend node prisma/seed_docker.js
// ============================================

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Actualizando contraseñas con hashes reales...\n');

  const credentials = [
    { cedula: '1710034065', password: 'Admin12345', role: 'Administrativo' },
    { cedula: '1720408838', password: 'Notario12345', role: 'Notario' },
    { cedula: '1713175567', password: 'Ciudadano12345', role: 'Ciudadano' },
  ];

  for (const cred of credentials) {
    const hash = await bcrypt.hash(cred.password, 12);
    await prisma.user.update({
      where: { cedula: cred.cedula },
      data: { password: hash },
    });
    console.log(`✅ ${cred.role} (${cred.cedula}): contraseña actualizada`);
  }

  console.log('\n🎉 Seed completado!\n');
  console.log('=== Credenciales de Prueba ===');
  console.log('Administrativo: cédula=1710034065, contraseña=Admin12345');
  console.log('Notario:        cédula=1720408838, contraseña=Notario12345');
  console.log('Ciudadano:      cédula=1713175567, contraseña=Ciudadano12345');
}

main()
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
