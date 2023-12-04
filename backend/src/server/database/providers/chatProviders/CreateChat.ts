import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createChat = async (chatName: string) => {
  if (String(chatName).length < 1 || chatName === '') return new Error('ChatName needs at least 1 caractere');
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