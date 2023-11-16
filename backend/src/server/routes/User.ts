import { Router } from 'express';
import { userControllers } from '../controllers/userControllers';
import { multerOptions } from '../config/multerOptions';
import multer from 'multer';

const userRoutes = Router();

userRoutes.post('/user/:uuid/account-info', userControllers.getById);
userRoutes.put('/user/:uuid/update-account-info', userControllers.updateUserById);
userRoutes.post('/user/uploads/profile-image',
  multer(multerOptions).single('profile-image'),
  userControllers.uploadProfileImage,
);

export { userRoutes };