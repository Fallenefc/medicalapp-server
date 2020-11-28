/* eslint-disable class-methods-use-this */
import { getConnection } from 'typeorm';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import Provider from '../entities/Provider';

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
}

export default ProvidersResolvers;
