import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const apiKeyDetect = (req: Request, res: Response, next: NextFunction) => {

  if (!req.body.credentials) return res.status(StatusCodes.UNAUTHORIZED).json({
    message: 'You need your credentials to access this API. Contact the owner',
    status: 401
  });

  const API_KEYS = () => { return process.env.API_KEYS?.split(';') || []; };
  if (API_KEYS().length < 1 || API_KEYS()[0] === '') return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: 'An error occured when processing your crendentials',
    status: 500
  });
  console.log(API_KEYS());

  if (!req.body.credentials.API_KEY) return res.status(StatusCodes.UNAUTHORIZED).json({
    message: 'Please send the API_KEY in your credentials',
    status: 401
  });

  if (API_KEYS()) {
    let count = 1;
    API_KEYS().forEach(key => {
      console.log(count);
      console.log('Comparing: ', [key, req.body.credentials.API_KEY]);
      if (req.body.credentials.API_KEY === key) {
        console.log('Compatible API_KEY: ', [key, req.body.credentials.API_KEY]);
        return next();
      } else if (count === 3) {
        console.log('Not compatible API_KEY: ', [key, req.body.credentials.API_KEY]);
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: 'UNAUTHORIZED: invalid or expired API_KEY',
          status: 401
        });
      } else {
        console.log('Not compatible API_KEY: ', [key, req.body.credentials.API_KEY]);
      }
      count++;
    });
  }

};