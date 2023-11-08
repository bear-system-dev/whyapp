import { Request, Response } from 'express';
import { IUser } from '../../database/models/User';
import { StatusCodes } from 'http-status-codes';
import { userProviders } from '../../database/providers/userProviders';
import { services } from '../../shared/services';

interface IBodyProps extends Omit<IUser, 'id' | 'name'> { }

export const login = async (req: Request<unknown, unknown, IBodyProps>, res: Response): Promise<Response> => {

  const { email, password } = req.body;
  if (!email || !password) return res.status(StatusCodes.BAD_REQUEST).json({
    message: 'You must send EMAIL and PASSWORD',
    status: 400
  });

  const userByEmail = await userProviders.getUserByEmail(email);
  if (userByEmail instanceof Error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: userByEmail.message,
    status: 500
  });

  if (password != userByEmail?.password) { // ? é o mesmo que: if ( userByEmail ) { ... }
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Incorrect email or password. Please, try again!',
      status: 401
    });
  }

  const token = services.jwt.createToken({userId: userByEmail.id, userName: userByEmail.name});
  if(token instanceof Error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: token.message,
    status: 500
  });

  return res.status(StatusCodes.OK).json({
    message: 'Log in successful',
    auth: true,
    token,
    status: 200,
  });

};