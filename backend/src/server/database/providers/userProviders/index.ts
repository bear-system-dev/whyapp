import * as create from './Create';
import * as getUserByEmail from './GetUserByEmail';
import * as getUserById from './GetUserById';
import * as updateUserById from './UpdateUserById';

export const userProviders = {
  ...create,
  ...getUserByEmail,
  ...getUserById,
  ...updateUserById,
};