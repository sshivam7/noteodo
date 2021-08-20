import sanitizeHtml from 'sanitize-html';

import { pool } from '../../config/db';

export const createOverviewPage = async (request, response) => {
   try {
      let { title, notes } = request.body;
      title = sanitizeHtml(title);

      // Create new todo list to go with overview page
      const newTodoList = await pool.query(
         `INSERT INTO todolist (title, tag) VALUES('TODO', 'OVERVIEW' RETURNING *)`
      );

      const todolist_id = newTodoList.rows[0].todolist_id;

      // Create the new overview page
      const newOverviewPage = await pool.query(
         `INSERT INTO overview (title, notes, todolist_id, user_id) VALUES ('${title}', '${notes}', '${todolist_id}', '${request.user.user_id}') RETURNING *`
      );

      response.json(newOverviewPage);
   } catch (err) {
      response.status(500).json({ err });
   }
};

export const getOverviewPage = async (request, response) => {
   try {
      // get overview page depending on logged in user
      const overviewPage = await pool.query(
         `SELECT * FROM overview where user_id = '${request.user.user_id}'`
      );

      response.json(overviewPage);
   } catch (err) {
      response.status(500).json({ err });
   }
};

export const updateOverviewPage = async (request, response) => {
   try {
        // update notes for overview page 
        const updatedPage = await pool.query(
             `UPDATE overview SET notes = '${request.body.notes}' WHERE user_id = '${request.user.user_id}' RETURNING *`
        );

        response.json(updatedPage);
   } catch (err) {
      response.status(500).json({ err });
   }
};
