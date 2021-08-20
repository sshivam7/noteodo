import express from 'express';
import passport from 'passport';

import {
   createOverviewPage,
   getOverviewPage,
   updateOverviewPage,
} from '../controllers/overviewControllers';

const router = express.Router();

// Create overview page for user
router.post('/create', passport.authenticate('jwt', { session: false }), createOverviewPage);

// Get overview page for user
router.get('/get', passport.authenticate('jwt', { session: false }), getOverviewPage);

// Update notes for overview page
router.put('/update', passport.authenticate('jwt', { session: false }), updateOverviewPage);
export default router;
