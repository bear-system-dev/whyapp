import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getByToken = async (token: string) => {
  try {
    const blackListedToken = await prisma.blackListedToken.findFirst({
      where: {
        token: token,
      }
    });
    return blackListedToken?.token;
  } catch (error) {
    console.log(error);
    return new Error('An error ocurred verifying token');
  }
};