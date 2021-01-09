import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import api from '../../services/movies-api';
import s from './Form.module.css';
import MoviesList from '../MoviesList/MoviesList';

export default function Form() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const history = useHistory();
  const location = useLocation();

  const handleChangeForm = ({ target }) => {
    const { name, value } = target;
    switch (name) {
      case 'searchQuery':
        setSearchQuery(value);
        break;
      default:
        return;
    }
  };
  const handleFormSubmite = e => {
    e.preventDefault();
    api
      .fetchMovieWithQuery(searchQuery)
      .then(request => setMovies(request.results));
    history.push({
      ...location,
      search: `query=${searchQuery}`,
    });
    formReset();
  };
  useEffect(() => {
    if (location.search === '') {
      return;
    }
    setQuery(location.search);
  }, [location.search]);

  useEffect(() => {
    if (!query) {
      return;
    }
    api.fetchMovieListAgain(query).then(request => setMovies(request.results));
  }, [query]);

  const formReset = () => {
    setSearchQuery('');
  };

  return (
    <>
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={handleFormSubmite}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>
          <input
            className={s.SearchFormInput}
            type="text"
            name="searchQuery"
            value={searchQuery}
            onChange={handleChangeForm}
            placeholder="Search film by query"
          />
        </form>
      </header>
      {movies && <MoviesList movies={movies} />}
    </>
  );
}
