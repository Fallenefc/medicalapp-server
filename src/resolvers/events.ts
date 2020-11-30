/* eslint-disable class-methods-use-this */
import { Response } from 'express';
import { AuthRequest } from './providers';
import Event from '../entities/Event';

class EventResolvers {
  async createEvent(req: AuthRequest, res: Response) {
    try {
      const {
        date, measurementValue, measurementName, patientId,
      } = req.body;
      const provider = req.user;

      const event = await Event.create({
        date,
        measurementValue,
        measurement: measurementName,
        patient: patientId,
        provider: provider.id,
      })
        .save();
      return res.status(200).send(event);
    } catch (err) {
      console.error(`Something is wrong ghen creatingetting patients ${err}`);
      return res.status(400);
    }
  }
}

export default EventResolvers;
