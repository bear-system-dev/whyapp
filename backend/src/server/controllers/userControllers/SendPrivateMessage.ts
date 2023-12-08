import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { chatProviders } from '../../database/providers/chatProviders';

export const sendPrivateMessage = async (req: Request, res: Response): Promise<Response> => {
  const errors: Array<string> = [];
  const { messageInput } = req.body;
  const { fromUuid, toUuid, chatId } = req.params;

  if (!fromUuid || !toUuid || !chatId) errors.push('You need to send both \'from\' and \'to\' UUID\'s, and \'chatId\'');
  if (fromUuid === toUuid) errors.push('fromUuid and toUuid cannot be the same');
  if (!messageInput) errors.push('You need to send a message input');

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