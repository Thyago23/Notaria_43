// ============================================
// Turnos Module: Servicio (Lógica de Negocio)
// RF-03: Transacciones atómicas con GIST
// ============================================

import { getDatabase } from '../../config/database.js';
import { AppError } from '../../utils/appError.js';
import { HTTP_STATUS, TURNO_STATUS, SCHEDULE } from '../../utils/constants.js';
import { enqueueConfirmationEmail, enqueueAdminNotificationEmail } from '../notificaciones/notificaciones.service.js';

/**
 * Calcula la hora de fin sumando minutos a una hora de inicio.
 * @param {string} horaInicio - Formato "HH:MM"
 * @param {number} duracionMinutos
 * @returns {string} Formato "HH:MM"
 */
function calculateEndTime(horaInicio, duracionMinutos) {
  const [hours, minutes] = horaInicio.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes + duracionMinutos;
  const endHours = Math.floor(totalMinutes / 60);
  const endMinutes = totalMinutes % 60;
  return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
}

/**
 * Genera todos los slots disponibles para una fecha y duración de trámite.
 * Respeta el horario de la notaría y el almuerzo.
 */
function generateAllSlots(duracionMinutos) {
  const slots = [];
  let currentMinutes = SCHEDULE.START_HOUR * 60;
  const endMinutes = SCHEDULE.END_HOUR * 60;
  const lunchStartMinutes = SCHEDULE.LUNCH_START * 60;
  const lunchEndMinutes = SCHEDULE.LUNCH_END * 60;

  while (currentMinutes + duracionMinutos <= endMinutes) {
    const slotEnd = currentMinutes + duracionMinutos;

    // Verificar que el slot no caiga durante el almuerzo
    const overlapsLunch =
      (currentMinutes < lunchEndMinutes && slotEnd > lunchStartMinutes);

    if (!overlapsLunch) {
      const startHour = String(Math.floor(currentMinutes / 60)).padStart(2, '0');
      const startMin = String(currentMinutes % 60).padStart(2, '0');
      const endHour = String(Math.floor(slotEnd / 60)).padStart(2, '0');
      const endMin = String(slotEnd % 60).padStart(2, '0');

      slots.push({
        horaInicio: `${startHour}:${startMin}`,
        horaFin: `${endHour}:${endMin}`,
      });
    }

    currentMinutes += SCHEDULE.SLOT_MINUTES;
  }

  return slots;
}

/**
 * Consulta disponibilidad de slots para una fecha y trámite.
 */
export async function getAvailableSlots(fecha, tramiteId) {
  const database = getDatabase();

  const tramite = await database.tramite.findUnique({
    where: { id: tramiteId },
  });

  if (!tramite) {
    throw new AppError('Trámite no encontrado', HTTP_STATUS.NOT_FOUND);
  }

  if (!tramite.isActive) {
    throw new AppError('Este trámite no está disponible actualmente', HTTP_STATUS.BAD_REQUEST);
  }

  // Verificar que la fecha no sea pasada
  const requestedDate = new Date(fecha + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (requestedDate < today) {
    throw new AppError('No se puede consultar disponibilidad en fechas pasadas', HTTP_STATUS.BAD_REQUEST);
  }

  // Verificar que no sea fin de semana
  const dayOfWeek = requestedDate.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return { fecha, tramite: tramite.nombre, slotsDisponibles: [] };
  }

  const allSlots = generateAllSlots(tramite.duracionMinutos);

  // Obtener turnos existentes para esa fecha (no cancelados)
  const existingTurnos = await database.turno.findMany({
    where: {
      fecha: requestedDate,
      status: { not: TURNO_STATUS.CANCELADO },
    },
    select: { horaInicio: true, horaFin: true },
  });

  // Convertir turnos existentes a rangos de minutos para comparar
  const occupiedRanges = existingTurnos.map((turno) => {
    const startTime = new Date(turno.horaInicio);
    const endTime = new Date(turno.horaFin);
    return {
      startMinutes: startTime.getHours() * 60 + startTime.getMinutes(),
      endMinutes: endTime.getHours() * 60 + endTime.getMinutes(),
    };
  });

  // Filtrar slots que no se solapan con turnos existentes
  const availableSlots = allSlots.filter((slot) => {
    const [startH, startM] = slot.horaInicio.split(':').map(Number);
    const [endH, endM] = slot.horaFin.split(':').map(Number);
    const slotStart = startH * 60 + startM;
    const slotEnd = endH * 60 + endM;

    return !occupiedRanges.some(
      (range) => slotStart < range.endMinutes && slotEnd > range.startMinutes
    );
  });

  return {
    fecha,
    tramite: tramite.nombre,
    duracionMinutos: tramite.duracionMinutos,
    slotsDisponibles: availableSlots,
  };
}

