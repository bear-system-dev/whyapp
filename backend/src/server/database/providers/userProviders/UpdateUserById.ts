import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { IUser } from '../../models/User';
import { services } from '../../../shared/services';

const updateUserById = async (user: IUser): Promise<object | Error> => {
  try {
    if (user.password) {
      const hashedUserPassword = await services.bcrypt.hashData(user.password);
      user.password = String(hashedUserPassword);
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
      },
      select: {
        account_status: true,
        email: true,
        name: true,
        password: false,
        profile_img_path: true,
        createdAt: true,
        updatedAt: true
      }
    });
    return updatedUser;
  } catch (error) {
    console.log(error);
    return new Error('An error occured updating user data');
  }
};

export { updateUserById };