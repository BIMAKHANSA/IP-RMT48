import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await axios.get('http://localhost:5000/api/books');
      setBooks(res.data);
    };
    fetchBooks();
  }, []);

  const deleteBook = async (id) => {
    await axios.delete(`http://localhost:5000/api/books/${id}`);
    setBooks(books.filter((book) => book._id !== id));
  };

  return (
    <div>
      <h1>Books</h1>
      <Link to="/search">Search Books</Link> {/* Add this link */}
      <Link to="/add">Add Book</Link>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <Link to={`/edit/${book._id}`}>{book.title}</Link>
            <button onClick={() => deleteBook(book._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Books;