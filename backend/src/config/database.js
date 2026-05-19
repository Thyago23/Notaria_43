// ============================================
// Wrapper de Prisma Client (Agnosticismo de Dep.)
// Punto único de acceso a la base de datos
// ============================================

import { PrismaClient } from '@prisma/client';

let prismaInstance = null;

function createPrismaClient() {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });
}

export function getDatabase() {
  if (!prismaInstance) {
    prismaInstance = createPrismaClient();
  }
  return prismaInstance;
}

export async function disconnectDatabase() {
  if (prismaInstance) {
    await prismaInstance.$disconnect();
    prismaInstance = null;
  }
}
