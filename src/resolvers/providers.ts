/* eslint-disable class-methods-use-this */
import { getConnection } from 'typeorm';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Provider from '../entities/Provider';
import sendEmail from '../utils/emailSend';

dotenv.config();

export interface AuthRequest extends Request {
  user?: any, // correct this type
}

class ProvidersResolvers {
  async register(req: Request, res: Response) {
    try {
      const {
        email, password, name, title,
      } = req.body;
      if (!email || !password || !name || !title) throw new Error('Missing params');
      bcrypt.hash(password, 10, async (err, hashedPass) => {
        if (err) {
          res.json({
            error: err,
          });
          throw new Error();
        }
        const provider = await Provider.create({
          email,
          password: hashedPass,
          name,
          title,
          resetPassword: '',
        })
          .save();
        console.log(`Added to database: ${JSON.stringify(provider)}`);
        return res.status(200).send({
          email: provider.email,
        });
      });
      return;
    } catch (err) {
      console.error(`Something is wrong signing up: ${err}`);
      res.status(403);
    }
  }

  // TODO: send the same info as login
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

      const token = jwt.sign({ id: provider.id }, process.env.SECRET_KEY, {
        expiresIn: process.env.TOKEN_EXPIRATION || 86400, // 1 day
      });

      return res.status(200).json({
        user: {
          email: provider.email,
          name: provider.name,
          id: provider.id,
          title: provider.title,
        },
        token,
      });
    } catch (err) {
      console.error(`Something is wrong with login: ${err}`);
      return res.status(403).send({
        error: 'Forbidden',
      });
    }
  }

  async profile(req: AuthRequest, res: Response) {
    try {
      const data = req.user;
      const token = jwt.sign({ id: data.id }, process.env.SECRET_KEY, {
        expiresIn: process.env.TOKEN_EXPIRATION || 86400, // 1 day
      });
      res.status(200);
      res.send({
        user: {
          email: data.email,
          name: data.name,
          id: data.id,
          title: data.title,
        },
        token,
      });
    } catch (err) {
      console.error(`Something is wrong fetching profile: ${err}`);
      res.sendStatus(403);
    }
  }

  async forgotPassword(req: Request, res: Response) {
    try {
      const provider = await getConnection()
        .createQueryBuilder()
        .select('provider')
        .from(Provider, 'provider')
        .where('provider.email = :email', { email: req.body.email })
        .getOne();
      if (!provider) throw new Error('Provider not found');

      const token = jwt.sign({ id: provider.id }, process.env.SECREY_KEY_RESETPASS, {
        expiresIn: process.env.TOKEN_EXPIRATION || 86400, // 1 day
      });

      await getConnection()
        .createQueryBuilder()
        .update(Provider)
        .set({ resetPassword: token })
        .where('email = :email', { email: req.body.email })
        .execute();
      sendEmail(req.body.email, `${process.env.LANDING_URL || 'http://localhost:3000'}/resetPassword?token=${token}`);
      res.status(200);
      res.send({ status: 'Sent token to email' });
    } catch (err) {
      console.error(`Something is wrong forgot password: ${err}`);
      res.sendStatus(403);
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const { token, password } = req.body;
      if (!token || !password) throw new Error('Missing token or new password');
      console.log({ token });
      console.log(process.env.SECRET_KEY_RESETPASS);
      const jwtCheck: any = jwt.verify(token, process.env.SECREY_KEY_RESETPASS);
      bcrypt.hash(password, 10, async (err, hashedPass) => {
        if (err) throw new Error();
        await getConnection()
          .createQueryBuilder()
          .update(Provider)
          // TODO: Remove that later (if it doesnt break)
          .set({ password: hashedPass })
          .where('id = :id', { id: jwtCheck.id })
          .execute();
        res.sendStatus(200);
      });
    } catch (err) {
      console.error(`Something is wrong with resetting password: ${err}`);
      res.sendStatus(403);
    }
  }
}

export default ProvidersResolvers;
