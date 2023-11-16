import { sign, verify } from 'jsonwebtoken';

const createToken = (payload: object) => {
  try {
    if (!process.env.SECRET_KEY) { return new Error('There is no secret key'); }
    const token = sign(payload, process.env.SECRET_KEY, { expiresIn: 3600 });
    return token;
  } catch (error) {
    return new Error('An error ocurred during token generation');
  }
};

const verifyToken = (token: string) => {
  if (!process.env.SECRET_KEY) { return new Error('There is no secret key'); }
  if (!token.includes('Bearer ')) { return new Error('Incorrect token format'); }
  token = token.replace('Bearer ', '');
  try {
    const decoded = verify(token, process.env.SECRET_KEY);
    return decoded;
  } catch (error) {
    console.log(error);
    return new Error('Invalid token');
  }
};

export const jwt = { verifyToken, createToken };