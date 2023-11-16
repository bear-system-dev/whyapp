import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

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
    return new Error('An error ocurred verifying token');
  }
};