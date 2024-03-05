import React, { useState } from 'react';

const MovieSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Trigger search when Enter is pressed
      onSearch(searchTerm);
    } else if (e.key === 'Backspace' && searchTerm === '') {
      // Handle backspace to bring back the full movie list
      onSearch('');
    }
  };

  return (
    <input
      type="text"
      placeholder="Search movies..."
      value={searchTerm}
      onChange={handleSearchChange}
      onKeyPress={handleKeyPress}
    />
  );
};

export default MovieSearch;