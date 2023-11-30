import * as getUserById from './GetUserById';
import * as updateUserById from './UpdateUserById';
import * as uploadProfileImage from './UploadProfileImage';
import * as sendPrivateMessage from './SendPrivateMessage';

export const userControllers = {
  ...getUserById,
  ...updateUserById,
  ...uploadProfileImage,
  ...sendPrivateMessage,
};