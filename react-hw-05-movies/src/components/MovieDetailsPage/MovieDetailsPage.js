import { useState, useEffect, lazy, Suspense } from 'react';
import {
  Route,
  useParams,
  Link,
  useHistory,
  useLocation,
  Switch,
} from 'react-router-dom';
import api from '../../services/movies-api';
import s from './MovieDetailsPage.module.css';
const Cast = lazy(() => import('../Cast/Cast'));
const Reviews = lazy(() => import('../Reviews/Reviews'));

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [actors, setActors] = useState([]);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    if (!movieId) {
      return;
    }
    api.fetchGetMovieDetails(movieId).then(request => setMovie(request));
    api.fetchActorsCast(movieId).then(request => setActors(request.cast));
    api.fetchMovieReviws(movieId).then(request => setReviews(request.results));
  }, [movieId]);

  const history = useHistory();
  const location = useLocation();

  const handleGoBack = () => {
    // console.log(location.state.from);
    history.push(location.state.from);
  };

  return (
    <div>
      {movie && (
        <>
          <button type="button" onClick={handleGoBack} className={s.button}>
            Go back
          </button>
          <div className={s.movieDetailWrapper}>
            <img
              src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
              alt={movie.original_title}
            />
            <div className={s.informationWrapper}>
              <h2>{movie.original_title}</h2>
              <p className={s.informationPoint}>
                User Score: {movie.vote_average}
              </p>
              <p className={s.informationPoint}>
                Overview:
                <br />
                {movie.overview}
              </p>
              <p className={s.informationPoint}>
                Genres: {movie.genres.map(genre => genre.name).join(', ')}
              </p>
            </div>
          </div>
          <hr />
          <div>
            <h3>Additional information</h3>
            <ul>
              <li>
                <Link
                  to={{
                    pathname: `/movies/${movieId}/cast`,
                    state: { from: location.state.from },
                  }}
                  className={s.link}
                >
                  Cast
                </Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname: `/movies/${movieId}/reviews`,
                    state: { from: location.state.from },
                  }}
                  className={s.link}
                >
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
          <hr />
          <Suspense fallback={<p>Загружаем...</p>}>
            <Switch>
              <Route path="/movies/:movieId/cast">
                {actors && <Cast actors={actors} />}
              </Route>
              <Route path="/movies/:movieId/reviews">
                <Reviews reviews={reviews} />
              </Route>
            </Switch>
          </Suspense>
        </>
      )}
    </div>
  );
}
