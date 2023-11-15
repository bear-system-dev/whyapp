import * as create from './Create';
import * as getUserByEmail from './GetUserByEmail';
import * as getUserById from './GetUserById';

export const userProviders = {
  ...create,
  ...getUserByEmail,
  ...getUserById,
};