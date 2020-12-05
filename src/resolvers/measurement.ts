/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import Measurement from '../entities/Measurement';

class MeasurementsResolvers {
  async getMeasurements(_: Request, res: Response) {
    try {
      const measurements = await Measurement.find();
      return res.status(200).send(measurements);
    } catch (error) {
      console.error(`Something is wrong adding flag: ${error}`);
      return res.status(500).json({ error });
    }
  }
}

export default MeasurementsResolvers;
