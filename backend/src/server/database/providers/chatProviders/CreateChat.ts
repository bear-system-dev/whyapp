import { PrismaClient } from '@prisma/client';
import { IChat } from '../../models/Chat';
const prisma = new PrismaClient();

interface IChatProps extends Omit<IChat, 'id'> { }

const createChat = async (chat: IChatProps) => {
  const chatName = chat.name;
  try {
    const newChatId = await prisma.chat.create({
      data: {
        name: chatName,
        fromToByGreaterId: chatName,
      },
      select: {
        id: true
      }
    });
    return newChatId;
  } catch (error) {
    console.log(error);
    return new Error('An error ocurred when creating new chat');
  }

};

export { createChat };