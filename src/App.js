import logo from './logo.svg';
import './App.css';
import { Container, CssBaseline, Paper, Pagination, Badge } from '@mui/material';
import MovieSearch from './MovieSearch.jsx';
import React, { useState, useEffect } from 'react';
import Movies from './Movies.jsx';

function App() {
  const moviesPerPage = 12;
  const [filteredMovies, setFilteredMovies] = useState(Movies.list);
  const [currentPage, setCurrentPage] = useState(1);
  const [backgroundHeight, setBackgroundHeight] = useState('auto');
  const [visitorCount, setVisitorCount] = useState(() => {
    return parseInt(localStorage.getItem('visitorCount')) || 0;
  });

  useEffect(() => {
    const isFirstVisit = localStorage.getItem('firstVisit') === null;

    if (isFirstVisit) {
      setVisitorCount((prevCount) => prevCount + 1);
      localStorage.setItem('firstVisit', 'true');
    }
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = Movies.list.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredMovies(filtered);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleMovieSelection = () => {
    incrementVisitorCount(); // Increment visitor count only when a movie is selected
  };

  const incrementVisitorCount = () => {
    setVisitorCount((prevCount) => {
      const newCount = prevCount + 1;
      localStorage.setItem('visitorCount', newCount);
      return newCount;
    });
  };

  useEffect(() => {
    const numMovies = filteredMovies.length;
    const minHeight = 1000;
    const responsiveFactor = window.innerWidth < 600 ? 120 : 120;

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
            <Badge badgeContent={visitorCount} color="secondary">
              <span>Viewers</span>
            </Badge>
            <MovieSearch onSearch={handleSearch} />
          </header>
          <div className="movies-container">
            {currentMovies.map((movie, index) => (
              <div key={index} className="Movie-container" onClick={handleMovieSelection}>
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
