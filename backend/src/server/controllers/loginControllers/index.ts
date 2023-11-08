import * as register from './Register';
import * as login from './Login';

export const loginControllers = {
  ...register,
  ...login,
};