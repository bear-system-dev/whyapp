export interface IGetUserBy {
  name: string,
  email: string,
  filter?: string,
  page?: number,
  limit?: number,
}