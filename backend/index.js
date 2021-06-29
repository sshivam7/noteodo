import express from 'express';
import cors from 'cors';
import passport from 'passport';

import userRouter from './src/routes/userRouter';

require('dotenv').config();

// Express setup
const app = express();
const port = process.env.PORT || 4000;

/* MIDDLEWARE */
// cors setup
app.use(cors());
app.use(express.json());

// passport setup
app.use(passport.initialize());
require('./config/passport')(passport);

// Routes
app.use('/user', userRouter);

app.get('/', (request, response) => {
   response.send('Test');
});

app.listen(port, () => {
   console.log(`Server listening on port ${port}`);
});

module.exports = app;
