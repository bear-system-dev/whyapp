import { Router } from 'express';
import { loginControllers } from '../controllers/loginControllers';
import { middlewares } from '../shared/middlewares';

const loginRoutes = Router();

loginRoutes.post('/user/register',
  middlewares.apiKeyDetect,
  loginControllers.register
);

loginRoutes.post('/user/login',
  middlewares.apiKeyDetect,
  loginControllers.login,
);

export { loginRoutes };