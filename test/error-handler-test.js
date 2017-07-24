import express from 'express';
import bodyParser from 'body-parser';
import { notFound, errorHandler } from '../src/index';
import test from 'tape';
import request from 'supertest';

const app = express();

const { json } = bodyParser;

app.use(json());

app.use('/default-no-details', (req, res, next) => {
  process.env.NODE_ENV = 'test';
  let error = new Error('Bad Request');
  next(error);
});

app.use('/default-details', (req, res, next) => {
  process.env.NODE_ENV = 'development';
  let error = new Error('Bad Request');
  next(error);
});

app.use('/custom-no-details', (req, res, next) => {
  process.env.NODE_ENV = 'test';
  let error = new Error('Bad Request');
  error.status = 400;
  next(error);
});

app.use('/custom-details', (req, res, next) => {
  process.env.NODE_ENV = 'development';
  let error = new Error('Bad Request');
  error.status = 400;
  next(error);
});

app.use(notFound);

app.use(errorHandler);

test('error handler | default | no details', (t) => {
  t.plan(3);
  request(app)
    .get('/default-no-details')
    .expect(500)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.equal(res.status, 500, 'sets default status code');
      t.equal(res.body.message, 'Bad Request', 'sets body.message');
      t.equal(res.body.details, null, 'Does not set body.details');
    });
});

test('error handler | default | details', (t) => {
  t.plan(3);
  request(app)
    .get('/default-details')
    .expect(500)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.equal(res.status, 500, 'sets default status code');
      t.equal(res.body.message, 'Bad Request', 'sets body.message');
      t.notEqual(res.body.details, null, 'sets body.details');
    });
});

test('error handler | custom | no details', (t) => {
  t.plan(3);
  request(app)
    .get('/custom-no-details')
    .expect(400)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.equal(res.status, 400, 'sets status code');
      t.equal(res.body.message, 'Bad Request', 'sets body.message');
      t.equal(res.body.details, null, 'does not set body.details');
    });
});

test('error handler | custom | details', (t) => {
  t.plan(3);
  request(app)
    .get('/custom-details')
    .expect(400)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.equal(res.status, 400, 'sets status code');
      t.equal(res.body.message, 'Bad Request', 'sets body.message');
      t.notEqual(res.body.details, null, 'sets body.details');
    });
});

test('not found handler | no details', (t) => {
  process.env.NODE_ENV = 'test';
  t.plan(3);
  request(app)
    .get('/not-exists')
    .expect(400)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.equal(res.status, 404, 'sets status code 404');
      t.equal(res.body.message, 'Not Found', 'sets body.message');
      t.equal(res.body.details, null, 'does not set body.details');
    });
});

test('not found handler | details', (t) => {
  process.env.NODE_ENV = 'development';
  t.plan(3);
  request(app)
    .get('/not-exists')
    .expect(400)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.equal(res.status, 404, 'sets status code 404');
      t.equal(res.body.message, 'Not Found', 'sets body.message');
      t.notEqual(res.body.details, null, 'sets body.details');
    });
});
