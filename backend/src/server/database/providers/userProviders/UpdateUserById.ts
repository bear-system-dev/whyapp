import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { IUser } from '../../models/User';
import { services } from '../../../shared/services';
import { serverMessages } from '../../../shared/ServerMessages';

const notifyMessages = serverMessages.database.providers.users.updateById;

const updateUserById = async (user: IUser): Promise<object | Error> => {
  try {
    if (user.password) {
      const hashedUserPassword = await services.bcrypt.hashData(user.password);
      user.password = String(hashedUserPassword);
      console.log('password: ', user.password);
    }
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        email: user.email,
        name: user.name,
        password: user.password,
        profile_img_path: user.profile_img_path,
      }
    });
    return updatedUser;
  } catch (error) {
    console.log(error);
    return new Error(notifyMessages.couldntUpdate);
  }
};

export { updateUserById };