/* eslint-disable class-methods-use-this */
import { getConnection } from 'typeorm';
import { Request, Response } from 'express';
import Patient from '../entities/Patient';

class PatientResolvers {
  async getPatients(_: Request, res: Response) {
    try {
      const patients = await getConnection()
        .createQueryBuilder()
        .select('patient')
        .from(Patient, 'patient')
        .getMany();
      console.log(patients);
      return res.status(200).send(patients);
    } catch (err) {
      console.error(`Something is wrong getting patients ${err}`);
      return res.status(403);
    }
  }
}

export default PatientResolvers;
