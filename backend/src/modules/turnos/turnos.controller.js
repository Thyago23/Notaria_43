// ============================================
// Turnos Module: Controlador
// ============================================

import {
  getAvailableSlots,
  createGuestTurno,
  createTurno,
  getUserTurnos,
  getAgenda,
  markTurnoAsAttended,
  cancelTurno,
  getTurnosReport,
  findTurnoById,
  cancelTurnoPublic,
} from './turnos.service.js';
import { HTTP_STATUS } from '../../utils/constants.js';

export async function handleGetDisponibilidad(req, res, next) {
  try {
    const { fecha, tramiteId } = req.query;
    const result = await getAvailableSlots(fecha, tramiteId);
    return res.status(HTTP_STATUS.OK).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function handleCreateGuestTurno(req, res, next) {
  try {
    const turno = await createGuestTurno(req.body);
    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Turno reservado exitosamente',
      data: turno,
    });
  } catch (error) {
    next(error);
  }
}

export async function handleCreateTurno(req, res, next) {
  try {
    const turno = await createTurno(req.user.userId, req.body);
    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Turno reservado exitosamente',
      data: turno,
    });
  } catch (error) {
    next(error);
  }
}

export async function handleGetMisTurnos(req, res, next) {
  try {
    const turnos = await getUserTurnos(req.user.userId);
    return res.status(HTTP_STATUS.OK).json({ success: true, data: turnos });
  } catch (error) {
    next(error);
  }
}

export async function handleGetAgenda(req, res, next) {
  try {
    const agenda = await getAgenda(req.query);
    return res.status(HTTP_STATUS.OK).json({ success: true, data: agenda });
  } catch (error) {
    next(error);
  }
}

export async function handleMarkAsAttended(req, res, next) {
  try {
    const turno = await markTurnoAsAttended(req.params.id, req.user.userId);
    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Turno marcado como atendido',
      data: turno,
    });
  } catch (error) {
    next(error);
  }
}

export async function handleCancelTurno(req, res, next) {
  try {
    const turno = await cancelTurno(req.params.id, req.user.userId, req.user.role);
    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Turno cancelado exitosamente',
      data: turno,
    });
  } catch (error) {
    next(error);
  }
}

export async function handleGetReport(req, res, next) {
  try {
    const report = await getTurnosReport(req.query);
    return res.status(HTTP_STATUS.OK).json({ success: true, data: report });
  } catch (error) {
    next(error);
  }
}

export async function handleFindTurnoById(req, res, next) {
  try {
    const turno = await findTurnoById(req.params.id);
    return res.status(HTTP_STATUS.OK).json({ success: true, data: turno });
  } catch (error) {
    next(error);
  }
}

export async function handleCancelTurnoPublic(req, res, next) {
  try {
    const turno = await cancelTurnoPublic(req.params.id);
    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Turno cancelado exitosamente',
      data: turno,
    });
  } catch (error) {
    next(error);
  }
}
