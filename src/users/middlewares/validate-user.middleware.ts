import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ValidateUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Now ValidateUserMiddleware');
    const { authorization } = req.headers;
    if (!authorization)
      return res
        .status(401)
        .send({ error: 'No Authentication Token Provided' });
    if (authorization === 'asdasd') {
      next();
    } else {
      return res
        .status(403)
        .send({ error: 'Invalid Authentication Token Provided' });
    }
  }
}
