import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IUser } from '../../database/models/User';
import { userProviders } from '../../database/providers/userProviders';
import { serverMessages } from '../../shared/ServerMessages';

interface IBodyProps extends Omit<IUser, 'id'> { }

export const register = async (req: Request<unknown, unknown, IBodyProps>, res: Response): Promise<Response> => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: serverMessages.controllers.login.register.noNameEmailOrPassword,
      status: 400
    });
  }

  const newUserId = await userProviders.create({ name, email, password });

  if (newUserId instanceof Error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: newUserId.message,
      status: 400
    });
  }

  return res.status(StatusCodes.CREATED).json({
    message: serverMessages.controllers.login.register.default,
    newUserId,
    status: 201
  });
};