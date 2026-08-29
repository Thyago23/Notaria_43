// ============================================
// Users Module: Controlador
// ============================================

import {
  getUserProfile,
  updateUserProfile,
  createStaffUser,
  listAllUsers,
  updateUserRoleAndStatus,
  deleteUser
} from './users.service.js';
import { HTTP_STATUS } from '../../utils/constants.js';

export async function handleGetProfile(req, res, next) {
  try {
    const user = await getUserProfile(req.user.userId);
    return res.status(HTTP_STATUS.OK).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
}

export async function handleUpdateProfile(req, res, next) {
  try {
    const updatedUser = await updateUserProfile(req.user.userId, req.body);
    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Perfil actualizado exitosamente',
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
}

export async function handleCreateStaffUser(req, res, next) {
  try {
    const newUser = await createStaffUser(req.body);
    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Usuario del personal creado exitosamente',
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
}

export async function handleListUsers(req, res, next) {
  try {
    const users = await listAllUsers();
    return res.status(HTTP_STATUS.OK).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
}

export async function handleUpdateUser(req, res, next) {
  try {
    const { id } = req.params;
    const { role, isActive } = req.body;
    const updatedUser = await updateUserRoleAndStatus(id, { role, isActive });
    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Usuario actualizado exitosamente',
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
}

export async function handleDeleteUser(req, res, next) {
  try {
    const { id } = req.params;
    await deleteUser(id);
    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Usuario eliminado exitosamente',
    });
  } catch (error) {
    next(error);
  }
}
