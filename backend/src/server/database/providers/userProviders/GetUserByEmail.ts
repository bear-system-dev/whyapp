import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getUserByEmail = async (email: string) => {
  try {
    const userByEmail = await prisma.user.findFirst({
      where: {
        email: email
      },
    });
    console.log(userByEmail);    
    return userByEmail;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao procurar registros');
  }
};

export { getUserByEmail };