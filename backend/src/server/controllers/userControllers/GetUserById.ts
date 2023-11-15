import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { userProviders } from '../../database/providers/userProviders';

export const getById = async (req: Request, res: Response): Promise<Response> => {
  const userUuid = req.params.uuid;
  if(!userUuid) return res.status(StatusCodes.BAD_REQUEST).json({
    message: 'You must send the uuid',
    status: 400
  });

  const userData = await userProviders.getUserById(userUuid);
  if(userData instanceof Error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: userData.message,
    status: 500
  });
  if(userData === null) return res.status(StatusCodes.BAD_REQUEST).json({
    message: 'No user found for the uuid',
    status: 400
  });

  return res.status(StatusCodes.OK).json({
    userData: userData,
    status: 200
  });
};