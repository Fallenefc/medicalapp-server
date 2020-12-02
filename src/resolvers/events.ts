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
      if (!date || !measurementValue || !measurementName || !patientId) throw new Error('Missing params');
      const provider = req.user;

      const event = await Event.create({
        date,
        measurementValue,
        measurement: measurementName,
        patient: patientId,
        providerId: provider.id,
      })
        .save();
      return res.status(200).send(event);
    } catch (err) {
      console.error(`Something is wrong ghen creatingetting patients ${err}`);
      return res.status(400);
    }
  }

  // make a map and resolve all promises
  async createManyEvents(req: AuthRequest, res: Response) {
    try {
      const provider = req.user;
      const eventsArray = await Promise.all(req.body.events.map(async (event: any) => {
        const singleEvent: any = await Event.create({
          date: req.body.date,
          measurementValue: event.measurementValue,
          measurement: event.measurement,
          patient: req.body.patientId,
          providerId: provider.id,
        });
        await singleEvent.save();
        return singleEvent;
      }));
      return res.status(200).send(eventsArray);
    } catch (err) {
      console.error(err);
      return res.status(400);
    }
  }

  async getAllProviderEvents(req: AuthRequest, res: Response) {
    try {
      const events = await Event.find({ where: { providerId: req.user.id } });
      return res.status(200).send(events);
    } catch (err) {
      console.error(`error: ${err}`);
      return res.status(400);
    }
  }

  async patientGetAllEvents(req: AuthRequest, res: Response) {
    try {
      // TODO: Make a check if the provider actually has the patient as his patient
      const { patientId } = req.params;
      const patientEvents: any = await Event.find({ where: { patient: patientId }, relations: ['measurement'] });
      return res.status(200).send(patientEvents);
    } catch (err) {
      console.error(`error: ${err}`);
      return res.status(400);
    }
  }
}

export default EventResolvers;
