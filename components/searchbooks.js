import React, { useState } from 'react';
import axios from 'axios';

const SearchBooks = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  const searchBooks = async () => {
    if (!query) return;
    const url = `https://openlibrary.org/search.json?q=${query}`;

    try {
      const response = await axios.get(url);
      setBooks(response.data.docs);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addBookToLibrary = async (book) => {
    const newBook = {
      title: book.title,
      author: book.author_name ? book.author_name.join(', ') : 'Unknown',
      year: book.first_publish_year || 'Unknown',
      description: book.description || 'No description available',
    };

    try {
      await axios.post('http://localhost:5000/api/books', newBook);
      alert('Book added to library');
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div>
      <h1>Search Books</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search books"
      />
      <button onClick={searchBooks}>Search</button>
      <div id="results">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.key} className="book">
              <h3>{book.title}</h3>
              <p>Author: {book.author_name ? book.author_name.join(', ') : 'Unknown'}</p>
              <p>First Published Year: {book.first_publish_year || 'Unknown'}</p>
              <p>Description: {book.description || 'No description available'}</p>
              <button onClick={() => addBookToLibrary(book)}>Add to Library</button>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchBooks;
