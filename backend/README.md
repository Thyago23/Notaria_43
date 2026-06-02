# 🏛️ Backend Notaría 43 — Sistema de Gestión de Turnos

API RESTful para el Sistema de Gestión de Turnos de la Notaría 43, construido con Node.js, Express y PostgreSQL.

## 🚀 Quick Start

### Requisitos previos
- Docker y Docker Compose

### Levantar todo con Docker

```bash
# 1. Levantar PostgreSQL + Backend (init.sql crea tablas automáticamente)
docker-compose down -v
docker-compose up -d --build

# 2. Ejecutar seed de datos de prueba (hashes bcrypt reales)
docker exec notaria43-backend node prisma/seed.js
```

> **Nota:** El seed también se ejecuta automáticamente al arrancar si la BD está vacía.

### Sin Docker (desarrollo local)

Requiere Node.js 20+ y PostgreSQL 14+ corriendo localmente.

```bash
# 1. Instalar dependencias
npm install

# 2. Generar Prisma Client
npm run db:generate

# 3. Crear tablas (apunta al PostgreSQL local vía .env)
npm run db:push

# 4. Aplicar restricción GIST anti condición de carrera
psql -U notaria43 -d notaria43 -f prisma/init.sql

# 5. Iniciar servidor (seed automático si BD vacía)
npm run dev
```

## 📡 Endpoints

| Módulo | Ruta Base | Acceso |
|---|---|---|
| Auth | `/api/auth` | Público |
| Users | `/api/users` | Autenticado |
| Trámites | `/api/tramites` | Público (lectura) / Administrativo (CRUD) |
| Turnos | `/api/turnos` | Por rol |
| Reportes | `/api/reportes` | Administrativo |
| Health | `/api/health` | Público |

### Auth (`/api/auth`)
| Método | Ruta | Descripción |
|---|---|---|
| POST | `/register` | Registro con validación de cédula |
| POST | `/login` | Login → JWT |

### Turnos (`/api/turnos`)
| Método | Ruta | Descripción | Acceso |
|---|---|---|---|
| GET | `/disponibilidad` | Consultar slots disponibles | Autenticado |
| POST | `/` | Reservar turno | Ciudadano |
| GET | `/mis-turnos` | Turnos del ciudadano | Ciudadano |
| GET | `/agenda` | Agenda diaria/semanal | Administrativo, Notario |
| PATCH | `/:id/atender` | Marcar turno atendido | Notario |
| DELETE | `/:id` | Cancelar turno | Ciudadano, Administrativo |

### Trámites (`/api/tramites`)
| Método | Ruta | Descripción | Acceso |
|---|---|---|---|
| GET | `/` | Listar trámites | Público |
| POST | `/` | Crear trámite | Administrativo |
| PUT | `/:id` | Editar trámite | Administrativo |
| DELETE | `/:id` | Eliminar trámite | Administrativo |

### Reportes (`/api/reportes`)
| Método | Ruta | Descripción | Acceso |
|---|---|---|---|
| GET | `/turnos` | Reporte de turnos con resumen | Administrativo |

## 🔑 Credenciales de Prueba (después del seed)

| Rol | Cédula | Contraseña |
|---|---|---|
| Administrativo | 1710034065 | Admin12345 |
| Notario | 1720408838 | Notario12345 |
| Ciudadano | 1713175567 | Ciudadano12345 |

## 🏗️ Arquitectura

```
src/
├── config/          # Variables de entorno, CORS, BD, seed
├── wrappers/        # Wrappers de dependencias (JWT, email, etc.)
├── middlewares/     # Auth, roles, validación, errores
├── modules/         # Módulos de negocio
│   ├── auth/        # Registro (con validación cédula) y Login
│   ├── users/       # Gestión de perfiles y personal
│   ├── tramites/    # Catálogo de trámites notariales
│   ├── turnos/      # Reservas con protección GIST
│   ├── notificaciones/  # Cola de emails SMTP con reintentos
│   └── reportes/    # Reportes estadísticos
└── utils/           # Validador cédula, errores, constantes
```

## 🗄️ Base de Datos

### Tablas
- **users** — Ciudadanos, Administrativos, Notarios (con cédula única)
- **tramites** — Catálogo de trámites notariales
- **turnos** — Reservas con restricción GIST anti-overlap
- **email_queue** — Cola de emails con reintentos

### Restricción GIST (RF-03)
Protección a nivel de BD contra condiciones de carrera:
```sql
EXCLUDE USING GIST (
  fecha WITH =,
  tsrange(hora_inicio, hora_fin) WITH &&
) WHERE (status != 'CANCELADO');
```

## 📋 Requisitos Funcionales Implementados

- **RF-01**: Validación algorítmica de cédula ecuatoriana (módulo 10)
- **RF-02**: JWT para sesiones seguras
- **RF-03**: Transacciones atómicas + restricción GIST para turnos
- **RF-04**: Notificaciones SMTP con cola de reintentos (backoff exponencial)
