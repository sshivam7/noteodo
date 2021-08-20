const server = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
chai.use(chaiHttp);
import 'regenerator-runtime/runtime';

// Run after user tests
require('./users.test.js');

let page1, page2 = 0;

describe('POST /pages/createPage', () => {
   it('Create new page for current user', (done) => {
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

            const page = {
               title: 'Test page',
               notes: 'Test note',
               pinned: false,
            };

            chai
               .request(server)
               .post('/pages/createPage')
               .set('Authorization', `${resToken}`)
               .send(page)
               .end((err, res) => {
                  expect(res).to.have.status(200);
                  expect(res.body.rows[0].title).to.equals('Test page');
                  expect(res.body.rows[0].notes).to.equals('Test note');
                  expect(res.body.rows[0].pinned).to.equals(false);
                  page1 = res.body.rows[0].page_id;
               });
            done();
         });
   });

   it('Create a second page', (done) => {
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

            const page = {
               title: 'Test page 2',
               notes: 'Test note 2',
               pinned: true,
            };

            chai
               .request(server)
               .post('/pages/createPage')
               .set('Authorization', `${resToken}`)
               .send(page)
               .end((err, res) => {
                  expect(res).to.have.status(200);
                  expect(res.body.rows[0].title).to.equals('Test page 2');
                  expect(res.body.rows[0].notes).to.equals('Test note 2');
                  expect(res.body.rows[0].pinned).to.equals(true);
                  page2 = res.body.rows[0].page_id;
               });
            done();
         });
   });
});

describe('GET /pages/', () => {
   it('Get all pages for current user', (done) => {
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
               .get('/pages/')
               .set('Authorization', `${resToken}`)
               .end((err, res) => {
                  expect(res).to.have.status(200);
                  expect(res.body.rowCount).to.equals(2);
               });
            done();
         });
   });

   it('Get a specific page by id (1st page)', (done) => {
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
               .get('/pages/' + page1)
               .set('Authorization', `${resToken}`)
               .end((err, res) => {
                  expect(res).to.have.status(200);
                  expect(res.body.rows[0].title).to.equals('Test page');
                  expect(res.body.rowCount).to.equals(1);
               });
            done();
         });
   });

   it('Get a specific page by id (2nd page)', (done) => {
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
               .get('/pages/' + page2)
               .set('Authorization', `${resToken}`)
               .end((err, res) => {
                  expect(res).to.have.status(200);
                  expect(res.body.rows[0].title).to.equals('Test page 2');
                  expect(res.body.rowCount).to.equals(1);
               });
         });
      done();
   });
});
