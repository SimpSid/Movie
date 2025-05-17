import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  CssBaseline,
  Paper,
  Pagination,
  Badge,
} from "@mui/material";
import MovieSearch from "./MovieSearch.jsx";
import Movies from "./Movies.jsx";
import MusicPlayer from "./MusicPlayer";
import { AnimatePresence, motion } from "framer-motion";
import SoundCloudPlayer from "./SoundCloudPlayer.jsx";

// 🔁 Dynamically import all .jpg/.jpeg/.png images from ./Images
const importAllImages = (requireContext) => {
  return requireContext.keys().map((key) => `url(${requireContext(key)})`);
};

const backgroundImages = importAllImages(
  require.context("./Images", false, /\.(jpg|jpeg|png)$/)
);

function App() {
  const moviesPerPage = 12;
  const [filteredMovies, setFilteredMovies] = useState(Movies.list);
  const [currentPage, setCurrentPage] = useState(1);
  const [backgroundHeight, setBackgroundHeight] = useState("auto");
  const [visitorCount, setVisitorCount] = useState(() => {
    return parseInt(localStorage.getItem("visitorCount")) || 0;
  });

  // For crossfade background
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
  const [fadeBackground, setFadeBackground] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const isFirstVisit = localStorage.getItem("firstVisit") === null;

    if (isFirstVisit) {
      setVisitorCount((prevCount) => prevCount + 1);
      localStorage.setItem("firstVisit", "true");
    }
  }, []);

  useEffect(() => {
    const numMovies = filteredMovies.length;
    const minHeight = 1000;
    const responsiveFactor = window.innerWidth < 600 ? 120 : 120;

    const calculatedHeight = Math.max(
      minHeight,
      moviesPerPage * responsiveFactor
    );
    setBackgroundHeight(`${calculatedHeight}px`);
  }, [filteredMovies]);

  // 🔁 Background rotation every 10 seconds with crossfade effect
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentBackgroundIndex + 1) % backgroundImages.length;

      // Trigger fade in of next background
      setFadeBackground(backgroundImages[nextIndex]);

      // After fade duration, switch main background and reset fade
      timeoutRef.current = setTimeout(() => {
        setCurrentBackgroundIndex(nextIndex);
        setFadeBackground(null);
      }, 2000); // 2s fade duration matches CSS transition
    }, 10000); // 10 seconds per your existing interval

    return () => {
      clearInterval(interval);
      clearTimeout(timeoutRef.current);
    };
  }, [currentBackgroundIndex]);

  const handleSearch = (searchTerm) => {
    const filtered = Movies.list.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleMovieSelection = () => {
    incrementVisitorCount();
  };

  const incrementVisitorCount = () => {
    setVisitorCount((prevCount) => {
      const newCount = prevCount + 1;
      localStorage.setItem("visitorCount", newCount);
      return newCount;
    });
  };

  const startIndex = (currentPage - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const currentMovies = filteredMovies.slice(startIndex, endIndex);

  return (
    <div className="App">
      <SoundCloudPlayer />
      <Paper
        elevation={0}
        className="background-paper"
        style={{
          height: backgroundHeight,
          backgroundImage: backgroundImages[currentBackgroundIndex],
        }}
      >
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          <header className="App-header">
            <Badge badgeContent={visitorCount} color="secondary">
              <span>Viewers</span>
            </Badge>
            <MovieSearch onSearch={handleSearch} />
          </header>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              className="movies-container"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              {currentMovies.map((movie, index) => (
                <div
                  key={index}
                  className="Movie-container"
                  onClick={handleMovieSelection}
                >
                  <img
                    src={movie.image}
                    className="Movie-image"
                    alt={movie.title}
                    onClick={() => Movies.playMovie(movie.url)}
                  />
                  <p className="Movie-title">{movie.title}</p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="pagination-container">
            <Pagination
              count={Math.ceil(filteredMovies.length / moviesPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              className="pagination"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "blue", // Pagination number color
                  fontWeight: "light",
                },
              }}
            />
          </div>
        </Container>
      </Paper>
    </div>
  );
}

export default App;
