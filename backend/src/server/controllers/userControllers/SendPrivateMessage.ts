import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { chatProviders } from '../../database/providers/chatProviders';

export const sendPrivateMessage = async (req: Request, res: Response): Promise<Response> => {
  const { messageInput } = req.body;
  let { chatName } = req.body;
  const { fromUuid, toUuid } = req.params;

  if (!chatName) {
    const privateChatusers = [];
    privateChatusers.push(fromUuid, toUuid);
    privateChatusers.sort();
    if (privateChatusers.length > 2) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Something went wrong',
      status: 500
    });
    chatName = `${privateChatusers[0]}//${privateChatusers[1]}`;
  }

  if (!fromUuid || !toUuid) return res.status(StatusCodes.BAD_REQUEST).json({
    message: 'You need to send both \'from\' and \'to\' UUID\'s',
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

  const newChatId = await chatProviders.createChat({ fromUuid, toUuid, name: chatName });
  if (newChatId instanceof Error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: newChatId.message,
    status: 500
  });

  return res.status(StatusCodes.OK).json({
    fromUuid,
    toUuid,
    newChat: newChatId,
    chatName,
    messageInput
  });
};