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
    title: 'American Psycho',
    image: require('./AmericanPsycho.jpg'), // Replace with actual image path
    url: 'https://mega.nz/file/Qa9ADCRa#WkxD7OFI9GBnDcyUkBf4sqxudha49ldUTdkk5i2ouro', // Replace with actual GitHub raw video URL
  },
  {
    title: 'The Grand Budapest',
    image: require('./GrandBudapest.jpg'), // Replace with actual image path
    url: 'https://mega.nz/file/sDF1xTiD#MLU6nrGHzYCnqPCofcpeSoKc-LSzhsaji7Pmophu1Uk', // Replace with actual GitHub raw video URL
  },
  {
    title: 'Gone Girl',
    image: require('./GoneGirl.jpg'), // Replace with actual image path
    url: 'https://mega.nz/file/ta0nUITD#Ji45gbNnECDcq7ICKY0Rehp5wkk96AoWWt-kBq6Sx6I', // Replace with actual GitHub raw video URL
  },
  {
    title: 'The Taxi Driver',
    image: require('./TaxiDriver.webp'), // Replace with actual image path
    url: 'https://mega.nz/file/5OEBDAIR#tvBHXHfKHDCkA7q6ECsL6HHwo8mUi_Bt_yKUsLIFWnA', // Replace with actual GitHub raw video URL
  },
  {
    title: 'Prisoners',
    image: require('.//Prisoners.jpg'), // Replace with actual image path
    url: 'https://mega.nz/file/4XtSEBTK#Y3GG2bVqpuEYe9yL5ZhcDjYqVFIzv6D_tUlt1GrXTYo', // Replace with actual GitHub raw video URL
  },
  {
    title: 'The Shining',
    image: require('./TheShining.jpg'), // Replace with actual image path
    url: 'https://mega.nz/file/Ae1zjSxR#ox7gSDGaKmQXEDnlQWnOwc9hhGSTompdlwkGJ3DxLV8', // Replace with actual GitHub raw video URL
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
    title: 'Oppenheimer',
    image: require('./Oppenheimer.jpg'), // Replace with actual image path
    url: 'https://mega.nz/file/pXMHnIaT#WZTzxk5Dvf0ShNuawd_4ljO1AR67c4JcJHu6NIVF8F0', // Replace with actual GitHub raw video URL
  },
  {
    title: 'The Big Short',
    image: require('./BigShort.jpg'), // Replace with actual image path
    url: 'https://mega.nz/file/1KFV1IzC#daxmsSbGEQ_EcAFn-MeRLueQavLwavEt_CpxmKXvrFY', // Replace with actual GitHub raw video URL
  },
  {
    title: 'Into the Wild',
    image: require('./IntoTheWild.jpg'), // Replace with actual image path
    url: 'https://mega.nz/file/NfUnxQ7J#d7LJcJAxJI0LE15gtCqVa4LVuoU6KTcgfZ6aOnXrn4U', // Replace with actual GitHub raw video URL
  },
  {
    title: 'Whiplash',
    image: require('./Whiplash.jpg'), // Replace with actual image path
    url: 'https://mega.nz/file/5f1xyTIK#XdIcQJ4IaMs_70PHu4oDVEWm059Z_Qk04QS07VyufY4', // Replace with actual GitHub raw video URL
  },
  {
    title: 'Wolf of Walll Street',
    image: require('./WolfOfWallStreet.jpg'), // Replace with actual image path
    url: 'https://mega.nz/file/padyyb6B#M85w9eYgU1LnQowXAS_Kkk6R0cwXX9JumXvhWdWoKA0', // Replace with actual GitHub raw video URL
  },
  {
    title: 'Moneyball',
    image: require('./MoneyBall.jpg'), // Replace with actual image path
    url: 'https://mega.nz/file/lK1VmCwA#CAl1SmK4saryR59modqbMRtIf32JMlQnnUGV3jY_5Z0', // Replace with actual GitHub raw video URL
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
    // Calculate the background height based on the number of movies and screen height
    const numMovies = filteredMovies.length;
    const minHeight = 1000; // Set a minimum height
    const responsiveFactor = window.innerWidth < 600 ? 100 : 120; // Adjust the factor based on screen width
  
    const calculatedHeight = Math.max(minHeight, numMovies * responsiveFactor);
  
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