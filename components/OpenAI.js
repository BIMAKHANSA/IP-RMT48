import React, { useState } from 'react';
import axios from 'axios';

const MyComponent = () => {
  const [response, setResponse] = useState('');

  const callOpenAI = async () => {
    try {
      const apiKey = 'YOUR_API_KEY';
      const data = {
        prompt: 'This is a test prompt',
        max_tokens: 50,
        temperature: 0.7
      };
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      };

      const result = await axios.post('https://api.openai.com/v1/completions', data, { headers });
      setResponse(result.data.choices[0].text);
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
    }
  };

  return (
    <div>
      <button onClick={callOpenAI}>Generate Text</button>
      <p>{response}</p>
    </div>
  );
};

export default MyComponent;