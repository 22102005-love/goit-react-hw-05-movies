import { Link, useLocation } from 'react-router-dom';
import s from './MovieList.module.css';
export default function MoviesList({ movies }) {
  const location = useLocation();

  return (
    <ul>
      {movies.map(movie => (
        <li key={movie.id} className={s.link}>
          <Link
            to={{
              pathname: `movies/${movie.id}`,
              state: { from: location },
            }}
          >
            {movie.original_title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
