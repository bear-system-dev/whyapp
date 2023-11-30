import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { chatProviders } from '../../database/providers/chatProviders';

export const sendPrivateMessage = async (req: Request, res: Response): Promise<Response> => {
  const { messageInput } = req.body;
  const { fromUuid, toUuid, chatId } = req.params;

  if (!fromUuid || !toUuid || !chatId) return res.status(StatusCodes.BAD_REQUEST).json({
    message: 'You need to send both \'from\' and \'to\' UUID\'s, and \'chatId\'',
    status: 400
  });
  if (fromUuid === toUuid) return res.status(StatusCodes.BAD_REQUEST).json({
    message: 'fromUuid and toUuid cannot be the same',
    status: 400
  });
  if (!messageInput) res.status(StatusCodes.BAD_REQUEST).json({
    message: 'You need to send a message input',
    status: 400
  });

  const newMessageId = await chatProviders.createMessageInChatById(fromUuid, chatId, messageInput);
  if (newMessageId instanceof Error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: newMessageId.message,
    status: 500
  });

  return res.status(StatusCodes.OK).json({
    fromUuid,
    toUuid,
    messageInput,
    newMessageId
  });
};