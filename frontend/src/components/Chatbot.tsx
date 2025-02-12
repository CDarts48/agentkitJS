import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);

    try {
      console.log('Sending request to backend...');
      const response = await axios.post('http://localhost:3001/chat', { input });
      console.log('Received response from backend:', response.data);
      const botMessage = { sender: 'bot', text: response.data.response }; // Corrected line
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error('Error:', error);
    }

    setInput('');
  };

  return (
    <div>
      <h1>Chatbot</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatbot;