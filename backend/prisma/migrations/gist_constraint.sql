-- ============================================
-- Migración: Extensión btree_gist y restricción
-- de exclusión para evitar solapamiento de turnos
-- RF-03 / Mitigación de condición de carrera (ERS §6)
-- ============================================

-- Habilitar la extensión btree_gist (requiere PostgreSQL 14+)
CREATE EXTENSION IF NOT EXISTS btree_gist;

-- Agregar restricción de exclusión para evitar 
-- que dos turnos no cancelados se solapen en la misma fecha
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
