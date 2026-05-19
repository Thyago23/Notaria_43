// ============================================
// Trámites Module: Controlador
// ============================================

import {
  listActiveTramites,
  getTramiteById,
  createTramite,
  updateTramite,
  deleteTramite,
} from './tramites.service.js';
import { HTTP_STATUS } from '../../utils/constants.js';

export async function handleListTramites(_req, res, next) {
  try {
    const tramites = await listActiveTramites();
    return res.status(HTTP_STATUS.OK).json({ success: true, data: tramites });
  } catch (error) {
    next(error);
  }
}

export async function handleGetTramite(req, res, next) {
  try {
    const tramite = await getTramiteById(req.params.id);
    return res.status(HTTP_STATUS.OK).json({ success: true, data: tramite });
  } catch (error) {
    next(error);
  }
}

export async function handleCreateTramite(req, res, next) {
  try {
    const tramite = await createTramite(req.body);
    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Trámite creado exitosamente',
      data: tramite,
    });
  } catch (error) {
    next(error);
  }
}

export async function handleUpdateTramite(req, res, next) {
  try {
    const tramite = await updateTramite(req.params.id, req.body);
    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Trámite actualizado exitosamente',
      data: tramite,
    });
  } catch (error) {
    next(error);
  }
}

export async function handleDeleteTramite(req, res, next) {
  try {
    await deleteTramite(req.params.id);
    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Trámite eliminado exitosamente',
    });
  } catch (error) {
    next(error);
  }
}
