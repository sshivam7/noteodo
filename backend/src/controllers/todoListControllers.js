import { pool } from '../../config/db';

export const createList = async (request, response) => {
     try {
          const newList = await pool.query(
               `INSERT INTO todolist (title, tag, group_id) VALUES('${request.body.title}', '${request.body.tag}', '${request.body.group_id}') RETURNING *`
          );

          response.json(newList);
     } catch (err) {
          response.status(500).json({ error });
     }
}

export const getByGroupId = async (request, response) => {
     try {
          const lists = await pool.query(
               `SELECT * FROM todolist WHERE group_id = '${request.body.group_id}'`
          );
          
          response.json(lists);
     } catch(err) {
          response.status(500).json({ err })
     }
}

export const getList = async (request, response) => {
     try {
          const list = await pool.query(
               `SELECT * FROM todolist WHERE todolist_id = '${request.params.id}'`
          );
          response.json(list);
     } catch (err) {
          response.status(500).json({ err });
     }
}