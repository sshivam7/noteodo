import express from 'express';
import passport from 'passport';

import { getAllPages, createPage, getPageById, updatePage } from '../controllers/pageControllers';

const router = express.Router();

// Create a new page associated with the current logged in user
router.post('/createPage', passport.authenticate('jwt', { session: false }), createPage);

// Get a list of all pages fro the current user
router.get('/', passport.authenticate('jwt', { session: false }), getAllPages);

// Get a particular page by id
router.get('/:id', passport.authenticate('jwt', { session: false }), getPageById);

// Update a specific page 
router.put('/update', passport.authenticate('jwt', {session: false}), updatePage);

export default router;
