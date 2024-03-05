import logo from './logo.svg';
import './App.css';
import { Container, CssBaseline, Paper } from '@mui/material';
import MovieSearch from './MovieSearch.jsx';
import React, { useState, useEffect } from 'react';

const playMovie = (url) => {
  window.open(url, '_blank'); // Opens the movie in a new window
};

const movies = [
  {
    title: 'Schindlers List',
    image: require('./SchndilersList.jpg'), // Replace with actual image path
    url: 'https://mega.nz/file/VT8TCKiK#KyB51V9-SlkNZ9zH_KA4htTQQ8JhxxZGaAInfUqQW_w', // Replace with actual GitHub raw video URL
  },
  {
    title: 'The Bucket List',
    image: require('./TheBucketList.jpg'), // Replace with actual image path
    url: 'https://mega.nz/file/ZaF3UAIZ#Nl4Y4aGzFHRxBUFa7nFogDMD13q5iyRKWhqXacmFs7Y', // Replace with actual GitHub raw video URL
  },
  {
    title: 'Oppenheimer',
    image: require('./Oppenheimer.jpg'), // Replace with actual image path
    url: 'https://mega.nz/file/pXMHnIaT#WZTzxk5Dvf0ShNuawd_4ljO1AR67c4JcJHu6NIVF8F0', // Replace with actual GitHub raw video URL
  },
  {
    title: 'Moneyball',
    image: require('./MoneyBall.jpg'), // Replace with actual image path
    url: 'https://mega.nz/file/lK1VmCwA#CAl1SmK4saryR59modqbMRtIf32JMlQnnUGV3jY_5Z0', // Replace with actual GitHub raw video URL
  },
  {
    title: 'One Flew Over the Cuckoos Nest',
    image: require('./cukkosNest.jpg'), // Replace with actual image path
    url: 'https://mega.nz/file/NHkQWQwB#uIz2irRFkxvaXjW8TtvgaXiSaVk89jGH0Y0CedrT-BM', // Replace with actual GitHub raw video URL
  },
  {
    title: 'Sound of Metal',
    image: require('./SoundOfMetal.jpg'), // Replace with actual image path
    url: 'https://mega.nz/file/Va8zWQAD#hdDsGNtroRrHNaacA-NpCz879hS3oNQtNnr62kFUcHo', // Replace with actual GitHub raw video URL
  },
  {
    title: '1917',
    image: require('./1917.jpg'), // Replace with actual image path
    url: 'https://mega.nz/file/MP1Q3AKC#aNP3SQWjXaYj0sOgaE3vqjwcAKrNqgTzU3rMpxM8Avg', // Replace with actual GitHub raw video URL
  },
  {
    title: 'Fight Club',
    image: require('./fightclub.png'),// Replace with actual image path
    url: 'https://mega.nz/file/5PUBzL4B#ndxqhMFKFrEWMdRVNOJV4Oc9wQU9GU3Pv8efRsniH4o', // Replace with actual GitHub raw video URL
  },
  {
    title: 'GOOD WILL HUNTING',
    image: require('./goodwillhunting.webp'), // Replace with actual image path
    url: 'https://mega.nz/file/xW0mxRCT#AJ897uoapsnj73Pl5WBW_tuDwychyCQwnxRGeF6X9PA', // Replace with actual GitHub raw video URL
  },
  {
    title: 'Superbad',
    image: require('./Superbad.jpg'), // Replace with actual image path
    url: 'https://mega.nz/file/9eFQFQbD#QOZb5EOqNmNZ3_2LtmD2fbYu9SFA59lgVSiQVok2pKY', // Replace with actual GitHub raw video URL
  },
  // Add more movie objects as needed
];

function App() {
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [backgroundHeight, setBackgroundHeight] = useState('auto');

  const handleSearch = (searchTerm) => {
    // Filter movies based on the search term
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredMovies(filtered);
  };

  useEffect(() => {
    // Calculate the background height based on the number of movies
    const numMovies = filteredMovies.length;
    const minHeight = 1000; // Set a minimum height
    const calculatedHeight = Math.max(minHeight, numMovies * 150); // Adjust the factor as needed

    setBackgroundHeight(`${calculatedHeight}px`);
  }, [filteredMovies]);

  return (
    <div className="App">
      <Paper elevation={0} className="background-paper" style={{ height: backgroundHeight }}>
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          <header className="App-header">
            <MovieSearch onSearch={handleSearch} />
          </header>
          <div className="movies-container">
            {filteredMovies.map((movie, index) => (
              <div key={index} className="Movie-container">
                <img
                  src={movie.image}
                  className="Movie-image"
                  alt={movie.title}
                  onClick={() => playMovie(movie.url)}
                />
                <p className="Movie-title">{movie.title}</p>
              </div>
            ))}
          </div>
        </Container>
      </Paper>
    </div>
  );
}

export default App;