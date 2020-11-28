import express from 'express';
import PatientResolvers from './resolvers/patients';

const router = express.Router();

const PatientControllers = new PatientResolvers();

// fetch all patients
router.get('/patients', PatientControllers.getPatients);

// Login and Signup
// router.post('/signup', registerUser);
// router.post('/login', userLogIn);
// router.get('/me', authMiddleware, getUserInfo);

export default router;
