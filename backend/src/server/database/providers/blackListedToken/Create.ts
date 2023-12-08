import { PrismaClient } from '@prisma/client';
import { serverMessages } from '../../../shared/ServerMessages';
const prisma = new PrismaClient();

const notifyMessages = serverMessages.database.providers.black_listed_token.create;

interface IBlackListedToken {
  token: string,
  userId?: string,
}

export const create = async (token: IBlackListedToken): Promise<Error | number> => {
  try {
    const tokenId = await prisma.blackListedToken.create({
      data: {
        token: token.token,
        userId: token.userId
      },
      select: {
        id: true
      }
    });

    console.log(`BlackListedTokens: ${tokenId.id}`);
    
    return tokenId.id;
  } catch (error) {
    console.log(error);
    return new Error(notifyMessages.couldntCreate);
  }
};