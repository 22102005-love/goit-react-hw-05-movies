import { useState, useEffect } from 'react';
import api from '../../services/movies-api.js';
import MoviesList from '../MoviesList/MoviesList';

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    api.fetchTrendingMovies().then(request => setMovies(request.results));
  }, []);

  return (
    <div>
      <h1>Trending Today</h1>
      {movies && <MoviesList movies={movies} />}
    </div>
  );
}
