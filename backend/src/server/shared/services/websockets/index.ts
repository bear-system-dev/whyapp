import * as homeNamespace from './HomeNamespace';
import * as userNamespace from './UserNamespace';

export const websockets = {
  ...homeNamespace,
  ...userNamespace
};