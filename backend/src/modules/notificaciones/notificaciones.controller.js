// ============================================
// Notificaciones Module: Controlador
// ============================================

import { getFailedEmails } from './email.queue.js';
import { HTTP_STATUS } from '../../utils/constants.js';

export async function handleGetFailedEmails(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await getFailedEmails(page, limit);
    return res.status(HTTP_STATUS.OK).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
}
