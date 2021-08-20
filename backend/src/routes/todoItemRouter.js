import express from 'express';
import passport from 'passport';

import { createItem, getItems, updateText, markDone, deleteItem } from '../controllers/todoItemControllers';

const router = express.Router();

/* Create a new todo item 
body : todoText, todolist_id
res  : returning data
*/
router.post('/createItem', passport.authenticate('jwt', { session: false }), createItem);

/* Get all todo items given a todo list id
body : todolist_id
res  : list of all todoitems associated with that id
*/
router.get('/getItems', passport.authenticate('jwt', { session: false }), getItems);

/* Update specific item text by id 
body : todoText, todoitem_id
res  : updated item 
*/
router.put('/updateText', passport.authenticate('jwt', { session: false }), updateText);

/* Update item and mark as checked (or completed)
body : todoitem_id
res  : updated item
*/
router.put('markDone', passport.authenticate('jwt', { session: false }), markDone);

/* Delete a specific item by id 
body: todoitem_id
res: deleted item
*/
router.delete('/delete', passport.authenticate('jwt', {session: false }), deleteItem);

export default router;
