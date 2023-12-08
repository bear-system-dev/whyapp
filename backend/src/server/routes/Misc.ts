import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { serverMessages } from '../shared/ServerMessages';

const notifyMessages = serverMessages.controllers.home;
const miscRoutes = Router();

miscRoutes.get('/', (req, res) => {
  res.status(StatusCodes.OK).json({
    message: notifyMessages.default,
    status: 200
  });
});

export { miscRoutes };