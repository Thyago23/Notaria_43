# ============================================
# Dockerfile — Backend Notaría 43
# Plan C: Dockerizado para Railway / Render
# ============================================

FROM node:20-alpine AS base

WORKDIR /app

# Instalar dependencias (incluye devDeps para prisma generate)
COPY package.json package-lock.json* ./
RUN npm install

# Generar Prisma Client
COPY prisma ./prisma
RUN npx prisma generate

# Aplicar migraciones a la base de datos (solo en producción)
RUN npx prisma db push --accept-data-loss

# Copiar código fuente
COPY src ./src

# Exponer puerto
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# Ejecutar
CMD ["node", "src/index.js"]
