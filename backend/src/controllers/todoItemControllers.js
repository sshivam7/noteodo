import sanitizeHtml from 'sanitize-html';

import { pool } from '../../config/db';

export const createItem = async (request, response) => {
   try {
      // sanitize todo text
      let { todoText } = request.body;
      todoText = sanitizeHtml(todoText);

      const newItem = await pool.query(
         `INSERT INTO todoitems (todotext, todolist_id) VALUES('${todoText}', '${request.body.todolist_id}') RETURNING *`
      );

      response.json(newItem);
   } catch (err) {
      response.status(500).json({ error });
   }
};

export const getItems = async (request, response) => {
   try {
      // Find all todo items associated with a given list
      const items = await pool.query(
         `SELECT * FROM todoitems WHERE todolist_id = '${request.body.todolist_id}'`
      );
      response.json(items);
   } catch (err) {
      response.status(500).json({ err });
   }
};

export const updateText = async (request, response) => {
   try {
      // Update item by id
      const updatedItem = await pool.query(
         `UPDATE todoitems SET todotext = '${request.body.todoText}' WHERE todoitem_id = '${request.body.todoitem_id}' RETURNING *`
      );

      response.json(updatedItem);
   } catch (err) {
      response.status(500).json({ err });
   }
};

export const markDone = async (request, response) => {
   try {
      // mark item as checked (or completed)
      const updatedItem = await pool.query(
         `UPDATE todoitems SET checked = true WHERE todoitem_id = '${request.body.todoitem_id}' RETURNING *`
      );

      response.json(updatedItem);
   } catch (err) {
      response.status(500).json({ err });
   }
};

export const deleteItem = async (request, response) => {
   try {
      const deletedItem = await pool.query(
         `DELETE FROM todoitems WHERE todoitem_id = '${request.body.todoitem_id}' RETURNING *`
      );

      response.json(deletedItem);
   } catch (err) {
      response.status(500).json({err});
   }
}
