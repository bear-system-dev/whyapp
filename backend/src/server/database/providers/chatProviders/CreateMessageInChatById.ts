import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createMessageInChatById = async (userId: string, chatId: string, messageInput: string) => {
  try {
    const newMessage = await prisma.chat.update({
      where: {
        id: chatId
      },
      data: {
        messages: {
          create: {
            message: messageInput,
            userId: userId,
          }
        }
      }
    });
    return newMessage;
  } catch (error) {
    console.log(error);
    return new Error('An error ocurrend when creating new message in chat');
  }
};