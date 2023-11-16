import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

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
    return new Error('Erro ao criar registro');
  }
};