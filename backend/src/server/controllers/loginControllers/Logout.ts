import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { blackListedToken } from '../../database/providers/blackListedToken';

export const logout = async (req: Request, res: Response) => {
  let tokenId: number | Error = 0;
  const errors: Array<string> = [];
  let token = req.headers['authorization'] || '';

  if (!token.includes('Bearer ') || token === '') {
    errors.push('Incorrect token format');
  } else {
    token = token.replace('Bearer ', '');
    tokenId = await blackListedToken.create({ token });
    if (tokenId instanceof Error) errors.push(tokenId.message);
  }

  const tokenPosition = await blackListedToken.getByToken(token);
  if (tokenPosition instanceof Error) errors.push(tokenPosition.message);
  if (tokenPosition === (null || undefined)) errors.push('Token position returned empty');

  if (errors.length >= 1) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors });
  return res.status(StatusCodes.OK).json({
    message: 'Logged Out successfuly',
    tokenId,
    tokenPosition,
    status: 200
  });
};