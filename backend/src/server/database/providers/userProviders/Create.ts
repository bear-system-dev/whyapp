import { serverMessages } from '../../../shared/ServerMessages';
import { services } from '../../../shared/services';
import { IUser } from '../../models/User';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const notifyMessages = serverMessages.database.providers.users.create;

const create = async (user: Omit<IUser, 'id'>): Promise<string | Error> => {
  const hashedPassword = await services.bcrypt.hashData(user.password);
  if(hashedPassword instanceof Error) return new Error(hashedPassword.message);
  try {
    const newUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword
      },
      select: {
        id: true
      }
    });

    if (!newUser.id) return new Error(notifyMessages.couldntCreate);
    console.log(`New User: ${newUser.id}`);
    return newUser.id;

  } catch (error) {
    return new Error(notifyMessages.couldntCreate);
  }
};

export { create };