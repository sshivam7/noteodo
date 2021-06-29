import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { pool } from './db';

// Passport configuration
const opts = {
   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
   secretOrKey: process.env.JWT_SECRET,
};

module.exports = (passport) => {
   try {
      passport.use(
         new Strategy(opts, async (payload, done) => {
            const user = await pool.query(`SELECT * FROM users WHERE user_id = '${payload.id}'`);
            if (user.rowCount > 0) {
               return done(null, user.row[0]);
            }
            return done(null, false);
         })
      );
   } catch (error) {
      console.error(error);
   }
};
