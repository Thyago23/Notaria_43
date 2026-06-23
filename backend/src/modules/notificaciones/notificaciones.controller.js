// ============================================
// Notificaciones Module: Controlador
// ============================================

import { getFailedEmails } from './email.queue.js';
import { HTTP_STATUS } from '../../utils/constants.js';

export async function handleGetFailedEmails(req, res, next) {
  try {
    const failedEmails = await getFailedEmails();
    return res.status(HTTP_STATUS.OK).json({ success: true, data: failedEmails });
  } catch (error) {
    next(error);
  }
}
