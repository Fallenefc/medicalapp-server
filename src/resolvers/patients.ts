/* eslint-disable class-methods-use-this */
import { getConnection } from 'typeorm';
import { Response } from 'express';
import Patient from '../entities/Patient';
import { AuthRequest } from './providers';
import Provider from '../entities/Provider';

class PatientResolvers {
  async addPatient(req: AuthRequest, res: Response) {
    try {
      const {
        uniqueId, title, firstName, lastName, DoB, sex, gender, email,
      } = req.body;
      if (!uniqueId || !title || !firstName || !lastName || !DoB) throw new Error('Missing params');
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

  async getAllPatients(req: AuthRequest, res: Response) {
    try {
      const patients = await getConnection()
        .getRepository(Patient)
        .createQueryBuilder('patient')
        .innerJoin('patient.providers', 'providers') // second param can be anything
        // just have to use the same on the first param of where
        .where('providers.id = :providerId', { providerId: req.user.id })
        .getMany();
      res.status(200).send(patients);
    } catch (err) {
      res.status(400).send(`Problem fetching patient data ${err}`);
    }
  }
}

export default PatientResolvers;
