import express from 'express';
import authMiddleware from './middleware/auth';
import MeasurementResolverDev from './resolvers/dev/measurement';
import SnapshotResolvers from './resolvers/snapshot';
import MeasurementsResolvers from './resolvers/measurement';
import PatientResolvers from './resolvers/patients';
import ProvidersResolvers from './resolvers/providers';
import FlagResolvers from './resolvers/flags';

const router = express.Router();

const PatientControllers = new PatientResolvers();
const ProviderControllers = new ProvidersResolvers();
const MeasurementControllersDev = new MeasurementResolverDev();
const SnapshotControllers = new SnapshotResolvers();
const MeasurementControllers = new MeasurementsResolvers();
const FlagControllers = new FlagResolvers();

// Login and Signup
router.post('/signup', ProviderControllers.register);
router.post('/login', ProviderControllers.login);
router.get('/me', authMiddleware, ProviderControllers.profile);
router.post('/forgotPassword', ProviderControllers.forgotPassword);
router.post('/resetPassword', ProviderControllers.resetPassword);

// Patient Routes
router.post('/patients', authMiddleware, PatientControllers.addPatient);
router.get('/patients', authMiddleware, PatientControllers.getAllPatients);

// Snapshot Routes
router.post('/snapshot', authMiddleware, SnapshotControllers.createSnapshot);
router.get('/snapshot', authMiddleware, SnapshotControllers.getAllProviderSnapshots); // only in dev mode
router.get('/snapshots/:patientId', authMiddleware, SnapshotControllers.patientGetAllSnapshots);
router.post('/manySnapshots', authMiddleware, SnapshotControllers.createManySnapshots);

// Flag Routes
router.post('/flag', authMiddleware, FlagControllers.createFlag);
router.get('/flags/:patientId', authMiddleware, FlagControllers.patientGetAllFlags);

// Get Measurements
router.get('/measurements', MeasurementControllers.getMeasurements);

//
//
// DEVELOPMENT ROUTES
//
//

// // Measurement Route (this is just for development)
router.post('/measurement', MeasurementControllersDev.createMeasurement);

// USE THE FOLLOWING ROUTE ONLY ONCE TO POPULATE YOUR MEASUREMENTS TABLE!!
// REMOVE THIS IN PRODUCTION
router.post('/populateMeasurements', MeasurementControllersDev.populateData);

export default router;
