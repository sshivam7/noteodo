import express from 'express';
import passport from 'passport';

import { createList, getByGroupId, getList } from '../controllers/todoListControllers';

const router = express.Router();

/* Create a new todo list 
body: title, tag, group_id
res: newly created todo list 
*/
router.post('/createList', passport.authenticate('jwt', { session: false }), createList);

/* Get all todo lists by group_id
body: group_id
res: array of todo lists with matching group_id
*/
router.get('/getSet', passport.authenticate('jwt', {session: false}), getByGroupId);

// get all todo lists by todolist_id 
router.get('/:id', passport.authenticate('jwt', {session: false}), getList)

export default router;