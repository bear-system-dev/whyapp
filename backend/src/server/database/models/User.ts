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
  profile_img_path?: string | null,
  messages?: string,
  chats?: string,
  createdAt?: Date,
  updatedAt?: Date,
}