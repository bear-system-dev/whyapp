import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const apiKeyDetect = (req: Request, res: Response, next: NextFunction) => {

  const key = req.query.key;

  if (!key) return res.status(StatusCodes.UNAUTHORIZED).json({
    message: 'You need your credentials to access this API. Contact the owner',
    status: 401
  });

  const API_KEYS = () => { return process.env.API_KEYS?.split(';') || []; };
  if (API_KEYS().length < 1 || API_KEYS()[0] === '') return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: 'An error occured when processing your crendentials',
    status: 500
  });

  if (API_KEYS()) {
    let count = 1;
    API_KEYS().forEach(k => {
      if (key === k) {
        console.log(`confirmed API_KEY: ${key}`);
        return next();
      } else if (count === 3) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: 'UNAUTHORIZED: invalid or expired API_KEY',
          status: 401
        });
      }
      count++;
    });
  }

};