/**
 * Crea un nuevo turno con transacción atómica.
 * RF-03: La restricción GIST en la BD es la última línea de defensa
 * contra condiciones de carrera.
 */
async function createTurnoInternal({ tramiteId, fecha, horaInicio, notas, userId, guestNombre, guestEmail, guestPhone }) {
  const database = getDatabase();

  const tramite = await database.tramite.findUnique({
    where: { id: tramiteId },
  });

  if (!tramite) {
    throw new AppError('Trámite no encontrado', HTTP_STATUS.NOT_FOUND);
  }

  if (!tramite.isActive) {
    throw new AppError('Este trámite no está disponible actualmente', HTTP_STATUS.BAD_REQUEST);
  }

  const horaFin = calculateEndTime(horaInicio, tramite.duracionMinutos);

  // Verificar que la hora esté dentro del horario de la notaría
  const [startH, startM] = horaInicio.split(':').map(Number);
  const [endH, endM] = horaFin.split(':').map(Number);
  const startMinutes = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;

  if (startMinutes < SCHEDULE.START_HOUR * 60 || endMinutes > SCHEDULE.END_HOUR * 60) {
    throw new AppError('El horario seleccionado está fuera del horario de atención', HTTP_STATUS.BAD_REQUEST);
  }

  // Verificar que no caiga en horario de almuerzo
  const lunchStart = SCHEDULE.LUNCH_START * 60;
  const lunchEnd = SCHEDULE.LUNCH_END * 60;
  if (startMinutes < lunchEnd && endMinutes > lunchStart) {
    throw new AppError('El horario seleccionado coincide con el horario de almuerzo', HTTP_STATUS.BAD_REQUEST);
  }

  const fechaDate = new Date(fecha + 'T00:00:00');

  // Verificar que no sea fecha pasada
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (fechaDate < today) {
    throw new AppError('No se pueden crear turnos en fechas pasadas', HTTP_STATUS.BAD_REQUEST);
  }

  // Verificar que no sea fin de semana
  const dayOfWeek = fechaDate.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    throw new AppError('No se pueden crear turnos en fines de semana', HTTP_STATUS.BAD_REQUEST);
  }

  // Transacción atómica (RF-03)
  const turno = await database.$transaction(async (tx) => {
    // Verificar solapamiento dentro de la transacción
    const overlapping = await tx.turno.findFirst({
      where: {
        fecha: fechaDate,
        status: { not: TURNO_STATUS.CANCELADO },
        AND: [
          { horaInicio: { lt: new Date(`1970-01-01T${horaFin}:00`) } },
          { horaFin: { gt: new Date(`1970-01-01T${horaInicio}:00`) } },
        ],
      },
    });

    if (overlapping) {
      throw new AppError(
        'El horario seleccionado ya no está disponible. Por favor seleccione otro.',
        HTTP_STATUS.CONFLICT
      );
    }

    if (userId) {
      const existingUserTurno = await tx.turno.findFirst({
        where: {
          userId,
          fecha: fechaDate,
          status: TURNO_STATUS.PENDIENTE,
        },
      });

      if (existingUserTurno) {
        throw new AppError(
          'Ya tiene un turno pendiente para esta fecha. Cancélelo antes de crear otro.',
          HTTP_STATUS.CONFLICT
        );
      }
    } else if (guestEmail) {
      const existingGuestTurno = await tx.turno.findFirst({
        where: {
          guestEmail,
          fecha: fechaDate,
          status: TURNO_STATUS.PENDIENTE,
        },
      });

      if (existingGuestTurno) {
        throw new AppError(
          'Ya existe una reserva pendiente para este correo y fecha. Cancélela antes de crear otra.',
          HTTP_STATUS.CONFLICT
        );
      }
    }

    return tx.turno.create({
      data: {
        fecha: fechaDate,
        horaInicio: new Date(`1970-01-01T${horaInicio}:00`),
        horaFin: new Date(`1970-01-01T${horaFin}:00`),
        notas: notas || null,
        userId: userId || null,
        guestNombre: guestNombre || null,
        guestEmail: guestEmail || null,
        guestPhone: guestPhone || null,
        tramiteId,
      },
      include: {
        tramite: { select: { nombre: true, duracionMinutos: true } },
        user: { select: { nombres: true, apellidos: true, email: true } },
      },
    });
  });

  // RF-04: Encolar email de confirmación (asíncrono, no bloquea)
  enqueueConfirmationEmail(turno).catch((emailError) => {
    console.error('[EMAIL QUEUE ERROR]', emailError.message);
  });

  // Notificación al administrativo (asíncrono, no bloquea)
  enqueueAdminNotificationEmail(turno).catch((emailError) => {
    console.error('[ADMIN EMAIL QUEUE ERROR]', emailError.message);
  });

  return turno;
}

