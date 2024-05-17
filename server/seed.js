const axios = require('axios');
const Book = require('./models/Book');

async function fetchAndSeed(query) {
  try {
    const url = `https://openlibrary.org/search.json?q=${query}`;
    const response = await axios.get(url);
    const books = response.data.docs;

    const bookPromises = books.map(book => {
      const newBook = new Book({
        title: book.title,
        author: book.author_name,
        firstPublishYear: book.first_publish_year,
      });
      return newBook.save();
    });

    await Promise.all(bookPromises);
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

fetchAndSeed('javascript');
