import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await axios.get('http://localhost:5000/api/books');
      setBooks(res.data);
    };
    fetchBooks();
  }, []);
  
  const searchBooks = async () => {
    const res = await axios.get(`http://localhost:5000/api/books/seed/${query}`);
    setBooks(res.data);
  };
  
  const deleteBook = async (id) => {
    await axios.delete(`http://localhost:5000/api/books/${id}`);
    setBooks(books.filter((book) => book._id !== id));
  };

  const toggleFavorite = async (id) => {
    const res = await axios.put(`http://localhost:5000/api/books/${id}/favorite`);
    setBooks(books.map((book) => (book._id === id ? res.data : book)));
  };


  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Books</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search books"
      />
      <button onClick={searchBooks}>Search</button>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter books"
      />
      <Link to="/add">Add Book</Link>
      <ul>
        {filteredBooks.map((book) => (
          <li key={book._id}>
            <Link to={`/edit/${book._id}`}>{book.title}</Link>
            <button onClick={() => deleteBook(book._id)}>Delete</button>
            <button onClick={() => toggleFavorite(book._id)}>
              {book.favorite ? 'Unfavorite' : 'Favorite'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Books;
