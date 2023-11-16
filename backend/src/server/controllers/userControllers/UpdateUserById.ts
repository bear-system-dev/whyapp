import { Request, Response } from 'express';
import { userProviders } from '../../database/providers/userProviders';
import { StatusCodes } from 'http-status-codes';

interface IUpdateUserProps {
  id: string,
  email?: string,
  name?: string,
  password?: string,
  profile_img_path?: string,
}

export const updateUserById = async (req: Request<{ uuid: string }, unknown, IUpdateUserProps>, res: Response) => {
  const { profile_img_path } = req.body;
  const { uuid } = req.params;
  console.log(uuid);

  if (!uuid) return res.status(StatusCodes.BAD_REQUEST).json({
    message: 'uuid is required',
    status: 400
  });
  const id = uuid;

  let { email, name, password } = req.body;
  if (!email) email = '';
  if (!name) name = '';
  if (!password) password = '';
  
  const updatedUser = await userProviders.updateUserById({ id, email, name, password, profile_img_path });
  if (updatedUser instanceof Error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: updatedUser.message,
    status: 500
  });

  return res.status(StatusCodes.OK).json({
    updatedUser,
    status: 200
  });
};