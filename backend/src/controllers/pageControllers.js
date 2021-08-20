import sanitizeHtml from 'sanitize-html';

import { pool } from '../../config/db';

export const createPage = async (request, response) => {
   try {
      // Sanitize title
      let { title } = request.body;
      title = sanitizeHtml(title);

      // add new page
      const newPage = await pool.query(
         `INSERT INTO pages (title, notes, pinned, user_id) VALUES('${title}', '${request.body.notes}', '${request.body.pinned}', '${request.user.user_id}') RETURNING *`
      );

      response.json(newPage);
   } catch (err) {
      response.status(500).json({ err });
   }
};

export const getAllPages = async (request, response) => {
   try {
      // Get all decks for the current logged in user
      const pages = await pool.query(
         `SELECT * FROM pages WHERE user_id = '${request.user.user_id}'`
      );
      response.json(pages);
   } catch (err) {
      response.status(500).json({ err });
   }
};

export const getPageById = async (request, response) => {
   try {
      // Find page given id
      const page = await pool.query(
         `SELECT * FROM pages where user_id = '${request.user.user_id}' AND page_id = '${request.params.id}'`
      );
      response.json(page);
   } catch (err) {
      response.status(500).json({ err });
   }
};

export const updatePage = async (request, response) => {
   try {
      const updatedPage = await pool.query(
         `UPDATE pages SET title = '${request.body.title}', notes = '${request.body.notes}' WHERE page_id = ${request.body.idval}`
      );

      response.json(updatedPage);
   } catch (err) {
      response.status(500).json({ err });
   }
}
