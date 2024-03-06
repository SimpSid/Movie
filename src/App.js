import logo from './logo.svg';
import './App.css';
import { Container, CssBaseline, Paper, Pagination } from '@mui/material';
import MovieSearch from './MovieSearch.jsx';
import React, { useState, useEffect } from 'react';
import Movies from './Movies.jsx';

function App() {

  const moviesPerPage = 12;
  const [filteredMovies, setFilteredMovies] = useState(Movies.list);
  const [currentPage, setCurrentPage] = useState(1);
  const [backgroundHeight, setBackgroundHeight] = useState('auto');

  const handleSearch = (searchTerm) => {
    // Filter movies based on the search term
    const filtered = Movies.list.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredMovies(filtered);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);

    // Scroll to the top of the screen
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // You can use 'auto' for instant scrolling
    });
  };

  useEffect(() => {
    // Calculate the background height based on the number of movies and screen height
    const numMovies = filteredMovies.length;
    const minHeight = 1000; // Set a minimum height
    const responsiveFactor = window.innerWidth < 600 ? 120 : 120; // Adjust the factor based on screen width

    const calculatedHeight = Math.max(minHeight, moviesPerPage * responsiveFactor);

    setBackgroundHeight(`${calculatedHeight}px`);
  }, [filteredMovies]);

  const startIndex = (currentPage - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const currentMovies = filteredMovies.slice(startIndex, endIndex);

  return (
    <div className="App">
      <Paper elevation={0} className="background-paper" style={{ height: backgroundHeight }}>
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          <header className="App-header">
            <MovieSearch onSearch={handleSearch} />
          </header>
          <div className="movies-container">
            {currentMovies.map((movie, index) => (
              <div key={index} className="Movie-container">
                <img
                  src={movie.image}
                  className="Movie-image"
                  alt={movie.title}
                  onClick={() => Movies.playMovie(movie.url)}
                />
                <p className="Movie-title">{movie.title}</p>
              </div>
            ))}
          </div>
          <div className="pagination-container">
            <Pagination
              count={Math.ceil(filteredMovies.length / moviesPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              className="pagination"
            />
          </div>
        </Container>
      </Paper>
    </div>
  );
}

export default App;