import { getDatabase } from '../../config/database.js';
import { hashValue, compareHash } from '../wrappers/hash.wrapper.js';
import { generateToken } from '../wrappers/jwt.wrapper.js';
import { isValidCedulaEcuatoriana } from '../../utils/cedulaValidator.js';
import { AppError } from '../../utils/appError.js';
import { HTTP_STATUS, USER_ROLES } from '../../utils/constants.js';


export async function registerCitizen({ cedula, nombres, apellidos, email, password }) {
  if (!isValidCedulaEcuatoriana(cedula)) {
    throw new AppError(
      'La cédula proporcionada no es válida según el algoritmo de verificación ecuatoriano',
      HTTP_STATUS.BAD_REQUEST
    );
  }

  const database = getDatabase();

  const existingUser = await database.user.findFirst({
    where: {
      OR: [{ cedula }, { email }],
    },
  });

  if (existingUser) {
    const duplicatedField = existingUser.cedula === cedula ? 'cédula' : 'email';
    throw new AppError(
      `Ya existe un usuario registrado con esta ${duplicatedField}`,
      HTTP_STATUS.CONFLICT
    );
  }

  const hashedPassword = await hashValue(password);

  const newUser = await database.user.create({
    data: {
      cedula,
      nombres,
      apellidos,
      email,
      password: hashedPassword,
      role: USER_ROLES.CIUDADANO,
    },
    select: {
      id: true,
      cedula: true,
      nombres: true,
      apellidos: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  const token = generateToken({ userId: newUser.id, role: newUser.role });

  return { user: newUser, token };
}


export async function loginUser({ cedula, password }) {
  const database = getDatabase();

  const user = await database.user.findUnique({
    where: { cedula },
  });

  if (!user) {
    throw new AppError('Credenciales inválidas', HTTP_STATUS.UNAUTHORIZED);
  }

  if (!user.isActive) {
    throw new AppError('La cuenta está desactivada', HTTP_STATUS.FORBIDDEN);
  }

  const isPasswordValid = await compareHash(password, user.password);

  if (!isPasswordValid) {
    throw new AppError('Credenciales inválidas', HTTP_STATUS.UNAUTHORIZED);
  }

  const token = generateToken({ userId: user.id, role: user.role });

  const { password: _omitPassword, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, token };
}
