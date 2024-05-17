const express = require('express');
const router = express.Router();
const axios = require('axios');
const Book = require('../models/Book');

// Fetch books from OpenLibrary API and seed to database
router.get('/seed/:query', async (req, res) => {
  const query = req.params.query;
  try {
    const response = await axios.get(`https://openlibrary.org/search.json?q=${query}`);
    const books = response.data.docs.map((doc) => ({
      title: doc.title,
      author: doc.author_name ? doc.author_name.join(', ') : 'Unknown',
      publishedDate: doc.first_publish_year ? doc.first_publish_year.toString() : 'Unknown',
      description: doc.subject ? doc.subject.join(', ') : 'No description available',
    }));
    await Book.insertMany(books);
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Create a new book
router.post('/', async (req, res) => {
  const { title, author, publishedDate, description } = req.body;
  try {
    const newBook = new Book({ title, author, publishedDate, description });
    const book = await newBook.save();
    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add a new book
router.post('/', async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    year: req.body.year,
    description: req.body.description,
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Read all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Read a single book
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/recommendations', async (req, res) => {
  try {
    const favoriteBooks = await Book.find({ favorite: true });
    const genres = favoriteBooks.map(book => book.genre);
    const recommendations = await Book.find({ genre: { $in: genres } }).limit(10);
    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a book
router.put('/:id', async (req, res) => {
  const { title, author, publishedDate, description } = req.body;
  try {
    let book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }
    book.title = title || book.title;
    book.author = author || book.author;
    book.publishedDate = publishedDate || book.publishedDate;
    book.description = description || book.description;
    book = await book.save();
    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// Favorite a book
router.put('/:id/favorite', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    book.favorite = !book.favorite;
    await book.save();
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a book
router.delete('/:id', getBook, async (req, res) => {
  try {
    await res.book.remove();
    res.json({ message: 'Deleted Book' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getBook(req, res, next) {
  let book;
  try {
    book = await Book.findById(req.params.id);
    if (book == null) {
      return res.status(404).json({ message: 'Cannot find book' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.book = book;
  next();
}

module.exports = router;
