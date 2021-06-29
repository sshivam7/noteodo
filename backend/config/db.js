const Pool = require('pg').Pool;

export const pool = new Pool({
   user: 'postgres',
   password: 'T@gg3rbeth',
   host: 'localhost',
   port: 5432,
   database: 'noteodo_db',
});
