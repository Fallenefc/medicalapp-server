import express from 'express';
import PatientResolvers from './resolvers/patients';
import ProvidersResolvers from './resolvers/providers';

const router = express.Router();

const PatientControllers = new PatientResolvers();
const ProviderControllers = new ProvidersResolvers();

// fetch all patients
router.get('/patients', PatientControllers.getPatients);

// Login and Signup
router.post('/signup', ProviderControllers.register);
// router.post('/login', userLogIn);
// router.get('/me', authMiddleware, getUserInfo);

export default router;
