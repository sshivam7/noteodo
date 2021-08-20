import sanitizeHtml from 'sanitize-html';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { pool } from '../../config/db';
import validateRegistration from '../validation/register';
import validateLogin from '../validation/login';

const saltRounds = 10;
// Register a new user
export const registerUser = async (request, response) => {
   try {
      let { username, password, email, animal } = request.body;
      const { validationErrors, isValid } = validateRegistration(request.body);

      // Validate data
      if (!isValid) {
         return response.status(400).json({ msg: validationErrors });
      }

      // Check for an existing user with the same username
      const existingUsername = await pool.query(
         `SELECT * FROM users WHERE username = '${username}'`
      );
      if (existingUsername.rowCount > 0) {
         return response.status(400).json({ msg: ['Username already in use'] });
      }

      // Check for an existing user with the same email
      const existingEmail = await pool.query(`SELECT * FROM users WHERE email = '${email}'`);
      if (existingEmail.rowCount > 0) {
         return response
            .status(400)
            .json({ msg: ['This email already exists within our database'] });
      }

      // Sanitize data
      username = sanitizeHtml(username);
      password = sanitizeHtml(password);
      email = sanitizeHtml(email);

      // Use bcrypt to hash passwords before saving to database
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(password, salt);

      const newUser = await pool.query(
         `INSERT INTO users (username, password, email, animal) VALUES('${username}', '${hash}', '${email}', '${animal}') RETURNING *`
      );

      // Create overview page for user
      // Create new todo list to go with overview page
      const newTodoList = await pool.query(
         `INSERT INTO todolist (title, tag) VALUES('TODO', 'OVERVIEW') RETURNING *`
      );

      const todolist_id = newTodoList.rows[0].todolist_id;

      // Create the new overview page
      const newOverviewPage = await pool.query(
         `INSERT INTO overview (title, notes, todolist_id, user_id) VALUES ('Overview', '', '${todolist_id}', '${newUser.rows[0].user_id}') RETURNING *`
      );

      response.json(newUser);
   } catch (error) {
      response.status(500).json({ error });
   }
};

// Login with an existing user
export const loginUser = async (request, response) => {
   try {
      const { email, password } = request.body;
      const { validationErrors, isValid } = validateLogin(request.body);

      // Validate information
      if (!isValid) {
         response.status(400).json({ msg: validationErrors });
      }

      // Check if user exists
      const user = await pool.query(`SELECT * FROM users WHERE email = '${email}'`);
      if (user.rowCount === 0) {
         response.status(404).json({ msg: ['Email not found'] });
      }

      // Compare and check if passwords match (hashed via bcrypt)
      const passwordMatch = await bcrypt.compare(password, user.rows[0].password);

      // If passwords match respond with jwt signed jwt token
      if (passwordMatch) {
         const payload = {
            id: user.rows[0].user_id,
            animal: user.rows[0].animal,
            username: user.rows[0].username,
         };

         // Sign jwt token (lasts 8 hours (28800 seconds))
         const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 28800 });
         response.json({ success: true, token: `Bearer ${token}` });
      } else {
         // If passwords do no match return an error message
         response.status(400).json({ msg: ['Incorrect password'] });
      }
   } catch (error) {
      response.status(500).json({ error });
   }
};

export const isValidToken = async (request, response) => {
   try {
      // Check if token is provided in request
      let token = request.header('Authorization');
      if (!token) return response.json(false);

      // Remove "Bearer " if it is present in the string
      if (token.slice(0, 6) === 'Bearer') token = token.slice(7).trim();
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      if (!verified) return response.json(false);

      // If no user matched the id found in the token payload return false
      const user = await pool.query(`SELECT * FROM users WHERE user_id = '${verified.id}'`);
      if (user.rowCount === 0) return response.json(false);

      return response.json(true);
   } catch (error) {
      response.status(500).json(false);
   }
};
