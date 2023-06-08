import { NextFunction, Request, Response } from 'express';
import * as uuid from 'uuid';

interface Credential {
  username: string;
  password: string;
}

const credential: Credential = {
  username: process.env.USERNAME || uuid.v4(),
  password: process.env.PASSWORD || uuid.v4(),
};

const unauthorizeResponse = (res: Response): Response => {
  res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
  return res.sendStatus(401);
};

const decodeAuthorizationHeader = (req: Request): Credential => {
  const authorizationBase64: string = (req.headers.authorization || '').split(' ')[1] || '';
  const [username, password] = Buffer.from(authorizationBase64, 'base64').toString().split(':');
  return { username, password };
};

export const authenticationMiddleware = (req: Request, res: Response, next: NextFunction): Response | undefined => {
  const { username, password } = decodeAuthorizationHeader(req);
  if (username && password && (username !== credential.username || password !== credential.password))
    return unauthorizeResponse(res);
  next();
};
