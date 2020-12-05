/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
import { Response } from 'express';
import { AuthRequest } from './providers';
import Snapshot from '../entities/Snapshot';
import Flag from '../entities/Flag';

class SnapshotResolvers {
  // deprecated
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
    } catch (error) {
      console.error(`Something is wrong creating a snapshot: ${error}`);
      return res.status(400).json({ error });
    }
  }

  // deprecated
  async createManySnapshots(req: AuthRequest, res: Response) {
    try {
      const provider = req.user;
      const snapshotsArray = await Promise.all(req.body.snapshots.map(async (snapshot: Snapshot) => {
        const singleSnapshot: Snapshot = Snapshot.create({
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
    } catch (error) {
      console.error(`Something is wrong creating many snapshots: ${error}`);
      return res.status(400).json({ error });
    }
  }

  async createManySnapshotsAndFlags(req: AuthRequest, res: Response) {
    try {
      const provider = req.user;
      const patient = req.body.patientId;
      const { date } = req.body;
      const snapshotsArray = await Promise.all(req.body.snapshots.map(async (snapshot: Snapshot) => {
        const { measurementValue, measurement } = snapshot;
        const singleSnapshot: Snapshot = Snapshot.create({
          date,
          measurementValue,
          measurement,
          patient,
          providerId: provider.id,
        });
        await singleSnapshot.save();
        return singleSnapshot;
      }));
      const flagsArray = await Promise.all(req.body.flags.map(async (flag: Flag) => {
        const { title, description, type } = flag;
        const singleFlag: Flag = Flag.create({
          date,
          title,
          description,
          type,
          patient,
        });
        await singleFlag.save();
        return singleFlag;
      }));
      return res.status(200).send({
        snapshots: snapshotsArray,
        flags: flagsArray,
      });
    } catch (error) {
      console.error(`Something is wrong adding flags and snapshots: ${error}`);
      return res.status(400).json({ error });
    }
  }

  // deprecated
  async getAllProviderSnapshots(req: AuthRequest, res: Response) {
    try {
      const snapshots: Snapshot[] = await Snapshot.find({ where: { providerId: req.user.id } });
      return res.status(200).send(snapshots);
    } catch (error) {
      console.error(`Something is wrong getting snapshots: ${error}`);
      return res.status(400).json({ error });
    }
  }

  async patientGetAllSnapshots(req: AuthRequest, res: Response) {
    try {
      // TODO: Make a check if the provider actually has the patient as his patient
      const { patientId } = req.params;
      const patientSnapshots: Snapshot[] = await Snapshot.find({ where: { patient: patientId }, relations: ['measurement'] });
      return res.status(200).send(patientSnapshots);
    } catch (error) {
      console.error(`Something is wrong getting patient snapshots: ${error}`);
      return res.status(400).json({ error });
    }
  }
}

export default SnapshotResolvers;
