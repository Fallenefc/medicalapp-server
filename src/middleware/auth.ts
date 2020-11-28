import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import Provider from '../entities/Provider';

interface AuthRequest extends Request {
  user?: any; // fix that later
}

const authMiddleware = async (req: AuthRequest, res: Response, next: any) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new Error('Header does not exist');
    const [, token] = authHeader.split(' ');

    const jwtCheck: any = jwt.verify(token, process.env.SECRET_KEY);
    const user = await getManager()
      .createQueryBuilder(Provider, 'provider')
      .where('provider.id = :id', { id: jwtCheck.id })
      .getOne();
    if (!user) throw new Error('Invalid user');
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(403);
  }
};

export default authMiddleware;
