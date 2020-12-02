/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import Measurement from '../entities/Measurement';

class MeasurementsResolvers {
  async getMeasurements(_: Request, res: Response) {
    try {
      const measurements = await Measurement.find();
      res.status(200).send(measurements);
    } catch (err) {
      console.error(err);
      res.status(500);
    }
  }
}

export default MeasurementsResolvers;
