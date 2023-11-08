import * as apiKeyDetect from './ApiKeyDetect';
import * as verifyToken from './VerifyToken';

export const middlewares = {
  ...apiKeyDetect,
  ...verifyToken,
};