import { Request, Response } from 'express';
import { userProviders } from '../../database/providers/userProviders';
import { StatusCodes } from 'http-status-codes';
import { serverMessages } from '../../shared/ServerMessages';

const notifyMessages = serverMessages.controllers.users.update_by_id;

interface IUpdateUserProps {
  id: string,
  email?: string,
  name?: string,
  password?: string,
  profile_img_path?: string,
}

export const updateUserById = async (req: Request<{ uuid: string }, unknown, IUpdateUserProps>, res: Response) => {
  const errors: Array<string> = [];
  const { profile_img_path } = req.body;
  const { uuid } = req.params;

  let id = ''; //Cant set uuid on updateUserById({})
  if (!uuid) {
    errors.push(notifyMessages.noUserId);
  } else {
    id = uuid;
  }

  let { email, name, password } = req.body;
  if (!email) email = '';
  if (!name) name = '';
  if (!password) password = '';

  const updatedUser = await userProviders.updateUserById({ id, email, name, password, profile_img_path });
  if (updatedUser instanceof Error) errors.push(updatedUser.message);

  if (errors.length >= 1) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors });
  return res.status(StatusCodes.OK).json({
    updatedUser,
    status: 200
  });
};