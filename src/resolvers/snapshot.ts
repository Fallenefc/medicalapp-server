/* eslint-disable class-methods-use-this */
import { Response } from 'express';
import { AuthRequest } from './providers';
import Snapshot from '../entities/Snapshot';

class SnapshotResolvers {
  async createSnapshot(req: AuthRequest, res: Response) {
    try {
      const {
        date, measurementValue, measurementName, patientId,
      } = req.body;
      if (!date || !measurementValue || !measurementName || !patientId) throw new Error('Missing params');
      const provider = req.user;

      const snapshot = await Snapshot.create({
        date,
        measurementValue,
        measurement: measurementName,
        patient: patientId,
        providerId: provider.id,
      })
        .save();
      return res.status(200).send(snapshot);
    } catch (err) {
      console.error(`Something is wrong creating a snapshot ${err}`);
      return res.status(400);
    }
  }

  // make a map and resolve all promises
  async createManySnapshots(req: AuthRequest, res: Response) {
    try {
      const provider = req.user;
      const snapshotsArray = await Promise.all(req.body.snapshots.map(async (snapshot: any) => {
        const singleSnapshot: any = await Snapshot.create({
          date: req.body.date,
          measurementValue: snapshot.measurementValue,
          measurement: snapshot.measurement,
          patient: req.body.patientId,
          providerId: provider.id,
        });
        await singleSnapshot.save();
        return singleSnapshot;
      }));
      return res.status(200).send(snapshotsArray);
    } catch (err) {
      console.error(err);
      return res.status(400);
    }
  }

  async getAllProviderSnapshots(req: AuthRequest, res: Response) {
    try {
      const snapshots = await Snapshot.find({ where: { providerId: req.user.id } });
      return res.status(200).send(snapshots);
    } catch (err) {
      console.error(`error: ${err}`);
      return res.status(400);
    }
  }

  async patientGetAllSnapshots(req: AuthRequest, res: Response) {
    try {
      // TODO: Make a check if the provider actually has the patient as his patient
      const { patientId } = req.params;
      const patientSnapshots: any = await Snapshot.find({ where: { patient: patientId }, relations: ['measurement'] });
      return res.status(200).send(patientSnapshots);
    } catch (err) {
      console.error(`error: ${err}`);
      return res.status(400);
    }
  }
}

export default SnapshotResolvers;
