import { Request, Response } from 'express';
import { chatProviders } from '../../database/providers/chatProviders';
import { StatusCodes } from 'http-status-codes';
import { serverMessages } from '../../shared/ServerMessages';

const notifyMessages = serverMessages.controllers.chats.create;

export const create = async (req: Request, res: Response) => {
  const errors: Array<string> = [];
  const { chatName } = req.body;

  if (!chatName) errors.push(notifyMessages.noChatName);

  const newChatId = await chatProviders.createChat(chatName);
  if (newChatId instanceof Error) errors.push(newChatId.message);

  if (errors.length >= 1) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors });
  return res.status(StatusCodes.CREATED).json({
    newChatId,
    status: 201
  });
};