import * as register from './Register';
import * as login from './Login';
import * as logout from './Logout';

export const loginControllers = {
  ...register,
  ...login,
  ...logout
};