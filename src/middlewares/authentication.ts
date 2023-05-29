import { NextFunction, Request, Response } from 'express';

const credential = { username: 'username', password: 'password' };

const addUnauthorizedHeader = (res: Response) => {
  res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
  return res.sendStatus(401);
};

const decodeAuthorization = (req: Request): [string, string] => {
  const authorizationBase64: string = (req.headers.authorization || '').split(' ')[1] || '';
  const [username, password]: Array<string> = Buffer.from(authorizationBase64, 'base64').toString().split(':');
  return [username, password];
};

export const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const [username, password]: [string, string] = decodeAuthorization(req);
  if (username && password && (username !== credential.username || password !== credential.password))
    return addUnauthorizedHeader(res);
  next();
};
