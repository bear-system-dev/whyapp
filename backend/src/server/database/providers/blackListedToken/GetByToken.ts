import { PrismaClient } from '@prisma/client';
import { serverMessages } from '../../../shared/ServerMessages';
const prisma = new PrismaClient();

const notifyMessages = serverMessages.database.providers.black_listed_token.get_by_token;


export const getByToken = async (token: string) => {
  if (token.includes('Bearer')) { token = token.replace('Bearer ', ''); }
  try {
    const blackListedToken = await prisma.blackListedToken.findFirst({
      where: {
        token: token,
      }
    });
    return blackListedToken?.id;
  } catch (error) {
    console.log(error);
    return new Error(notifyMessages.couldntVerifyToken);
  }
};