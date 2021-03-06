import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { getManager } from 'typeorm';
import Provider from '../entities/Provider';

interface AuthRequest extends Request {
  user: Provider;
}

dotenv.config();

const authMiddleware = async (req: AuthRequest, res: Response, next: any) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new Error('Header does not exist');
    const [, token] = authHeader.split(' ');

    // no idea what the type could be for jwtCheck
    const jwtCheck: any = jwt.verify(token, process.env.SECRET_KEY);
    const user = await getManager()
      .createQueryBuilder(Provider, 'provider')
      .where('provider.id = :id', { id: jwtCheck.id })
      .getOne();
    if (!user) throw new Error('Invalid user');
    req.user = user;
    next();
  } catch (error) {
    console.error(`Unauthorized route use: ${error}`);
    res.status(403).json({ error: 'Unauthorized' });
  }
};

export default authMiddleware;
