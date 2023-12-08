import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { userProviders } from '../../database/providers/userProviders';
import { serverMessages } from '../../shared/ServerMessages';

const notifyMessages = serverMessages.controllers.users.get_by_id;

export const getById = async (req: Request, res: Response): Promise<Response> => {
  const errors: Array<string> = [];
  const userUuid = req.params.uuid;

  if (!userUuid) errors.push(notifyMessages.noUserId);

  const userData = await userProviders.getUserById(userUuid);
  if (userData instanceof Error) errors.push(userData.message);
  if (userData === null) errors.push(notifyMessages.noUserForUserId);

  if (errors.length >= 1) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors });
  return res.status(StatusCodes.OK).json({
    userData: userData,
    status: 200
  });
};