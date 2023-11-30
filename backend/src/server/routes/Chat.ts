import { Router } from 'express';
import { chatControllers } from '../controllers/chatControllers';
import { middlewares } from '../shared/middlewares';

const chatRoutes = Router();

chatRoutes.post('/chat',
  middlewares.apiKeyDetect,
  middlewares.verifyToken,
  chatControllers.create
);

export { chatRoutes };