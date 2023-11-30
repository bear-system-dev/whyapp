import * as createChat from './CreateChat';
import * as createMessageInChatById from './CreateMessageInChatById';

export const chatProviders = {
  ...createChat,
  ...createMessageInChatById,
};