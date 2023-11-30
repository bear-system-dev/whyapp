import * as user from './User';
import * as getUserBy from './GetUserBy';
import * as chat from './Chat';

export const models = {
  ...user,
  ...getUserBy,
  ...chat,
};