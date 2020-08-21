const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
// Routers
const apiRouter = require('./routers/api');

const app = express();

// Prevent sniff and XSS attacks.
app.use(helmet());

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.get('/', (req, res) => res.render('index', { title: 'Personal Library' }));

// Routing for API
app.use('/api/books', apiRouter);

// Server listening
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running at port ${port}`));

module.exports = app; // for testing
