import { Router } from 'express';
import { userControllers } from '../controllers/userControllers';
import { multerOptions } from '../config/multerOptions';
import multer from 'multer';
import { middlewares } from '../shared/middlewares';

const userRoutes = Router();

userRoutes.post('/user/:uuid/account-info',
  middlewares.apiKeyDetect,
  middlewares.verifyToken,
  userControllers.getById
);

userRoutes.put('/user/:uuid/update-account-info',
  middlewares.apiKeyDetect,
  middlewares.verifyToken,
  userControllers.updateUserById
);

userRoutes.post('/user/uploads/profile-image',
  middlewares.apiKeyDetect,
  middlewares.verifyToken,
  multer(multerOptions).single('profile-image'),
  userControllers.uploadProfileImage,
);

userRoutes.post('/user/send-message/:fromUuid/:toUuid/private-text',
  middlewares.apiKeyDetect,
  middlewares.verifyToken,
  userControllers.sendPrivateMessage
);

export { userRoutes };