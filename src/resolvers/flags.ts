/* eslint-disable class-methods-use-this */
import { Response } from 'express';
import { AuthRequest } from './providers';
import Flag from '../entities/Flag';

class FlagResolvers {
  async createFlag(req: AuthRequest, res: Response) {
    try {
      const {
        title, description, date, type, patient,
      } = req.body;

      if (!title || !description || !date || !type || !patient) throw new Error('Missing params');

      const flag = await Flag.create({
        title,
        description,
        date,
        type,
        patient,
      })
        .save();
      return res.status(200).send(flag);
    } catch (err) {
      console.error(`Something is wrong adding flag: ${err}`);
      return res.status(400);
    }
  }

  async patientGetAllFlags(req: AuthRequest, res: Response) {
    try {
      // TODO: Make a check if the provider actually has the patient as his patient
      const { patientId } = req.params;
      const patientFlags = await Flag.find({ where: { patient: patientId } });
      return res.status(200).send(patientFlags);
    } catch (err) {
      console.error(`error: ${err}`);
      return res.status(400);
    }
  }
}

export default FlagResolvers;