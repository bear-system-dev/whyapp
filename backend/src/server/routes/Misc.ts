import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const miscRoutes = Router();

miscRoutes.get('/', (req, res) => {
  res.status(StatusCodes.OK).json({
    message: 'WhyApp - Your secure and efficient comunication app',
    status: 200
  });
});

export { miscRoutes };