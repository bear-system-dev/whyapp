import * as miscRoutes from './Misc';
import * as loginRoutes from './Login';
import * as userRoutes from './User';

export const routes = {
  ...miscRoutes,
  ...loginRoutes,
  ...userRoutes,
};