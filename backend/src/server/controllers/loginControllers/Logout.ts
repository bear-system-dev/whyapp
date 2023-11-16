import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { blackListedToken } from '../../database/providers/blackListedToken';

export const logout = async (req: Request, res: Response) => {
  let token = req.headers['authorization'] || '';
  if (!token.includes('Bearer ') || token === '') {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Incorrect token format',
      status: 401
    });
  }
  token = token.replace('Bearer ', '');

  const tokenId = await blackListedToken.create({ token });

  return res.status(StatusCodes.OK).json({
    message: 'Logged Out successfuly',
    tokenId,
    status: 200
  });
};