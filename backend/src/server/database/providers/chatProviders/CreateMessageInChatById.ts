import { PrismaClient } from '@prisma/client';
import { serverMessages } from '../../../shared/ServerMessages';
const prisma = new PrismaClient();

const notifyMessages = serverMessages.database.providers.chat.createMessageInChatById;


export const createMessageInChatById = async (userId: string, chatId: string, messageInput: string) => {
  if (!userId || !chatId || !messageInput) return new Error(notifyMessages.noUserIdChatIdOrMessageInput);
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
    return new Error(notifyMessages.errorCreatingMessageInChat);
  }
};