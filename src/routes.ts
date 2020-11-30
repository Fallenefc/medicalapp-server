import express from 'express';
import authMiddleware from './middleware/auth';
import MeasurementResolverDev from './resolvers/dev/measurement';
import EventResolvers from './resolvers/events';
import MeasurementsResolvers from './resolvers/measurement';
import PatientResolvers from './resolvers/patients';
import ProvidersResolvers from './resolvers/providers';

const router = express.Router();

const PatientControllers = new PatientResolvers();
const ProviderControllers = new ProvidersResolvers();
const MeasurementControllersDev = new MeasurementResolverDev();
const EventControllers = new EventResolvers();
const MeasurementControllers = new MeasurementsResolvers();

// Login and Signup
router.post('/signup', ProviderControllers.register);
router.post('/login', ProviderControllers.login);
router.get('/me', authMiddleware, ProviderControllers.profile);
router.post('/forgotPassword', ProviderControllers.forgotPassword);
router.post('/resetPassword', ProviderControllers.resetPassword);

// Patient Routes
router.post('/patients', authMiddleware, PatientControllers.addPatient);
router.get('/patients', authMiddleware, PatientControllers.getAllPatients);

// Event Routes
router.post('/event', authMiddleware, EventControllers.createEvent);
router.get('/event', authMiddleware, EventControllers.getAllProviderEvents);
router.get('/events/:patientId', authMiddleware, EventControllers.patientGetAllEvents);

// Get Measurements
router.get('/measurements', MeasurementControllers.getMeasurements);

//
//
// DEVELOPMENT ROUTES
//
//

// Measurement Route (this is just for development)
router.post('/measurement', MeasurementControllersDev.createEvent);

// USE THE FOLLOWING ROUTE ONLY ONCE TO POPULATE YOUR MEASUREMENTS TABLE!!
// REMOVE THIS IN PRODUCTION
router.post('/populateMeasurements', MeasurementControllersDev.populateData);

export default router;
