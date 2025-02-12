import React, { useState } from 'react';
import axios from 'axios';

const ModeSelector = ({ onModeSelected }) => {
  const [mode, setMode] = useState('');

  const handleModeChange = (e) => {
    setMode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/mode', { mode });
      console.log('Mode selected:', response.data);
      onModeSelected(mode);
    } catch (error) {
      console.error('Error selecting mode:', error);
    }
  };

  return (
    <div>
      <h1>Select Mode</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="radio"
            value="chat"
            checked={mode === 'chat'}
            onChange={handleModeChange}
          />
          Chat Mode
        </label>
        <label>
          <input
            type="radio"
            value="auto"
            checked={mode === 'auto'}
            onChange={handleModeChange}
          />
          Autonomous Mode
        </label>
        <button type="submit">Start</button>
      </form>
    </div>
  );
};

export default ModeSelector;