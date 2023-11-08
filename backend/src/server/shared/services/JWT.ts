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
  verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) return new Error('An error ocurred during token decoding');
    return decoded;
  });
  return 'Noasdowd';
};

export const jwt = { verifyToken, createToken };