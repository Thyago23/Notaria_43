// ============================================
// Trámites Module: Servicio (Lógica de Negocio)
// ============================================

import { getDatabase } from '../../config/database.js';
import { AppError } from '../../utils/appError.js';
import { HTTP_STATUS, TURNO_STATUS } from '../../utils/constants.js';

export async function listActiveTramites() {
  const database = getDatabase();

  return database.tramite.findMany({
    where: { isActive: true },
    orderBy: { nombre: 'asc' },
  });
}

export async function getTramiteById(tramiteId) {
  const database = getDatabase();

  const tramite = await database.tramite.findUnique({
    where: { id: tramiteId },
  });

  if (!tramite) {
    throw new AppError('Trámite no encontrado', HTTP_STATUS.NOT_FOUND);
  }

  return tramite;
}

export async function createTramite(tramiteData) {
  const database = getDatabase();

  const existing = await database.tramite.findUnique({
    where: { nombre: tramiteData.nombre },
  });

  if (existing) {
    throw new AppError(
      'Ya existe un trámite con este nombre',
      HTTP_STATUS.CONFLICT
    );
  }

  return database.tramite.create({ data: tramiteData });
}

export async function updateTramite(tramiteId, updateData) {
  const database = getDatabase();

  const tramite = await database.tramite.findUnique({
    where: { id: tramiteId },
  });

  if (!tramite) {
    throw new AppError('Trámite no encontrado', HTTP_STATUS.NOT_FOUND);
  }

  if (updateData.nombre && updateData.nombre !== tramite.nombre) {
    const existingName = await database.tramite.findUnique({
      where: { nombre: updateData.nombre },
    });
    if (existingName) {
      throw new AppError('Ya existe un trámite con este nombre', HTTP_STATUS.CONFLICT);
    }
  }

  return database.tramite.update({
    where: { id: tramiteId },
    data: updateData,
  });
}

export async function deleteTramite(tramiteId) {
  const database = getDatabase();

  const tramite = await database.tramite.findUnique({
    where: { id: tramiteId },
    include: { turnos: { where: { status: TURNO_STATUS.PENDIENTE }, take: 1 } },
  });

  if (!tramite) {
    throw new AppError('Trámite no encontrado', HTTP_STATUS.NOT_FOUND);
  }

  // No eliminar si tiene turnos pendientes — desactivar en su lugar
  if (tramite.turnos.length > 0) {
    return database.tramite.update({
      where: { id: tramiteId },
      data: { isActive: false },
    });
  }

  return database.tramite.delete({ where: { id: tramiteId } });
}
