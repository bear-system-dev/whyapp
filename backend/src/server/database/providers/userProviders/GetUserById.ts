import { PrismaClient } from '@prisma/client';
import { serverMessages } from '../../../shared/ServerMessages';
const prisma = new PrismaClient();

const notifyMessages = serverMessages.database.providers.users.getById;

const getUserById = async (userId: string) => {
  try {
    const userData = await prisma.user.findFirst({
      where: {
        id: userId
      }
    });
    return userData;
  } catch (error) {
    console.log(error);
    return new Error(notifyMessages.couldntSearch);
  }
};

export { getUserById };