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
        uniqueId, title, firstName, lastName, DoB, sex, gender, email, height,
      } = req.body;
      if (!uniqueId || !title || !firstName || !lastName || !DoB) throw new Error('Missing params');
      const linkedProvider: Provider = await Provider.findOne(req.user.id);
      const patient: Patient = await Patient.create({
        uniqueId,
        title,
        firstName,
        lastName,
        email,
        DoB,
        sex,
        gender,
        height,
      })
        .save();
      await getConnection()
        .createQueryBuilder()
        .relation(Provider, 'patients')
        .of(linkedProvider)
        .add(patient);
      return res.status(200).send({
        ...patient,
        provider: linkedProvider.id,
      });
    } catch (error) {
      console.error(`Something is wrong adding patient: ${error}`);
      return res.status(400).json({ error });
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
      return res.status(200).send(patients);
    } catch (error) {
      console.error(`Something is wrong getting all patients: ${error}`);
      return res.status(400).json({ error });
    }
  }
}

export default PatientResolvers;
