import * as miscRoutes from './Misc';
import * as loginRoutes from './Login';
import * as userRoutes from './User';
import * as chatRoutes from './Chat';

export const routes = {
  ...miscRoutes,
  ...loginRoutes,
  ...userRoutes,
  ...chatRoutes,
};