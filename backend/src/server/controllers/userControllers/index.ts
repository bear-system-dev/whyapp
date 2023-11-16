import * as getUserById from './GetUserById';
import * as updateUserById from './UpdateUserById';
import * as uploadProfileImage from './UploadProfileImage';

export const userControllers = {
  ...getUserById,
  ...updateUserById,
  ...uploadProfileImage,
};