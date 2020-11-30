/* eslint-disable class-methods-use-this */
import { getConnection } from 'typeorm';
import { Request, Response } from 'express';
import Patient from '../entities/Patient';
import { AuthRequest } from './providers';
import Provider from '../entities/Provider';

class PatientResolvers {
  async getPatients(_: Request, res: Response) {
    try {
      const patients = await getConnection()
        .createQueryBuilder()
        .select('patient')
        .from(Patient, 'patient')
        .getMany();
      return res.status(200).send(patients);
    } catch (err) {
      console.error(`Something is wrong getting patients ${err}`);
      return res.status(403);
    }
  }

  async addPatient(req: AuthRequest, res: Response) {
    try {
      const {
        uniqueId, title, firstName, lastName, DoB, sex, gender, email,
      } = req.body;
      const linkedProvider: any = await Provider.findOne(req.user.id);
      const patient: Patient = await Patient.create({
        uniqueId,
        title,
        firstName,
        lastName,
        email,
        DoB,
        sex,
        gender,
        height: null,
      })
        .save();
      await getConnection()
        .createQueryBuilder()
        .relation(Provider, 'patients')
        .of(linkedProvider)
        .add(patient);
      res.status(200).send({
        ...patient,
        provider: linkedProvider.id,
      });
    } catch (err) {
      res.status(400).send(`Problem adding patient ${err}`);
    }
  }
}

export default PatientResolvers;
