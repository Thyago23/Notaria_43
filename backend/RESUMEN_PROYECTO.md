# Resumen del proyecto — Backend Notaría 43

## 1. Qué es el proyecto

Este repositorio contiene el backend del "Sistema de Gestión de Turnos" para la Notaría 43.
Está desarrollado con:
- Node.js y Express
- Prisma como ORM
- PostgreSQL como base de datos
- JWT para autenticación
- Validación de datos con Zod
- Envío de notificaciones por correo con Nodemailer


## 2. Estado actual del desarrollo

### Funcionalidades implementadas

- Autenticación:
  - Registro de usuarios con validación de cédula ecuatoriana
  - Login con generación de JWT

- Gestión de usuarios:
  - Rutas y controladores para manejar perfiles y roles

- Gestión de trámites:
  - Listado público de trámites
  - Detalle público de trámite
  - CRUD de trámites, protegido para el rol Administrativo

- Gestión de turnos:
  - Consulta de disponibilidad de turnos para usuarios autenticados
  - Reserva de turno para ciudadanos
  - Consulta de los turnos propios de un ciudadano
  - Agenda de turnos para administrativos y notarios
  - Marcar turno atendido por notario
  - Cancelar turno por ciudadano o administrativo

- Reportes:
  - Reporte de turnos disponible para el rol Administrativo

- Health check:
  - Endpoint `/api/health` para verificar que el backend está en línea


## 3. Arquitectura y organización del código

### Estructura principal

- `src/index.js`: punto de entrada del servidor Express
- `src/config/`: configuración de entorno, CORS, base de datos y seed
- `src/middlewares/`: autenticación, roles, validación de request y manejo de errores
- `src/modules/`: módulos de negocio organizados por dominio
  - `auth/`
  - `users/`
  - `tramites/`
  - `turnos/`
  - `notificaciones/`
  - `reportes/`
- `src/wrappers/`: wrappers para JWT, email, hash, validación
- `src/utils/`: utilidades generales como validación de cédula y constantes


## 4. Dependencias principales

- `express`
- `cors`
- `dotenv`
- `jsonwebtoken`
- `bcryptjs`
- `@prisma/client`
- `prisma`
- `zod`
- `nodemailer`


## 5. Endpoints principales disponibles

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Trámites
- `GET /api/tramites`
- `GET /api/tramites/:id`
- `POST /api/tramites` (Administrativo)
- `PUT /api/tramites/:id` (Administrativo)
- `DELETE /api/tramites/:id` (Administrativo)

### Turnos
- `GET /api/turnos/disponibilidad` (autenticado)
- `POST /api/turnos` (Ciudadano)
- `GET /api/turnos/mis-turnos` (Ciudadano)
- `GET /api/turnos/agenda` (Administrativo, Notario)
- `PATCH /api/turnos/:id/atender` (Notario)
- `DELETE /api/turnos/:id` (Ciudadano, Administrativo)

### Reportes
- `GET /api/reportes/turnos` (Administrativo)

### Health
- `GET /api/health`


## 6. Base de datos y semilla

- Prisma es usado como ORM y cliente de base de datos.
- Se incluye seeding de datos para pruebas.
- Hay una restricción GIST en la base de datos para evitar solapamiento de turnos con estado distinto de `CANCELADO`.


## 7. Qué se puede decir en una presentación breve

> "Actualmente tenemos el backend del sistema de gestión de turnos de la Notaría 43 completamente estructurado y en funcionamiento. El proyecto ya incluye autenticación con JWT, gestión de trámites, reservas de turnos con control de roles, reporte de turnos y una validación especializada de cédulas ecuatorianas. También se ha preparado la base de datos con Prisma y se dispone de un mecanismo de seed para levantar datos de prueba."


## 8. Próximos pasos sugeridos

- Completar la documentación de endpoints y ejemplos de uso
- Revisar y documentar los roles existentes (Ciudadano, Administrativo, Notario)
- Añadir tests automatizados
- Implementar mejoras en notificaciones y manejo de errores
- Integrar con frontend o con cliente de pruebas API
