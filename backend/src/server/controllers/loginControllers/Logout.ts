import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { blackListedToken } from '../../database/providers/blackListedToken';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MAX_BLACK_LISTED_TOKENS = Number(process.env.MAX_BLACK_LISTED_TOKENS) || 50;

export const logout = async (req: Request, res: Response) => {
  let token = req.headers['authorization'] || '';
  if (!token.includes('Bearer ') || token === '') {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: 'Incorrect token format',
      status: 401
    });
  }
  token = token.replace('Bearer ', '');

  const tokenId = await blackListedToken.create({ token });

  const tokenPosition = Number(await blackListedToken.getByToken(token));
  console.log(tokenPosition);

  //Apaga tudo
  // if (tokenPosition) {
  //   if (tokenPosition > MAX_BLACK_LISTED_TOKENS) {
  //     const deletedTokens = await blackListedToken.deleteManyByInterval({ startsAfter: 0, endsBefore: tokenPosition });
  //     console.log({ deletedTokens });
  //   }
  // }

  return res.status(StatusCodes.OK).json({
    message: 'Logged Out successfuly',
    tokenId,
    status: 200
  });
};