export interface IChat {
  id: string,
  fromToByGreaterId?: string,
  name: string,
  messages?: string,
  users?: string,
  fromUuid: string,
  toUuid?: string | '',
  messageInput?: string
}