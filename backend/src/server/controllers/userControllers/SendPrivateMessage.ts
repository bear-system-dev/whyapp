import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { chatProviders } from '../../database/providers/chatProviders';
import { serverMessages } from '../../shared/ServerMessages';

export const sendPrivateMessage = async (req: Request, res: Response): Promise<Response> => {
  const errors: Array<string> = [];
  const { messageInput } = req.body;
  const { fromUuid, toUuid, chatId } = req.params;

  if (!fromUuid || !toUuid || !chatId) errors.push(serverMessages.controllers.users.send_private_message.noFromToOrChatIds);
  if (fromUuid === toUuid) errors.push(serverMessages.controllers.users.send_private_message.sameFromToIds);
  if (!messageInput) errors.push(serverMessages.controllers.users.send_private_message.noMessageInput);

  const newMessageId = await chatProviders.createMessageInChatById(fromUuid, chatId, messageInput);
  if (newMessageId instanceof Error) errors.push(newMessageId.message);

  if (errors.length >= 1) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors });
  return res.status(StatusCodes.OK).json({
    fromUuid,
    toUuid,
    messageInput,
    newMessageId
  });
};