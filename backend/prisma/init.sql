-- ============================================
-- SCRIPT DE INICIALIZACIÓN — ESTRUCTURA
-- Backend Notaría 43 — Sistema de Gestión de Turnos
-- 
-- Este script crea:
--   1. Extensión btree_gist
--   2. Tipos ENUM (roles, estados de turno, estados de email)
--   3. Tablas: users, tramites, turnos, email_queue
--   4. Índices de rendimiento
--   5. Restricción GIST anti-overlap (RF-03)
--   6. Trigger auto-update updated_at
--
-- Los datos iniciales se insertan desde el backend
-- con Node.js para garantizar hashes bcrypt reales.
-- ============================================

-- ============================================
-- 1. EXTENSIÓN REQUERIDA
-- ============================================
CREATE EXTENSION IF NOT EXISTS btree_gist;

-- ============================================
-- 2. TIPOS ENUM
-- ============================================

-- Roles del sistema (ERS §3)
DO $$ BEGIN
  CREATE TYPE "UserRole" AS ENUM ('CIUDADANO', 'ADMINISTRATIVO', 'NOTARIO');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Estados de turno
DO $$ BEGIN
  CREATE TYPE "TurnoStatus" AS ENUM ('PENDIENTE', 'ATENDIDO', 'CANCELADO');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Estados de cola de email
DO $$ BEGIN
  CREATE TYPE "EmailStatus" AS ENUM ('PENDING', 'SENT', 'FAILED');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- ============================================
-- 3. TABLAS
-- ============================================

-- -------------------------------------------
-- Tabla: users
-- Almacena ciudadanos, administrativos y notarios.
-- La cédula se valida algorítmicamente en el backend (RF-01).
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cedula      VARCHAR(10)  NOT NULL UNIQUE,
  nombres     VARCHAR(100) NOT NULL,
  apellidos   VARCHAR(100) NOT NULL,
  email       VARCHAR(255) NOT NULL UNIQUE,
  password    VARCHAR(255) NOT NULL,
  role        "UserRole"   NOT NULL DEFAULT 'CIUDADANO',
  is_active   BOOLEAN      NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- -------------------------------------------
-- Tabla: tramites
-- Catálogo de trámites notariales gestionado
-- por el rol Administrativo.
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS tramites (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre            VARCHAR(200) NOT NULL UNIQUE,
  descripcion       TEXT         NOT NULL,
  duracion_minutos  INTEGER      NOT NULL CHECK (duracion_minutos >= 15 AND duracion_minutos <= 180),
  requisitos        TEXT[]       NOT NULL DEFAULT '{}',
  is_active         BOOLEAN      NOT NULL DEFAULT TRUE,
  created_at        TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- -------------------------------------------
-- Tabla: turnos
-- Reservas de citas con protección contra
-- condiciones de carrera vía restricción GIST.
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS turnos (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fecha       DATE         NOT NULL,
  hora_inicio TIME         NOT NULL,
  hora_fin    TIME         NOT NULL,
  status      "TurnoStatus" NOT NULL DEFAULT 'PENDIENTE',
  notas       TEXT,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),

  -- Relaciones
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  tramite_id  UUID NOT NULL REFERENCES tramites(id) ON DELETE RESTRICT,

  -- Validación: hora_fin siempre después de hora_inicio
  CONSTRAINT check_horario_valido CHECK (hora_fin > hora_inicio)
);

-- -------------------------------------------
-- Tabla: email_queue
-- Cola de correos con reintentos y backoff
-- exponencial (RF-04, mitigación ERS §6).
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS email_queue (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "to"         VARCHAR(255) NOT NULL,
  subject      VARCHAR(500) NOT NULL,
  html_content TEXT         NOT NULL,
  status       "EmailStatus" NOT NULL DEFAULT 'PENDING',
  retries      INTEGER      NOT NULL DEFAULT 0,
  last_error   TEXT,
  created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ============================================
-- 4. ÍNDICES DE RENDIMIENTO
-- ============================================

-- Búsqueda rápida de turnos por fecha y estado
CREATE INDEX IF NOT EXISTS idx_turnos_fecha_status 
  ON turnos (fecha, status);

-- Búsqueda de turnos por usuario
CREATE INDEX IF NOT EXISTS idx_turnos_user_id 
  ON turnos (user_id);

-- Búsqueda de turnos por trámite
CREATE INDEX IF NOT EXISTS idx_turnos_tramite_id 
  ON turnos (tramite_id);

-- Búsqueda de usuarios por rol
CREATE INDEX IF NOT EXISTS idx_users_role 
  ON users (role);

-- Emails pendientes para procesar
CREATE INDEX IF NOT EXISTS idx_email_queue_status 
  ON email_queue (status) 
  WHERE status = 'PENDING';

-- ============================================
-- 5. RESTRICCIÓN GIST — ANTI CONDICIÓN DE CARRERA
-- (RF-03, Mitigación principal ERS §6)
--
-- Garantiza a nivel de base de datos que NO puedan
-- existir dos turnos no-cancelados que se solapen
-- en la misma fecha.
-- ============================================
ALTER TABLE turnos DROP CONSTRAINT IF EXISTS no_overlap_turnos;

ALTER TABLE turnos
ADD CONSTRAINT no_overlap_turnos
EXCLUDE USING GIST (
  fecha WITH =,
  tsrange(
    ('1970-01-01'::date + hora_inicio),
    ('1970-01-01'::date + hora_fin)
  ) WITH &&
)
WHERE (status != 'CANCELADO');

-- ============================================
-- 6. FUNCIÓN TRIGGER: auto-update updated_at
-- ============================================
CREATE OR REPLACE FUNCTION trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger a todas las tablas
DO $$ 
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN SELECT unnest(ARRAY['users', 'tramites', 'turnos', 'email_queue'])
  LOOP
    EXECUTE format(
      'DROP TRIGGER IF EXISTS set_updated_at ON %I; 
       CREATE TRIGGER set_updated_at 
       BEFORE UPDATE ON %I 
       FOR EACH ROW 
       EXECUTE FUNCTION trigger_set_updated_at();',
      tbl, tbl
    );
  END LOOP;
END $$;

-- ============================================
-- VERIFICACIÓN
-- ============================================
DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '==========================================';
  RAISE NOTICE '  ✅ ESTRUCTURA DE BD CREADA';
  RAISE NOTICE '==========================================';
  RAISE NOTICE '  Tablas: users, tramites, turnos, email_queue';
  RAISE NOTICE '  Extensión: btree_gist';
  RAISE NOTICE '  Restricción GIST: no_overlap_turnos';
  RAISE NOTICE '  Triggers: set_updated_at (en todas las tablas)';
  RAISE NOTICE '==========================================';
  RAISE NOTICE '';
  RAISE NOTICE '  Ejecute el seed desde el backend:';
  RAISE NOTICE '  docker exec notaria43-backend node prisma/seed.js';
  RAISE NOTICE '==========================================';
END $$;
