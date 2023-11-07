import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const miscRoutes = Router();

miscRoutes.get('/', (req, res) => {
  res.status(StatusCodes.OK).json({
    message: 'WhyApp - Seu app de comunicação segura e eficiente',
    status: 200
  });
});

export { miscRoutes };