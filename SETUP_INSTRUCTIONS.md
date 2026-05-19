# Instrucciones para levantar Notaría 43 en otra máquina

Estas son las instrucciones para que tu compañero pueda ejecutar el proyecto en su máquina lo más fácil posible.

## 1. Requisitos previos

Asegúrate de tener instalados:

- Node.js 18 o superior
- npm 10 o superior
- Docker y Docker Compose (opcional, pero recomendado para la base de datos)
- Git

## 2. Estado del repositorio

En esta rama local (`feature/tramites-data`) se ha configurado el proyecto con los cambios de frontend/backend.

> Importante: en el commit actual no se incluyen archivos Markdown (`*.md`). Esto significa que los archivos `.md` existentes en el workspace son locales y no forman parte del commit.

## 3. Preparar el entorno

1. Clona el repositorio si aún no lo tienes:

```bash
git clone https://github.com/Thyago23/Notaria_43.git
cd Notaria_43
```

2. Asegúrate de estar en la rama correcta:

```bash
git checkout feature/tramites-data
```

3. Revisa que no haya un repositorio Git anidado dentro de `frontend`. Si hay un `.git` dentro de `frontend`, elimínalo con:

```bash
rm -rf frontend/.git
```

## 4. Configurar variables de entorno

Copia el archivo de ejemplo principal a `.env`:

```bash
cp .env.example .env
```

Este proyecto usa este archivo `.env` para la configuración del backend y también para variables de entorno del frontend.

### Variables principales a revisar

- `DATABASE_URL`: URL de conexión a PostgreSQL
- `JWT_SECRET`: clave secreta para los tokens JWT
- `PORT`: puerto del backend (normalmente `3000`)
- `CORS_ORIGIN`: dirección desde la que se permite acceder al backend (normalmente `http://localhost:5173`)
- `VITE_API_URL`: URL base de la API para el frontend (normalmente `http://localhost:3000`)
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`: configuración de correo
- `VITE_SUPABASE_URL` y `VITE_SUPABASE_KEY`: valores para supabase si se usan partes del frontend que los requieran

Si no tienes servicio de correo, puedes dejar valores ficticios en las variables de correo mientras pruebas el frontend y el backend.

## 5. Instalar dependencias

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd ../frontend
npm install
```

## 6. Levantar el proyecto

### Opción 1: ejecutar localmente sin Docker

#### Backend

```bash
cd backend
npm run dev
```

Esto arrancará el servidor Express en `http://localhost:3000`.

#### Frontend

```bash
cd ../frontend
npm run dev
```

Esto arrancará Vite en `http://localhost:5173`.

### Opción 2: ejecutar con Docker Compose

En la raíz del proyecto:

```bash
docker compose up --build
```

Esto levantará:

- PostgreSQL
- Backend
- Frontend

> Nota: la configuración de Docker Compose depende de variables de entorno y de los archivos `Dockerfile` dentro de `backend` y `frontend`.

## 7. Base de datos y seed

El backend tiene un proceso de seed automático que se ejecuta cuando la base de datos está vacía.

Este seed crea:

- Usuarios de prueba
- Catálogo inicial de trámites

Si la base de datos ya contiene datos, el seed no sobrescribe los registros existentes.

## 8. Probar la aplicación

1. Abrir el navegador en `http://localhost:5173`
2. Navegar a la página de trámites
3. Verificar que se carguen los trámites y que el detalle funcione
4. Reservar un turno desde el formulario si lo deseas

## 9. Notas sobre el commit actual

- El commit actual en la rama `feature/tramites-data` excluye los archivos Markdown (`*.md`).
- Si tu compañero quiere ver esta instrucción, tendrá que copiarla localmente o recibirla fuera del commit, porque el repositorio fue preparado para omitir Markdown en el historial.

## 10. Consejos finales

- Si hay errores con la base de datos, revisa que PostgreSQL esté corriendo y que `DATABASE_URL` sea correcta.
- Si hay problemas de CORS, comprueba `CORS_ORIGIN` y `VITE_API_URL`.
- Si el frontend no encuentra la API, asegúrate de que el backend esté disponible en `http://localhost:3000`.

Con estos pasos debería poder levantarse el proyecto de forma ordenada y con calma.