export async function createTurno(userId, turnoData) {
  return createTurnoInternal({ ...turnoData, userId, guestNombre: null, guestEmail: null });
}

export async function createGuestTurno({ tramiteId, fecha, horaInicio, clienteNombre, clienteEmail, clienteTelefono, notas }) {
  return createTurnoInternal({
    tramiteId,
    fecha,
    horaInicio,
    notas,
    userId: null,
    guestNombre: clienteNombre,
    guestEmail: clienteEmail,
    guestPhone: clienteTelefono,
  });
}

/**
 * Obtiene los turnos del ciudadano autenticado.
 */
export async function getUserTurnos(userId) {
  const database = getDatabase();

  return database.turno.findMany({
    where: { userId },
    include: {
      tramite: { select: { nombre: true, duracionMinutos: true } },
    },
    orderBy: [{ fecha: 'desc' }, { horaInicio: 'desc' }],
  });
}

/**
 * Obtiene la agenda (para Administrativo y Notario).
 */
export async function getAgenda({ fecha, fechaInicio, fechaFin }) {
  const database = getDatabase();

  const whereClause = {
    status: { not: TURNO_STATUS.CANCELADO },
  };

  if (fecha) {
    whereClause.fecha = new Date(fecha + 'T00:00:00');
  } else if (fechaInicio && fechaFin) {
    whereClause.fecha = {
      gte: new Date(fechaInicio + 'T00:00:00'),
      lte: new Date(fechaFin + 'T00:00:00'),
    };
  }
  // Sin filtro por defecto - mostrar todos los turnos no cancelados

  return database.turno.findMany({
    where: whereClause,
    select: {
      id: true,
      fecha: true,
      horaInicio: true,
      horaFin: true,
      status: true,
      notas: true,
      guestNombre: true,
      guestEmail: true,
      user: {
        select: { id: true, cedula: true, nombres: true, apellidos: true },
      },
      tramite: { select: { nombre: true, duracionMinutos: true } },
    },
    orderBy: [{ fecha: 'asc' }, { horaInicio: 'asc' }],
  });
}

/**
 * Marca un turno como atendido (Notario).
 */
export async function markTurnoAsAttended(turnoId) {
  const database = getDatabase();

  const turno = await database.turno.findUnique({
    where: { id: turnoId },
  });

  if (!turno) {
    throw new AppError('Turno no encontrado', HTTP_STATUS.NOT_FOUND);
  }

  if (turno.status === TURNO_STATUS.ATENDIDO) {
    throw new AppError('Este turno ya fue marcado como atendido', HTTP_STATUS.CONFLICT);
  }

  if (turno.status === TURNO_STATUS.CANCELADO) {
    throw new AppError('No se puede atender un turno cancelado', HTTP_STATUS.BAD_REQUEST);
  }

  return database.turno.update({
    where: { id: turnoId },
    data: { status: TURNO_STATUS.ATENDIDO },
    include: {
      user: { select: { nombres: true, apellidos: true } },
      tramite: { select: { nombre: true } },
    },
  });
}

