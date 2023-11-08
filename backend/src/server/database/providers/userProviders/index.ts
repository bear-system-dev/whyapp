import * as create from './Create';
import * as getUserByEmail from './GetUserByEmail';

export const userProviders = {
  ...create,
  ...getUserByEmail,
};