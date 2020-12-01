/* eslint-disable class-methods-use-this */
import { Response } from 'express';
import { AuthRequest } from './providers';
import Warning from '../entities/Warning';

class WarningResolvers {
  async createWarning(req: AuthRequest, res: Response) {
    try {
      const {
        title, description, date, type, patient,
      } = req.body;

      if (!title || !description || !date || !type || !patient) throw new Error('Missing params');

      const warning = await Warning.create({
        title,
        description,
        date,
        type,
        patient,
      })
        .save();
      return res.status(200).send(warning);
    } catch (err) {
      console.error(`Something is wrong ghen creatingetting patients ${err}`);
      return res.status(400);
    }
  }

  async patientGetAllWarnings(req: AuthRequest, res: Response) {
    try {
      // TODO: Make a check if the provider actually has the patient as his patient
      const { patientId } = req.params;
      const patientWarnings = await Warning.find({ where: { patient: patientId } });
      return res.status(200).send(patientWarnings);
    } catch (err) {
      console.error(`error: ${err}`);
      return res.status(400);
    }
  }
}

export default WarningResolvers;
