import { hash, compare } from 'bcrypt';

const SALT = 8;

const hashData = async (data: string): Promise<string | Error> => {
  try {
    const hashedData = await hash(data, SALT);
    return hashedData;
  } catch (error) {
    console.log(error);
    return new Error('An error occured during hashing data');
  }
};

const compareData = async (data: string, hashedData: string): Promise<boolean | Error> => {
  try {
    const isIqual = await compare(data, hashedData);
    return isIqual;
  } catch (error) {
    console.log(error);
    return new Error('An error occured during comparing data');
  }
};

export const bcrypt = { hashData, compareData };