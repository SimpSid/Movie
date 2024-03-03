import logo from './logo.svg';
import './App.css';
import movieImage from './Movie1.jpg';

const playMovie = (url) => {
  window.open(url, '_blank'); // Opens the movie in a new window
};

const movies = [
  {
    title: 'Movie 1',
    image: require('./Movie1.jpg'), // Replace with actual image path
    url: 'https://github.com/SimpSid/Movies/blob/main/Superbad.2007.Unrated.BrRip.720p.264.YIFY.mp4', // Replace with actual GitHub raw video URL
  }
  // {
  //   title: 'Movie 2',
  //   image: require('./movie2.jpg'), // Replace with actual image path
  //   url: 'https://github.com/your-username/your-repository/raw/main/movie2.mp4', // Replace with actual GitHub raw video URL
  // },
  // Add more movie objects as needed
];
function App() {
  return (
    <div className="App">
    <header className="App-header">
      {movies.map((movie, index) => (
        <div key={index} className="Movie-container">
          <img
            src={movie.image}
            className="Movie-image"
            alt={movie.title}
            onClick={() => playMovie(movie.url)}
          />
          <p>{movie.title}</p>
        </div>
      ))}
    </header>
  </div>
);
}

export default App;
