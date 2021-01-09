import './App.css';
import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation.js';
const HomePage = lazy(() =>
  import('./components/HomePage/HomePage' /*webpackChunkName:"homePage" */),
);
const MovieDetailsPage = lazy(() =>
  import('./components/MovieDetailsPage/MovieDetailsPage'),
);
const Form = lazy(() => import('./components/Form/Form'));
export default function App() {
  return (
    <div>
      <Navigation />
      <Suspense fallback={<p>Загружаем...</p>}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>
          <Route path="/movies">
            <Form />
          </Route>
          <Route>
            <HomePage />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}
