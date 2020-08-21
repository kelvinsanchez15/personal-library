const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
const Book = require('../models/book');

beforeEach(async () => {
  await Book.deleteMany();
});

afterAll(async () => {
  // Closing the DB connection allows Jest to exit successfully.
  await mongoose.connection.close();
});

describe('Functional Test', () => {
  test('testing tests', async () => {
    const response = await request(app)
      .post('/api/books')
      .send({ title: 'The Way of Kings' });
    expect(response.status).toBe(201);
  });
});
