import express from 'express';
import authMiddleware from './middleware/auth';
import PatientResolvers from './resolvers/patients';
import ProvidersResolvers from './resolvers/providers';

const router = express.Router();

const PatientControllers = new PatientResolvers();
const ProviderControllers = new ProvidersResolvers();

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

export default router;
