enum AccountStatus {
  ACTIVE,
  INACTIVE
}

export interface IUser {
  id: string,
  name: string,
  email: string,
  password: string,
  account_status?: AccountStatus,
  profile_img_path?: string,
  messages?: string,
  chats?: string,
  createdAt?: string,
  updatedAt?: string,
}