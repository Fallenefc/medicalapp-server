/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
import { Response } from 'express';
import { AuthRequest } from './providers';
import Snapshot from '../entities/Snapshot';
import Flag from '../entities/Flag';

class SnapshotResolvers {
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
      return res.status(400).json({ error: 'Something is wrong adding flags and snapshots' });
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
      return res.status(400).json({ error: 'Something is wrong getting patient snapshots' });
    }
  }

  async getSnapsAndFlags(req: AuthRequest, res: Response) {
    try {
      const { patientId } = req.params;
      const patientSnapshots: Snapshot[] = await Snapshot.find({ where: { patient: patientId }, relations: ['measurement'] });
      const patientFlags: Flag[] = await Flag.find({ where: { patient: patientId } });
      const dates: any = {};
      patientSnapshots.forEach((snap: any) => {
        const { date } = snap;
        const snapshot = {
          marker: snap.measurementValue,
          name: snap.measurement.name,
        };
        // eslint-disable-next-line no-prototype-builtins
        if (dates.hasOwnProperty(date)) dates[date].snapshots = [...dates[date].snapshots, snapshot];
        else {
          dates[date] = {
            snapshots: [snapshot],
            flags: [],
          };
        }
      });
      patientFlags.forEach((flag: any) => {
        const { date } = flag;
        const currentFlag = {
          title: flag.title,
          description: flag.title,
          type: flag.type,
        };
        // eslint-disable-next-line no-prototype-builtins
        if (dates.hasOwnProperty(date)) dates[date].flags = [...dates[date].flags, currentFlag];
        else {
          dates[date] = {
            snapshots: [],
            flags: [currentFlag],
          };
        }
      });
      res.status(200).json(dates);
    } catch (err) {
      res.status(400).json({ error: 'Failure trying to fetch data' });
    }
  }
}

export default SnapshotResolvers;
