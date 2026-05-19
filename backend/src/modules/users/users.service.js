// ============================================
// Users Module: Servicio (Lógica de Negocio)
// ============================================

import { getDatabase } from '../../config/database.js';
import { hashValue } from '../wrappers/hash.wrapper.js';
import { isValidCedulaEcuatoriana } from '../../utils/cedulaValidator.js';
import { AppError } from '../../utils/appError.js';
import { HTTP_STATUS } from '../../utils/constants.js';

const USER_SELECT_FIELDS = {
  id: true,
  cedula: true,
  nombres: true,
  apellidos: true,
  email: true,
  role: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
};

export async function getUserProfile(userId) {
  const database = getDatabase();

  const user = await database.user.findUnique({
    where: { id: userId },
    select: USER_SELECT_FIELDS,
  });

  if (!user) {
    throw new AppError('Usuario no encontrado', HTTP_STATUS.NOT_FOUND);
  }

  return user;
}

export async function updateUserProfile(userId, updateData) {
  const database = getDatabase();

  const user = await database.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new AppError('Usuario no encontrado', HTTP_STATUS.NOT_FOUND);
  }

  if (updateData.email && updateData.email !== user.email) {
    const existingEmail = await database.user.findUnique({
      where: { email: updateData.email },
    });
    if (existingEmail) {
      throw new AppError('El email ya está en uso', HTTP_STATUS.CONFLICT);
    }
  }

  const updatedUser = await database.user.update({
    where: { id: userId },
    data: updateData,
    select: USER_SELECT_FIELDS,
  });

  return updatedUser;
}

/**
 * Crea un usuario con rol Administrativo o Notario.
 * Solo accesible por Administrativos.
 */
export async function createStaffUser({ cedula, nombres, apellidos, email, password, role }) {
  if (!isValidCedulaEcuatoriana(cedula)) {
    throw new AppError(
      'La cédula proporcionada no es válida',
      HTTP_STATUS.BAD_REQUEST
    );
  }

  const database = getDatabase();

  const existingUser = await database.user.findFirst({
    where: { OR: [{ cedula }, { email }] },
  });

  if (existingUser) {
    const duplicatedField = existingUser.cedula === cedula ? 'cédula' : 'email';
    throw new AppError(
      `Ya existe un usuario con esta ${duplicatedField}`,
      HTTP_STATUS.CONFLICT
    );
  }

  const hashedPassword = await hashValue(password);

  const newUser = await database.user.create({
    data: { cedula, nombres, apellidos, email, password: hashedPassword, role },
    select: USER_SELECT_FIELDS,
  });

  return newUser;
}

export async function listAllUsers() {
  const database = getDatabase();

  return database.user.findMany({
    select: USER_SELECT_FIELDS,
    orderBy: { createdAt: 'desc' },
  });
}
