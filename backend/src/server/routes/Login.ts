import { Router } from 'express';
import { loginControllers } from '../controllers/loginControllers';
import { middlewares } from '../shared/middlewares';

const loginRoutes = Router();

loginRoutes.post('/user/auth/register',
  middlewares.apiKeyDetect,
  loginControllers.register
);

loginRoutes.post('/user/auth/login',
  middlewares.apiKeyDetect,
  loginControllers.login,
);

loginRoutes.post('/user/auth/logout',
  middlewares.apiKeyDetect,
  middlewares.verifyToken,
  loginControllers.logout);

export { loginRoutes };