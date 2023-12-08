import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createMessageInChatById = async (userId: string, chatId: string, messageInput: string) => {
  if (!userId || !chatId || !messageInput) return new Error('You must send userId, chatId and messageInput');
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