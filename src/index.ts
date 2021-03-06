import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createConnection } from 'typeorm';
import bodyParser from 'body-parser';
import Patient from './entities/Patient';
import Provider from './entities/Provider';
import router from './routes';
import Snapshot from './entities/Snapshot';
import Measurement from './entities/Measurement';
import Flag from './entities/Flag';
import FamilyHistory from './entities/patientHistory/FamilyHistory';
import Note from './entities/patientHistory/Note';
import Problem from './entities/patientHistory/Problems';

dotenv.config();

const app = express();

const corsConfig = {
  origin: [process.env.FRONTEND_URL, process.env.LANDING_URL, 'http://localhost:4000'],
  credentials: true, // this is for allowing cookies
};

app.use(bodyParser.json());
app.use(cors(corsConfig));
app.use(router);

(async () => {
  try {
    await createConnection({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Patient, Provider, Snapshot, Measurement, Flag, FamilyHistory, Note, Problem],
      synchronize: true, // DO NOT USE FOR PRODUCTION! USE MIGRATIONS INSTEAD
    });
    app.listen(process.env.PORT, () => {
      console.log(`Server is up and listening on port ${process.env.PORT}.`);
    });
  } catch (err) {
    console.log(err);
  }
})();
