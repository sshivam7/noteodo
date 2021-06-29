const server = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
chai.use(chaiHttp);
import 'regenerator-runtime/runtime';

describe('POST /user/register', () => {
   it('Register a new user', (done) => {
      const user = {
         username: 'Test User',
         password: '123456',
         passwordCheck: '123456',
         email: 'testuser@random.com',
         animal: 'cat'
      };
      chai
         .request(server)
         .post('/user/register')
         .send(user)
         .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.rows[0].username).to.equals('Test User');
            expect(res.body.rows[0].email).to.equals('testuser@random.com');
            done();
         });
   });

   it('Registration failed due to existing username', (done) => {
      const user = {
         username: 'Test User',
         password: '123456',
         passwordCheck: '123456',
         email: 'newuser@random.com',
         animal: 'cat'
      };
      chai
         .request(server)
         .post('/user/register')
         .send(user)
         .end((err, res) => {
            expect(res).to.have.status(400);
            done();
         });
   });

   it('Registration failed due to existing email', (done) => {
      const user = {
         username: 'New User',
         password: '123456',
         passwordCheck: '123456',
         email: 'testuser@random.com',
         animal: 'cat'
      };
      chai
         .request(server)
         .post('/user/register')
         .send(user)
         .end((err, res) => {
            expect(res).to.have.status(400);
            done();
         });
   });

   it('Register another user', (done) => {
      const user = {
         username: 'New User',
         password: '123456',
         passwordCheck: '123456',
         email: 'newuser@random.com',
         animal: 'cat'
      };
      chai
         .request(server)
         .post('/user/register')
         .send(user)
         .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.rows[0].username).to.equals('New User');
            expect(res.body.rows[0].email).to.equals('newuser@random.com');
            done();
         });
   });
});

describe('POST /user/login', () => {
   it('Login an existing user', (done) => {
      const user = {
         email: 'testuser@random.com',
         password: '123456',
      };
      chai
         .request(server)
         .post('/user/login')
         .send(user)
         .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.success).to.equals(true);
            done();
         });
   });

   it('Attempt to login a fake user (Wrong Email)', (done) => {
      const user = {
         email: 'testuser123@random.com',
         password: '123456',
      };
      chai
         .request(server)
         .post('/user/login')
         .send(user)
         .end((err, res) => {
            expect(res).to.have.status(404);
            done();
         });
   });

   it('Attempt to login a fake user (Wrong password)', (done) => {
      const user = {
         email: 'testuser@random.com',
         password: 'wrongpassword',
      };
      chai
         .request(server)
         .post('/user/login')
         .send(user)
         .end((err, res) => {
            expect(res).to.have.status(400);
            done();
         });
   });
});

describe('POST /user/isValidToken', () => {
   it('Test to check for valid token', (done) => {
      const user = {
         email: 'testuser@random.com',
         password: '123456',
      };

      let resToken = '';

      chai
         .request(server)
         .post('/user/login')
         .send(user)
         .end((err, res) => {
            expect(res).to.have.status(200);
            resToken = res.body.token;

            chai
               .request(server)
               .post('/user/isValidToken')
               .set('Authorization', `${resToken}`)
               .send()
               .end((err, res) => {
                  expect(res).to.have.status(200);
                  expect(res.body).to.equals(true);
               });
            done();
         });
   });

   it('Test to check for invalid token', (done) => {
      chai
         .request(server)
         .post('/user/isValidToken')
         .set('Authorization', `notavalidtoken`)
         .send()
         .end((err, res) => {
            expect(res).to.have.status(500);
            expect(res.body).to.equals(false);
            done();
         });
   });
});
