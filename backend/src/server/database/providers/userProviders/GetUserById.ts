import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

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
    return new Error('An error occrured when searching for user ID');
  }
};

export { getUserById };