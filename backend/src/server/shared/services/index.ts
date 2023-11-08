import * as jwt from './JWT';
import * as bcrypt from './Bcrypt';

export const services = {
  ...jwt,
  ...bcrypt,
};