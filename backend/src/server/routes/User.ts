import { Router } from 'express';
import { userControllers } from '../controllers/userControllers';

const userRoutes = Router();

userRoutes.post('/user/:uuid/account-info', userControllers.getById);
// userRoutes.post('/user/:uuid/update-account-info');

export { userRoutes };