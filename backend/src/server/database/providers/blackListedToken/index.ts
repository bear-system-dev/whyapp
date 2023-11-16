import * as create from './Create';
import * as getByToken from './GetByToken';


export const blackListedToken = {
  ...create,
  ...getByToken,
};