import logo from './logo.svg';
import './App.css';
import { Container, CssBaseline, Paper } from '@mui/material';
import SchindlersListImage from './SchndilersList.jpg';
import TheBucketListImage from './TheBucketList.jpg';


const playMovie = (url) => {
  window.open(url, '_blank'); // Opens the movie in a new window
};

const movies = [
  {
    title: 'Schindlers List',
    image: require('./SchndilersList.jpg'), // Replace with actual image path
    url: 'https://youtu.be/d6_sxkfjUVk', // Replace with actual GitHub raw video URL
  },
  {
    title: 'The Bucket List',
    image: require('./TheBucketList.jpg'), // Replace with actual image path
    url: 'https://youtu.be/8Iq4x6aYDs0', // Replace with actual GitHub raw video URL
  },
  // Add more movie objects as needed
];
function App() {
  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Paper elevation={0} className="background-paper">
        <header className="App-header">
          {movies.map((movie, index) => (
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
        </header>
      </Paper>
    </Container>
  );
}

export default App;
