import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { resolve } from 'path';
import { createConnection, Connection } from 'typeorm';

dotenv.config({ path: resolve(__dirname, '../.env') });

const app = express();

const corsConfig = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};

app.use(express.json());
app.use(cors(corsConfig));

app.get('/', () => console.log('hello world'));

(async () => {
  try {
  // eslint-disable-next-line no-unused-vars
    const connection: Connection = await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: process.env.DB_PASSWORD,
      database: 'medicalapp',
    });
    app.listen(process.env.PORT, () => {
      console.log(`Server is up and listening on port ${process.env.PORT}.`);
    });
  } catch (err) {
    console.log(err);
  }
})();
