import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { userProviders } from '../../database/providers/userProviders';

export const getById = async (req: Request, res: Response): Promise<Response> => {
  const errors: Array<string> = [];
  const userUuid = req.params.uuid;

  if (!userUuid) errors.push('You must send the uuid');

  const userData = await userProviders.getUserById(userUuid);
  if (userData instanceof Error) errors.push(userData.message);
  if (userData === null) errors.push('No user found for the uuid');

  if (errors.length >= 1) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors });
  return res.status(StatusCodes.OK).json({
    userData: userData,
    status: 200
  });
};