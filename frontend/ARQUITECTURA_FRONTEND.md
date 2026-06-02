# 📐 Arquitectura y Organización del Frontend - Notaría 43

## Estructura Recomendada

```
src/
├── api/
│   ├── client.ts              # Instancias axios + Supabase
│   ├── auth.api.ts            # Endpoints de autenticación
│   ├── tramites.api.ts        # Endpoints de trámites
│   ├── turnos.api.ts          # Endpoints de turnos
│   ├── users.api.ts           # Endpoints de usuarios
│   └── notifications.api.ts   # Endpoints de notificaciones
├── pages/                     # Páginas principales (routing)
├── components/
│   ├── layout/                # Navbar, Footer, Sidebar
│   ├── auth/                  # Login, Register
│   ├── common/                # Componentes reutilizables
│   ├── tramites/              # Componentes de trámites
│   ├── turnos/                # Componentes de turnos
│   └── forms/                 # Formularios compartidos
├── hooks/                     # Hooks personalizados (useAuth, useTramites, etc.)
├── context/                   # Context API para estado global
│   ├── AuthContext.tsx        # Contexto de autenticación
│   └── AppContext.tsx         # Contexto general
├── utils/
│   ├── pdfGenerator.ts        # Generador de PDFs
│   ├── validators.ts          # Validaciones (email, cedula, etc.)
│   ├── constants.ts           # Constantes globales
│   └── formatters.ts          # Formateadores (fechas, moneda, etc.)
├── types/                     # Tipos TypeScript compartidos
│   ├── auth.ts
│   ├── tramites.ts
│   ├── turnos.ts
│   └── api.ts
├── assets/                    # Imágenes, iconos
├── styles/                    # Estilos globales
├── App.tsx                    # Componente raíz
└── main.tsx                   # Punto de entrada
```

## Cambios Recomendados

### 1. **Crear Estructura de APIs Modular**
Separar por módulos en lugar de un único `client.ts`:
- `api/auth.api.ts` - Login, Register, Token refresh
- `api/tramites.api.ts` - CRUD de trámites
- `api/turnos.api.ts` - Gestión de turnos
- `api/users.api.ts` - Perfil de usuario

### 2. **Agregar Context API**
Para manejar estado global sin Redux:
- `context/AuthContext.tsx` - Usuario autenticado
- `context/AppContext.tsx` - Notificaciones, UI globals

### 3. **Crear Hooks Personalizados**
- `useAuth()` - Autenticación
- `useTramites()` - Trámites
- `useTurnos()` - Turnos
- `useFetch()` - Requests generales

### 4. **Tipos TypeScript Reutilizables**
Crear `types/` con interfaces para:
- Usuario, Trámite, Turno, Respuesta API, Error

### 5. **Componentes por Módulo**
Organizar componentes por feature:
- `components/auth/` - Login, Register
- `components/tramites/` - Lista, Detalle, Formulario
- `components/turnos/` - Calendario, Booking

## Integración con Backend

### URLs del Backend (Docker)
```
API Base: http://localhost:3000/api
Base de Datos: postgresql://notaria43:notaria43pass@db:5432/notaria43
JWT Secret: dev-secret-notaria43-cambiar-en-produccion-2024
```

### Endpoints Disponibles
```
POST   /api/auth/login        - Autenticación
POST   /api/auth/register     - Registro
GET    /api/users/:id         - Obtener usuario
GET    /api/tramites          - Listar trámites
GET    /api/tramites/:id      - Detalle trámite
GET    /api/turnos            - Listar turnos disponibles
POST   /api/turnos            - Reservar turno
```

## Configuración del Entorno

### Variables de Entorno (.env)
```
# Backend API
VITE_API_URL=http://localhost:3000/api

# Supabase (Opcional para auth)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Rama de Desarrollo

**Rama Actual:** `feature/integration-backend`

Esta rama es segura para experimentar. Cuando todo esté listo, hacer un PR hacia `main`:

```bash
git checkout feature/integration-backend
# ... hacer cambios ...
git add .
git commit -m "Feat: Integración con backend"
git push origin feature/integration-backend
```

Luego hacer PR en GitHub.

## Próximos Pasos

1. ✅ Actualizar `.env` con URL del backend
2. ⏳ Crear carpeta `api/` con endpoints separados
3. ⏳ Implementar Context para autenticación
4. ⏳ Crear hooks personalizados
5. ⏳ Actualizar componentes para usar real API
6. ⏳ Manejo de errores y loading states

## Docker Compose (Fronted + Backend)

Ver [docker-compose.yml](../Backend/docker-compose.yml) para levantar:
```bash
cd Backend/
docker-compose up
```

El frontend está disponible en: **http://localhost:5173**
El backend en: **http://localhost:3000**
