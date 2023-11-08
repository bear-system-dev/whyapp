import { IUser } from '../../models/User';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const create = async (user: Omit<IUser, 'id'>): Promise<string | Error> => {
  try {
    const newUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password
      },
      select: {
        id: true
      }
    });

    if(!newUser.id) return new Error('Erro ao criar registro');
    console.log(`New User: ${newUser.id}`);    
    return newUser.id;

  } catch (error) {
    return new Error('Erro ao criar registro');
  }
};

export { create };