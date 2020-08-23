const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const cors = require('cors');
const Book = require('./models/book');
require('dotenv').config();
// Routers
const apiRouter = require('./routers/api');

const app = express();

// Prevent sniff and XSS attacks.
app.use(helmet());

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Method override
app.use(methodOverride('_method'));

// Cors used for FCC testing purposes
app.use(cors({ origin: '*' }));

// Connection to the database and error handling
const url =
  process.env.NODE_ENV === 'production'
    ? process.env.DB_URI
    : 'mongodb://127.0.0.1:27017/personalLibraryDB';

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

mongoose.connection.on('error', (error) => console.log(error));

// Serving styles and scripts from public dir
app.use(express.static('public'));
// Set view engine
app.set('view engine', 'pug');

// Main route defined
app.get('/', async (req, res) => {
  try {
    let books = await Book.find({});
    if (books.length <= 0) books = null;

    res.status(200).render('index', { title: 'Personal Library', books });
  } catch (err) {
    res.status(404).send(err);
  }
});

// Routing for API
app.use('/api/books', apiRouter);

module.exports = app; // for testing
