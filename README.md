# Notaría 43 - Sistema de Gestión de Turnos

Monorepo que contiene el backend (Express.js) y frontend (React + Vite) para el sistema de gestión de turnos de la Notaría 43.

## 📁 Estructura del Proyecto

```
notaria-43/
├── backend/              # API Express.js
│   ├── src/
│   ├── prisma/
│   ├── package.json
│   └── Dockerfile
├── frontend/             # React + Vite
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml    # Orquestación de servicios
├── .env                  # Variables de entorno
└── README.md
```

## 🚀 Inicio Rápido

### Requisitos Previos
- Docker & Docker Compose
- Node.js 18+ (para desarrollo local sin Docker)
- PostgreSQL 16 (si ejecutas sin Docker)

### Con Docker (Recomendado)

1. **Clonar y configurar**
   ```bash
   cd notaria-43
   cp .env.example .env
   # Editar .env con tus valores
   ```

2. **Iniciar servicios**
   ```bash
   docker-compose up -d
   ```

3. **Verificar servicios**
   - Backend: http://localhost:3000
   - Frontend: http://localhost:5173
   - Base de datos: localhost:5432

4. **Ejecutar migraciones (primera vez)**
   ```bash
   docker-compose exec backend npm run db:migrate
   docker-compose exec backend npm run db:seed
   ```

### Sin Docker (Desarrollo Local)

#### Backend
```bash
cd backend
npm install
npm run db:generate
npm run db:migrate
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🛠️ Comandos Útiles

### Backend
```bash
# En desarrollo
npm run dev

# En producción
npm start

# Migraciones
npm run db:migrate
npm run db:push
npm run db:seed
npm run db:generate
```

### Frontend
```bash
# Desarrollo
npm run dev

# Build
npm run build

# Preview
npm run preview
```

### Docker Compose
```bash
# Iniciar servicios
docker-compose up -d

# Ver logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Detener servicios
docker-compose down

# Limpiar volúmenes
docker-compose down -v
```

## 📋 Variables de Entorno

### Backend (.env)
- `NODE_ENV`: development | production
- `DATABASE_URL`: Conexión PostgreSQL
- `JWT_SECRET`: Clave secreta para JWT
- `CORS_ORIGIN`: URL del frontend
- `EMAIL_USER`, `EMAIL_PASSWORD`: Credenciales SMTP
- `EMAIL_HOST`, `EMAIL_PORT`: Servidor SMTP

### Frontend (.env)
- `VITE_API_URL`: URL del backend
- `VITE_SUPABASE_URL`: URL Supabase
- `VITE_SUPABASE_KEY`: API key Supabase

## 🔗 Integración Frontend-Backend

El frontend realiza solicitudes HTTP al backend en:
```
http://localhost:3000  (desarrollo)
```

Endpoints principales del backend:
- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/turnos`
- `POST /api/turnos`
- `GET /api/users`
- `POST /api/notificaciones`

## 📚 Documentación

- [Historias de Usuario](./backend/HISTORIAS_DE_USUARIO.md)
- [Resumen del Proyecto](./backend/RESUMEN_PROYECTO.md)
- [Arquitectura Frontend](./frontend/ARQUITECTURA_FRONTEND.md)

## 🔐 Seguridad

- JWT para autenticación
- CORS configurado
- Bcrypt para contraseñas
- Variables de entorno sensibles no versionadas

## 📧 Contacto

Para soporte o consultas sobre el proyecto, contactar al equipo de desarrollo.

## 📝 Licencia

Todos los derechos reservados - Notaría 43