/**
 * Cancela un turno (Ciudadano o Administrativo).
 */
export async function cancelTurno(turnoId, userId, userRole) {
  const database = getDatabase();

  const turno = await database.turno.findUnique({
    where: { id: turnoId },
  });

  if (!turno) {
    throw new AppError('Turno no encontrado', HTTP_STATUS.NOT_FOUND);
  }

  // Un ciudadano solo puede cancelar sus propios turnos
  if (userRole === 'CIUDADANO' && turno.userId !== userId) {
    throw new AppError('No tiene permiso para cancelar este turno', HTTP_STATUS.FORBIDDEN);
  }

  if (turno.status === TURNO_STATUS.CANCELADO) {
    throw new AppError('Este turno ya fue cancelado', HTTP_STATUS.CONFLICT);
  }

  if (turno.status === TURNO_STATUS.ATENDIDO) {
    throw new AppError('No se puede cancelar un turno que ya fue atendido', HTTP_STATUS.BAD_REQUEST);
  }

  return database.turno.update({
    where: { id: turnoId },
    data: { status: TURNO_STATUS.CANCELADO },
  });
}

/**
 * Busca un turno por su ID para cancelación pública (sin autenticación).
 */
export async function findTurnoById(turnoId) {
  const database = getDatabase();

  const turno = await database.turno.findUnique({
    where: { id: turnoId },
    include: {
      tramite: { select: { nombre: true } },
    },
  });

  if (!turno) {
    throw new AppError('Turno no encontrado', HTTP_STATUS.NOT_FOUND);
  }

  return turno;
}

/**
 * Cancela un turno públicamente usando el ID del turno (sin autenticación).
 */
export async function cancelTurnoPublic(turnoId) {
  const database = getDatabase();

  const turno = await database.turno.findUnique({
    where: { id: turnoId },
  });

  if (!turno) {
    throw new AppError('Turno no encontrado', HTTP_STATUS.NOT_FOUND);
  }

  if (turno.status === TURNO_STATUS.CANCELADO) {
    throw new AppError('Este turno ya fue cancelado', HTTP_STATUS.CONFLICT);
  }

  if (turno.status === TURNO_STATUS.ATENDIDO) {
    throw new AppError('No se puede cancelar un turno que ya fue atendido', HTTP_STATUS.BAD_REQUEST);
  }

  return database.turno.update({
    where: { id: turnoId },
    data: { status: TURNO_STATUS.CANCELADO },
  });
}

/**
 * Genera reporte de turnos (Administrativo).
 */
export async function getTurnosReport({ fechaInicio, fechaFin, status }) {
  const database = getDatabase();

  const whereClause = {
    fecha: {
      gte: new Date(fechaInicio + 'T00:00:00'),
      lte: new Date(fechaFin + 'T00:00:00'),
    },
  };

  if (status) {
    whereClause.status = status;
  }

  const turnos = await database.turno.findMany({
    where: whereClause,
    include: {
      user: { select: { cedula: true, nombres: true, apellidos: true } },
      tramite: { select: { nombre: true } },
    },
    orderBy: [{ fecha: 'asc' }, { horaInicio: 'asc' }],
  });

  // Generar resumen estadístico
  const totalTurnos = turnos.length;
  const turnosPendientes = turnos.filter((t) => t.status === TURNO_STATUS.PENDIENTE).length;
  const turnosAtendidos = turnos.filter((t) => t.status === TURNO_STATUS.ATENDIDO).length;
  const turnosCancelados = turnos.filter((t) => t.status === TURNO_STATUS.CANCELADO).length;

  return {
    resumen: {
      totalTurnos,
      turnosPendientes,
      turnosAtendidos,
      turnosCancelados,
      fechaInicio,
      fechaFin,
    },
    turnos,
  };
}
