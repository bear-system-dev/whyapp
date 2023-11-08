import { Router } from 'express';
import { loginControllers } from '../controllers/loginControllers';

const loginRoutes = Router();

loginRoutes.post('/user/register',
  loginControllers.register
);

export { loginRoutes };