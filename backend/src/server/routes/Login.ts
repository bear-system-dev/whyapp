import { Router } from 'express';
import { loginControllers } from '../controllers/loginControllers';

const loginRoutes = Router();

loginRoutes.post('/user/register',
  loginControllers.register
);

loginRoutes.post('/user/login',
  loginControllers.login
);

export { loginRoutes };