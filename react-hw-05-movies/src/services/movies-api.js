const apiKey = 'd8bfbf0ebd448b3f15aa44db99e5738b';

const fetchTrendingMovies = () => {
  const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;
  return fetch(url).then(response => response.json());
};
const fetchGetMovieDetails = movieId => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;
  return fetch(url).then(response => response.json());
};
const fetchActorsCast = movieId => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`;
  return fetch(url).then(response => response.json());
};
const fetchMovieReviws = movieId => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}&language=en-US&page=1`;
  return fetch(url).then(response => response.json());
};
const fetchMovieWithQuery = searchQuery => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchQuery}&page=1&include_adult=false`;
  return fetch(url).then(response => response.json());
};
const fetchMovieListAgain = query => {
  const url = `https://api.themoviedb.org/3/search/movie${query}&language=en-US&api_key=${apiKey}&page=1&include_adult=false`;
  return fetch(url).then(response => response.json());
};

const api = {
  fetchTrendingMovies,
  fetchGetMovieDetails,
  fetchActorsCast,
  fetchMovieReviws,
  fetchMovieWithQuery,
  fetchMovieListAgain,
};
export default api;
