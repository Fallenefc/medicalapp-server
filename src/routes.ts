import express from 'express';
import authMiddleware from './middleware/auth';
import MeasurementResolver from './resolvers/dev/measurement';
import EventResolvers from './resolvers/events';
import PatientResolvers from './resolvers/patients';
import ProvidersResolvers from './resolvers/providers';

const router = express.Router();

const PatientControllers = new PatientResolvers();
const ProviderControllers = new ProvidersResolvers();
const MeasurementControllers = new MeasurementResolver();
const EventControllers = new EventResolvers();

// fetch all patients
router.get('/patients', PatientControllers.getPatients);

// Login and Signup
router.post('/signup', ProviderControllers.register);
router.post('/login', ProviderControllers.login);
router.get('/me', authMiddleware, ProviderControllers.profile);
router.post('/forgotPassword', ProviderControllers.forgotPassword);
router.post('/resetPassword', ProviderControllers.resetPassword);

// Patient Routes
router.post('/patients', authMiddleware, PatientControllers.addPatient);

// Event Routes
router.post('/event', authMiddleware, EventControllers.createEvent);

// Measurement Route (this is just for development)
router.post('/measurement', MeasurementControllers.createEvent);

// USE THE FOLLOWING ROUTE ONLY ONCE TO POPULATE YOUR MEASUREMENTS TABLE!!
// REMOVE THIS IN PRODUCTION
// router.post('/populateMeasurements', MeasurementControllers.populateData);

export default router;
