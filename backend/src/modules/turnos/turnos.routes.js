// ============================================
// Turnos Module: Rutas
// ============================================

import { Router } from 'express';
import {
  handleGetDisponibilidad,
  handleCreateGuestTurno,
  handleCreateTurno,
  handleGetMisTurnos,
  handleGetAgenda,
  handleMarkAsAttended,
  handleCancelTurno,
  handleGetReport,
} from './turnos.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { roleMiddleware } from '../../middlewares/role.middleware.js';
import { validateRequest } from '../../middlewares/validateRequest.middleware.js';
import {
  createTurnoSchema,
  createGuestTurnoSchema,
  turnoIdParamSchema,
  agendaQuerySchema,
  disponibilidadQuerySchema,
  reporteQuerySchema,
} from './turnos.validation.js';
import { USER_ROLES } from '../../utils/constants.js';

const turnosRouter = Router();

// Reserva de turno como invitado (sin autenticación)
turnosRouter.post(
  '/guest',
  validateRequest({ body: createGuestTurnoSchema }),
  handleCreateGuestTurno
);

// Todas las rutas de turnos requieren autenticación
turnosRouter.use(authMiddleware);

// Disponibilidad (cualquier usuario autenticado)
turnosRouter.get(
  '/disponibilidad',
  validateRequest({ query: disponibilidadQuerySchema }),
  handleGetDisponibilidad
);

// Mis turnos (Ciudadano)
turnosRouter.get(
  '/mis-turnos',
  roleMiddleware(USER_ROLES.CIUDADANO),
  handleGetMisTurnos
);

// Agenda (Administrativo, Notario)
turnosRouter.get(
  '/agenda',
  roleMiddleware(USER_ROLES.ADMINISTRATIVO, USER_ROLES.NOTARIO),
  validateRequest({ query: agendaQuerySchema }),
  handleGetAgenda
);

// Crear turno (Ciudadano)
turnosRouter.post(
  '/',
  roleMiddleware(USER_ROLES.CIUDADANO),
  validateRequest({ body: createTurnoSchema }),
  handleCreateTurno
);

// Marcar turno como atendido (Notario)
turnosRouter.patch(
  '/:id/atender',
  roleMiddleware(USER_ROLES.NOTARIO, USER_ROLES.ADMINISTRATIVO),
  validateRequest({ params: turnoIdParamSchema }),
  handleMarkAsAttended
);

// Cancelar turno (Ciudadano, Administrativo)
turnosRouter.delete(
  '/:id',
  roleMiddleware(USER_ROLES.CIUDADANO, USER_ROLES.ADMINISTRATIVO),
  validateRequest({ params: turnoIdParamSchema }),
  handleCancelTurno
);

export { turnosRouter };
