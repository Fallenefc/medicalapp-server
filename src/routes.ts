import express from 'express';
import authMiddleware from './middleware/auth';
import MeasurementResolverDev from './resolvers/dev/measurement';
import SnapshotResolvers from './resolvers/snapshot';
import MeasurementsResolvers from './resolvers/measurement';
import PatientResolvers from './resolvers/patients';
import ProvidersResolvers from './resolvers/providers';
import FlagResolvers from './resolvers/flags';
import PatientHistoryResolvers from './resolvers/patientHistory';

const router = express.Router();

const PatientControllers = new PatientResolvers();
const ProviderControllers = new ProvidersResolvers();
const MeasurementControllersDev = new MeasurementResolverDev();
const SnapshotControllers = new SnapshotResolvers();
const MeasurementControllers = new MeasurementsResolvers();
const FlagControllers = new FlagResolvers();
const PatientHistoryControllers = new PatientHistoryResolvers();

// Login and Signup
router.post('/signup', ProviderControllers.register);
router.post('/login', ProviderControllers.login);
router.get('/me', authMiddleware, ProviderControllers.profile);
router.post('/forgotPassword', ProviderControllers.forgotPassword);
router.post('/resetPassword', ProviderControllers.resetPassword);
router.get('/verify/:token', ProviderControllers.verify);

// Patient Routes
router.post('/patients', authMiddleware, PatientControllers.addPatient);
router.get('/patients', authMiddleware, PatientControllers.getAllPatients);
router.get('/patient/:id', authMiddleware, PatientControllers.getPatient);

// Snapshot Routes
router.get('/snapshots/:patientId', authMiddleware, SnapshotControllers.patientGetAllSnapshots);

// Flag Routes
router.get('/flags/:patientId', authMiddleware, FlagControllers.patientGetAllFlags);

// Visit Routes
router.post('/getVisit', authMiddleware, SnapshotControllers.getVisit);

// Hybrid Snapshot and Flag route
// This will add both snapshots and Flag on a single date:
router.post('/addSnapAndFlag', authMiddleware, SnapshotControllers.createManySnapshotsAndFlags);
// And this will get both snapshots and flags for all dates, already in formatted way
router.get('/getSnapsAndFlags/:patientId', authMiddleware, SnapshotControllers.getSnapsAndFlags);

// Get Measurements
router.get('/measurements', MeasurementControllers.getMeasurements);

// Patient History Routes
router.post('/family', authMiddleware, PatientHistoryControllers.createFamilyHistory);
router.get('/family/:patientId', authMiddleware, PatientHistoryControllers.getFamilyHistory);

router.post('/note', authMiddleware, PatientHistoryControllers.createNote);
router.get('/notes/:patientId', authMiddleware, PatientHistoryControllers.getNotes);

router.post('/problem', authMiddleware, PatientHistoryControllers.createProblem);
router.get('/problems/:patientId', authMiddleware, PatientHistoryControllers.getProblems);

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
