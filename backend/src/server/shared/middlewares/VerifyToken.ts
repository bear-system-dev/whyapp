import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { services } from '../services';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({
    message: 'No authorization token found',
    status: 401
  });
  const decoded = services.jwt.verifyToken(token);
  if(decoded instanceof Error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: decoded.message,
    status: 500
  });
  console.log('Decoded: ', decoded);
  
  next();
};