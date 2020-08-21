/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
const Book = require('../models/book');

const mockBook = { title: 'The Way of Kings' };
const mockComment = { comment: 'The best book ever!' };

beforeAll(async () => {
  await Book.deleteMany();
});

afterAll(async () => {
  // Closing the DB connection allows Jest to exit successfully.
  await mongoose.connection.close();
});

describe('Functional Tests', () => {
  describe('POST /api/books with title => create book object/expect book object', () => {
    test('Test POST /api/books with title', async () => {
      const response = await request(app).post('/api/books').send(mockBook);
      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(mockBook);
    });

    test('Test POST /api/books with no title given', async () => {
      const response = await request(app)
        .post('/api/books')
        .send({ title: '' });
      expect(response.status).toBe(400);
      expect(response.text).toBe('missing title');
    });
  });

  describe('GET /api/books => array of books', () => {
    test('Test GET /api/books', async () => {
      const response = await request(app).get('/api/books');
      expect(response.status).toBe(200);
      expect(response.body[0]).toHaveProperty('_id');
      expect(response.body[0]).toHaveProperty('title');
      expect(response.body[0]).toHaveProperty('commentcount');
    });
  });

  describe('GET /api/books/[id] => book object with [id]', () => {
    test('Test GET /api/books/[id] with id not in db', async () => {
      const response = await request(app).get(
        '/api/books/5f4025b7007fa826bc13a525'
      );
      expect(response.status).toBe(404);
      expect(response.text).toBe('no book exists');
    });

    test('Test GET /api/books/[id] with valid id in db', async () => {
      const book = await Book.findOne();

      const response = await request(app).get(`/api/books/${book._id}`);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(mockBook);
    });
  });

  describe('POST /api/books/[id] => add comment/expect book object with id', () => {
    test('Test POST /api/books/[id] with comment', async () => {
      const book = await Book.findOne();

      const response = await request(app)
        .post(`/api/books/${book._id}`)
        .send(mockComment);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('_id');
      expect(response.body).toHaveProperty('title');
      expect(response.body).toHaveProperty('comments', [mockComment.comment]);
    });
  });
});
