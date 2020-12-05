/* eslint-disable class-methods-use-this */
import { Response } from 'express';
import { AuthRequest } from './providers';
import Flag from '../entities/Flag';

class FlagResolvers {
  async patientGetAllFlags(req: AuthRequest, res: Response) {
    try {
      // TODO: Make a check if the provider actually has the patient as his patient
      const { patientId } = req.params;
      const patientFlags = await Flag.find({ where: { patient: patientId } });
      return res.status(200).send(patientFlags);
    } catch (error) {
      console.error(`Something is wrong getting flags: ${error}`);
      return res.status(400).json({ error: 'Something is wrong getting flags' });
    }
  }
}

export default FlagResolvers;
