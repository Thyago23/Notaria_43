content = """# Especificación del Proyecto: Sistema de Gestión Notarial

Este documento sirve como guía maestra para el IDE Google Antigravity para la generación automática de la arquitectura, componentes y lógica del sistema de la Notaría.

## 1. Arquitectura General
- **Frontend:** React (Vite) + TypeScript + Tailwind CSS.
- **Backend/BaaS:** Supabase (PostgreSQL, Auth, Storage).
- **Comunicación:** Axios para integración con Supabase Edge Functions o APIs externas.
- **Estado:** React Context API o Hooks personalizados para gestión de sesiones y citas.

## 2. Estructura de Directorios (Mapeo)
Resultado de código
plan_desarrollo_notaria.md

```text
/
├── src/
│   ├── api/              # Configuración de Axios y servicios de Supabase
│   ├── assets/           # Imágenes y estilos globales
│   ├── components/       # Componentes reutilizables (UI, Layout, Forms)
│   │   ├── common/       # Botones, Inputs, Modales
│   │   ├── layout/       # Navbar, Footer, Sidebar (Admin)
│   │   └── booking/      # Stepper de citas, Calendario
│   ├── hooks/            # Hooks personalizados (useAuth, useAppointments)
│   ├── pages/            # Vistas principales
│   │   ├── Home.tsx      # Landing page y catálogo de trámites
│   │   ├── Booking.tsx   # Proceso de reserva de citas
│   │   ├── Login.tsx     # Acceso para personal
│   │   └── Dashboard/    # Panel administrativo (Citas, Filtros)
│   ├── types/            # Interfaces de TypeScript (Cita, Usuario, Tramite)
│   ├── utils/            # Lógica de generación de PDF y formateo de fechas
│   └── App.tsx           # Enrutador principal (React Router Dom)
├── supabase/             # Migraciones y esquemas SQL
├── .env                  # Variables de entorno (URL y Anon Key)
├── Dockerfile            # Configuración para despliegue en Dokploy
└── tailwind.config.js    # Personalización de diseño responsive
3. Modelo de Datos (Supabase/PostgreSQL)
Tabla: tramites
id: uuid (PK)

nombre: text (ej: Escrituras, Poderes)

requisitos: jsonb (lista de documentos necesarios)

descripcion: text

Tabla: citas
id: uuid (PK)

cliente_nombre: text

cliente_email: text

tramite_id: uuid (FK -> tramites)

fecha_hora: timestamp

estado: text (pendiente, completada, cancelada)

pdf_url: text (opcional, para almacenamiento en bucket)

Tabla: perfiles_empleados (Extensión de Auth)
id: uuid (FK -> auth.users)

rol: text (admin, secretario)

4. Lógica de Funcionalidades Clave
A. Proceso de Reserva (Lado Cliente)
Selección de Trámite: El usuario visualiza la tarjeta del trámite y sus requisitos.

Formulario de Datos: Captura de información personal.

Selección de Fecha: Integración con calendario filtrando horarios disponibles.

Confirmación y PDF: Al guardar en Supabase, se dispara una función en utils/pdfGenerator.ts usando jsPDF para descargar el comprobante.

B. Panel Administrativo (Lado Empleado)
Autenticación: Protegida mediante Supabase Auth.

Visualización Mensual: Consulta filtrada por mes actual.

Filtros Avanzados: Búsqueda por nombre de cliente, tipo de trámite o rango de fechas (implementado vía queries de Axios a Supabase).

5. Integración y Extensibilidad
Modularidad: El cliente de Axios se centraliza en src/api/client.ts para que, en una fase posterior, se pueda cambiar el baseURL y apuntar al backend del compañero sin afectar la UI.

Responsive: Uso intensivo de utilidades de Tailwind (sm:, md:, lg:) para asegurar operatividad en dispositivos móviles.

6. Despliegue (Dokploy VPS)
Dockerfile: Configuración de multi-etapa (build con Node, serve con Nginx).

Environment: Se deben configurar VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en el panel de Dokploy.

7. Control de Versiones
Repositorio: GitHub.

Rama Principal: main.

Estrategia: Pull Requests para integración de componentes de backend externo.
"""

file_name = "plan_desarrollo_notaria.md"
with open(file_name, "w", encoding="utf-8") as f:
f.write(content)

print(file_name)