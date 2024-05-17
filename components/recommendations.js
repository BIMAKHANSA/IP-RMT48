import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/recommendations');
        setRecommendations(res.data);
      } catch (err) {
        console.error('Error fetching recommendations', err);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div>
      <h2>Recommended Books</h2>
      <ul>
        {recommendations.map((book) => (
          <li key={book._id}>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;