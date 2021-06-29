import express from 'express';
import passport from 'passport';

import { registerUser, loginUser, isValidToken } from '../controllers/userControllers';

// eslint-disable-next-line new-cap
const router = express.Router();

// Route to register a new user
router.post('/register', registerUser);

// Route to login an existing user
router.post('/login', loginUser);

// Check to see is token is valid
router.post('/isValidToken', isValidToken);

export default router;
