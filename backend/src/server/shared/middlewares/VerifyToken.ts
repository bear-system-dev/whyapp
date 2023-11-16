import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { services } from '../services';
import { blackListedToken } from '../../database/providers/blackListedToken';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({
    message: 'No authorization token found',
    status: 401
  });

  const blackListedTokenResult = await blackListedToken.getByToken(token);
  if (typeof blackListedTokenResult === 'number') { 
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Expired Token. Please log in',
      position: blackListedTokenResult,
      status: 401
    });
  }

  const decoded = services.jwt.verifyToken(token);
  if (decoded instanceof Error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: decoded.message,
    status: 500
  });
  if (!decoded) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: 'Something went wrong',
    status: 500
  });

  next();
};