/* eslint-disable class-methods-use-this */
import { getConnection } from 'typeorm';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Provider from '../entities/Provider';

interface AuthRequest extends Request {
  user?: any,
}

class ProvidersResolvers {
  async register(req: Request, res: Response) {
    try {
      const {
        email, password, name, title,
      } = req.body;
      bcrypt.hash(password, 10, async (err, hashedPass) => {
        if (err) {
          res.json({
            error: err,
          });
          throw new Error();
        }
        const provider = await getConnection()
          .createQueryBuilder()
          .insert()
          .into(Provider)
          .values({
            email,
            password: hashedPass,
            name,
            title,
          })
          .execute();
        console.log(`Added to database: ${JSON.stringify(provider)}`);
        return res.status(200).send({
          ...provider.identifiers[0],
          email,
          hashedPass,
          name,
          title,
        });
      });
      return;
    } catch (err) {
      console.error(`Something is wrong signing up: ${err}`);
      res.status(403);
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const provider = await getConnection()
        .createQueryBuilder()
        .select('provider')
        .from(Provider, 'provider')
        .where('provider.email = :email', { email })
        .getOne();
      if (!provider) throw new Error('User does not exist');
      const isValid = await bcrypt.compare(password, provider.password);
      if (!isValid) throw new Error('Passwords do not match');

      return res.status(200).json({
        user: {
          id: provider.id,
          email: provider.email,
        },
        token: jwt.sign({ id: provider.id }, process.env.SECRET_KEY, {
          expiresIn: 86400,
        }),
      });
    } catch (err) {
      console.error(`Something is wrong login: ${err}`);
      return res.status(403).send({
        error: 'Forbidden',
      });
    }
  }

  async profile(req: AuthRequest, res: Response) {
    try {
      const data = req.user;
      res.status(200);
      res.send({
        email: data.email,
        name: data.name,
        id: data.id,
        title: data.title,
      });
    } catch (err) {
      console.error(`Something is wrong profile: ${err}`);
      res.sendStatus(403);
    }
  }
}

export default ProvidersResolvers;
