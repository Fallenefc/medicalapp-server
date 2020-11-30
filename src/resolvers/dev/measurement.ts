/* eslint-disable class-methods-use-this */
import { Response, Request } from 'express';
import { getConnection } from 'typeorm';
import populateMeasurements from '../../utils/development/measurementsMock';
import Measurement from '../../entities/Measurement';

class MeasurementResolverDev {
  async createEvent(req: Request, res: Response) {
    try {
      const { name, minValue, maxValue } = req.body;
      const measurement = await Measurement.create({
        name,
        minValue,
        maxValue,
      })
        .save();
      return res.status(200).send(measurement);
    } catch (err) {
      console.error(`Something is wrong ghen creatingetting patients ${err}`);
      return res.status(400);
    }
  }

  async populateData(_: Request, res: Response) {
    try {
      const populate = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Measurement)
        .values(populateMeasurements)
        .execute();
      return res.status(200).send(populate);
    } catch (err) {
      console.error(`Something is wrong ghen creatingetting patients ${err}`);
      return res.status(400);
    }
  }
}

export default MeasurementResolverDev;
