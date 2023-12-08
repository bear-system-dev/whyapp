import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { userProviders } from '../../database/providers/userProviders';
import { serverMessages } from '../../shared/ServerMessages';

export const getById = async (req: Request, res: Response): Promise<Response> => {
  const errors: Array<string> = [];
  const userUuid = req.params.uuid;

  if (!userUuid) errors.push(serverMessages.controllers.users.get_by_id.noUserId);

  const userData = await userProviders.getUserById(userUuid);
  if (userData instanceof Error) errors.push(userData.message);
  if (userData === null) errors.push(serverMessages.controllers.users.get_by_id.noUserForUserId);

  if (errors.length >= 1) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors });
  return res.status(StatusCodes.OK).json({
    userData: userData,
    status: 200
  });
};