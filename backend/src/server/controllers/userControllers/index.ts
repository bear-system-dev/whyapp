import * as getUserById from './GetUserById';
import * as updateUserById from './UpdateUserById';

export const userControllers = {
  ...getUserById,
  ...updateUserById,
};