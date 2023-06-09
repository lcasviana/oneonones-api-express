import { NextFunction, Request, Response } from 'express';
import * as uuid from 'uuid';

const unauthorizeResponse = (res: Response): Response => {
  res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
  return res.sendStatus(401);
};

const decodeAuthorizationHeader = (req: Request): [string, string] => {
  const authorizationBase64: string = (req.headers.authorization || '').split(' ')[1] || '';
  const [username, password] = Buffer.from(authorizationBase64, 'base64').toString().split(':');
  return [username, password];
};

const authentication = (req: Request, res: Response, next: NextFunction): Response | undefined => {
  const [username, password] = decodeAuthorizationHeader(req);
  if (username !== (process.env.USERNAME ?? uuid.v4()) || password !== (process.env.PASSWORD ?? uuid.v4()))
    return unauthorizeResponse(res);
  next();
};

export default authentication;
