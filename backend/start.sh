#!/bin/sh
set -e

# Aplicar migraciones de Prisma (solo si DATABASE_URL está configurada)
if [ -n "$DATABASE_URL" ]; then
  echo "Aplicando migraciones de base de datos..."
  npx prisma db push --accept-data-loss
  echo "Migraciones aplicadas exitosamente."
else
  echo "ADVERTENCIA: DATABASE_URL no está configurada. Saltando migraciones."
fi

# Iniciar el servidor
echo "Iniciando servidor..."
node src/index.js
