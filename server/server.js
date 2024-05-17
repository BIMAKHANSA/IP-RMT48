const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Koneksi ke MongoDB
mongoose.connect('mongodb://localhost:27017/booksearch', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Model
const bookSchema = new mongoose.Schema({
  title: String,
  author: [String],
  firstPublishYear: Number,
});

const Book = mongoose.model('Book', bookSchema);

// Endpoint API untuk pencarian buku
app.get('/api/books', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).send('Query is required');

  try {
    const books = await Book.find({ title: new RegExp(q, 'i') });
    res.json(books);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = mongoose;