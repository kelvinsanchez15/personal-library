/* eslint-disable no-underscore-dangle */
const express = require('express');
const Book = require('../models/book');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  // ======================
  // CREATE NEW BOOK
  // ======================
  .post(async (req, res) => {
    try {
      const book = await Book.create(req.body);
      res.status(201).json({ title: book.title, _id: book._id });
    } catch (err) {
      res.status(400).send(err);
    }
  })

  // ======================
  // READ ALL BOOKS
  // ======================
  .get(async (req, res) => {
    try {
      const books = await Book.find({});
      const orderedJSON = books.map((e) => ({
        _id: e._id,
        title: e.title,
        commentcount: e.comments.length,
      }));

      res.status(200).send(orderedJSON);
    } catch (err) {
      res.status(404).send(err);
    }
  })
  // ======================
  // DESTROY ALL BOOKS
  // ======================
  .delete(async (req, res) => {
    try {
      await Book.deleteMany({});

      res.status(200).send('complete delete successful');
    } catch (err) {
      res.status(500).send(err);
    }
  });

router
  .route('/:_id')
  // ======================
  // CREATE NEW COMMENT
  // ======================
  .post(async (req, res) => {
    const bookId = req.params._id;
    const { comment } = req.body;

    try {
      const book = await Book.findByIdAndUpdate(
        bookId,
        { $push: { comments: comment } },
        {
          new: true,
          useFindAndModify: false,
        }
      );

      if (!book) res.status(404).send('no book exists');

      res
        .status(201)
        .json({ _id: book._id, title: book.title, comments: book.comments });
    } catch (err) {
      res.status(400).send(err);
    }
  })

  // ======================
  // READ BOOK
  // ======================
  .get(async (req, res) => {
    try {
      const book = await Book.findById(req.params._id);

      if (!book) res.status(404).send('no book exists');

      res
        .status(200)
        .json({ _id: book._id, title: book.title, comments: book.comments });
    } catch (err) {
      res.status(500).send(err);
    }
  })

  // ======================
  // DESTROY BOOK
  // ======================
  .delete(async (req, res) => {
    try {
      const book = await Book.findByIdAndDelete(req.params._id);

      if (!book) res.status(404).send('no book exists');

      res.status(200).send('delete successful');
    } catch (err) {
      res.status(500).send(err);
    }
  });

module.exports = router;
