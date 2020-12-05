/* eslint-disable class-methods-use-this */
import { Response } from 'express';
import Note from '../entities/patientHistory/Note';
import FamilyHistory from '../entities/patientHistory/FamilyHistory';
import { AuthRequest } from './providers';
import Problem from '../entities/patientHistory/Problems';

class PatientHistoryResolvers {
  // PATIENT NOTE RESOLVERS

  async createNote(req: AuthRequest, res: Response) {
    try {
      const { note } = req.body;

      if (!note) throw new Error('Missing params');

      const createdNote = await Note.create({
        note,
      })
        .save();
      return res.status(200).send(createdNote);
    } catch (error) {
      console.error(`Something is wrong adding a note: ${error}`);
      return res.status(400).json({ error: 'Something is wrong adding a note' });
    }
  }

  async getNotes(req: AuthRequest, res: Response) {
    try {
      // TODO: Make a check if the provider actually has the patient as his patient
      const { patientId } = req.params;
      const patientNotes = await Note.find({ where: { patient: patientId } });
      return res.status(200).send(patientNotes);
    } catch (error) {
      console.error(`Something is wrong getting notes: ${error}`);
      return res.status(400).json({ error: 'Something is wrong getting notes' });
    }
  }

  // PATIENT FAMILY HISTORY RESOLVERS

  async createFamilyHistory(req: AuthRequest, res: Response) {
    try {
      const { condition } = req.body;

      if (!condition) throw new Error('Missing params');

      const createdFamilyHistory = await FamilyHistory.create({
        condition,
      })
        .save();
      return res.status(200).send(createdFamilyHistory);
    } catch (error) {
      console.error(`Something is wrong adding a note: ${error}`);
      return res.status(400).json({ error: 'Something is wrong adding a note' });
    }
  }

  async getFamilyHistory(req: AuthRequest, res: Response) {
    try {
      // TODO: Make a check if the provider actually has the patient as his patient
      const { patientId } = req.params;
      const patientFamilyHistory = await FamilyHistory.find({ where: { patient: patientId } });
      return res.status(200).send(patientFamilyHistory);
    } catch (error) {
      console.error(`Something is wrong getting notes: ${error}`);
      return res.status(400).json({ error: 'Something is wrong getting notes' });
    }
  }

  // PATIENT PROBLEMS RESOLVERS

  async createProblem(req: AuthRequest, res: Response) {
    try {
      const { problem } = req.body;

      if (!problem) throw new Error('Missing params');

      const createdProblem = await Problem.create({
        problem,
      })
        .save();
      return res.status(200).send(createdProblem);
    } catch (error) {
      console.error(`Something is wrong adding a note: ${error}`);
      return res.status(400).json({ error: 'Something is wrong adding a note' });
    }
  }

  async getProblems(req: AuthRequest, res: Response) {
    try {
      // TODO: Make a check if the provider actually has the patient as his patient
      const { patientId } = req.params;
      const patientProblems = await Problem.find({ where: { patient: patientId } });
      return res.status(200).send(patientProblems);
    } catch (error) {
      console.error(`Something is wrong getting problems: ${error}`);
      return res.status(400).json({ error: 'Something is wrong getting problems' });
    }
  }
}

export default PatientHistoryResolvers;
