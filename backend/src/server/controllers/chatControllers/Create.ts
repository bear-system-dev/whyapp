import { Request, Response } from 'express';
import { chatProviders } from '../../database/providers/chatProviders';
import { StatusCodes } from 'http-status-codes';

export const create = async (req: Request, res: Response) => {
  const { chatName } = req.body;
  if (!chatName) return res.status(StatusCodes.BAD_REQUEST).json({
    message: 'You need to send the chat name',
    status: 400
  });

  // if (!chatName) {
  //   const privateChatusers = [];
  //   privateChatusers.push(fromUuid, toUuid);
  //   privateChatusers.sort();
  //   if (privateChatusers.length > 2) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  //     message: 'Something went wrong',
  //     status: 500
  //   });
  //   chatName = `${privateChatusers[0]}//${privateChatusers[1]}`;
  // }

  const newChatId = await chatProviders.createChat(chatName);
  if (newChatId instanceof Error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: newChatId.message,
    status: 500
  });

  return res.status(StatusCodes.CREATED).json({
    newChatId: newChatId.id,
    status: 201
  });
};