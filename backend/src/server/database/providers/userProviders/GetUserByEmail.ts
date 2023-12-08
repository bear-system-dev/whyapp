import { PrismaClient } from '@prisma/client';
import { serverMessages } from '../../../shared/ServerMessages';
const prisma = new PrismaClient();

const notifyMessages = serverMessages.database.providers.users.getByEmail;

const getUserByEmail = async (email: string) => {
  try {
    const userByEmail = await prisma.user.findFirst({
      where: {
        email: email
      },
    });
    return userByEmail;
  } catch (error) {
    console.log(error);
    return new Error(notifyMessages.couldntSearch);
  }
};

export { getUserByEmail };