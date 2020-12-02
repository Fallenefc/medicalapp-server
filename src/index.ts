import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createConnection, Connection } from 'typeorm';
import bodyParser from 'body-parser';
import Patient from './entities/Patient';
import Provider from './entities/Provider';
import router from './routes';
import Event from './entities/Event';
import Measurement from './entities/Measurement';
import Warning from './entities/Warning';

dotenv.config();

const app = express();

const corsConfig = {
  origin: [process.env.FRONTEND_URL, process.env.LANDING_URL],
  credentials: true, // this is for allowing cookies
};

app.use(bodyParser.json());
app.use(cors(corsConfig));
app.use(router);

(async () => {
  try {
  // eslint-disable-next-line no-unused-vars
    const connection: Connection = await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Patient, Provider, Event, Measurement, Warning],
      synchronize: true, // DO NOT USE FOR PRODUCTION! USE MIGRATIONS INSTEAD
    });
    app.listen(process.env.PORT, () => {
      console.log(`Server is up and listening on port ${process.env.PORT}.`);
    });
  } catch (err) {
    console.log(err);
  }
})();
