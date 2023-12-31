import { Request, Response } from 'express';
import { IUser } from '../../database/models/User';
import { StatusCodes } from 'http-status-codes';
import { userProviders } from '../../database/providers/userProviders';
import { services } from '../../shared/services';
import { serverMessages } from '../../shared/ServerMessages';

const notifyMessages = serverMessages.controllers.login.log_in;

interface IBodyProps extends Omit<IUser, 'id' | 'name'> { }

export const login = async (req: Request<unknown, unknown, IBodyProps>, res: Response): Promise<Response> => {

  const { email, password } = req.body;
  if (!email || !password) return res.status(StatusCodes.BAD_REQUEST).json({
    message: notifyMessages.noEmailOrPassword,
    status: 400
  });

  const userByEmail = await userProviders.getUserByEmail(email);
  if (userByEmail instanceof Error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: userByEmail.message,
    status: 500
  });
  if(!userByEmail) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: notifyMessages.noUserByEmailOrUndefined,
    status: 500
  });

  const token = services.jwt.createToken({ userId: userByEmail?.id, userName: userByEmail?.name });
  if (token instanceof Error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: token.message,
    status: 500
  });

  const isIqual = await services.bcrypt.compareData(password, userByEmail.password);
  if (isIqual) {
    return res.status(StatusCodes.OK).json({
      message: notifyMessages.default,
      auth: true,
      token,
      status: 200,
    });
  } else {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: notifyMessages.incorrectEmailOrPassword,
      status: 401
    });
  }

};