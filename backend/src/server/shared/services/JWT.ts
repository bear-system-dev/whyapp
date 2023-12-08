import { sign, verify } from 'jsonwebtoken';
import { serverMessages } from '../ServerMessages';

const notifyMessages = serverMessages.shared.services.jwt;

const createToken = (payload: object) => {
  try {
    if (!process.env.SECRET_KEY) { return new Error(notifyMessages.noSecretKey); }
    const token = sign(payload, process.env.SECRET_KEY, { expiresIn: 3600 });
    return token;
  } catch (error) {
    return new Error(notifyMessages.couldntGenerate);
  }
};

const verifyToken = (token: string) => {
  if (!process.env.SECRET_KEY) { return new Error(notifyMessages.noSecretKey); }
  if (!token.includes('Bearer ')) { return new Error(notifyMessages.incorrectTokenFormat); }
  token = token.replace('Bearer ', '');
  try {
    const decoded = verify(token, process.env.SECRET_KEY);
    return decoded;
  } catch (error) {
    console.log(error);
    return new Error(notifyMessages.invalidToken);
  }
};

export const jwt = { verifyToken, createToken };