import { Suspense, lazy } from 'react';
import s from './App.module.css';
import { Route, Routes } from 'react-router-dom';
import { ThreeCircles } from 'react-loader-spinner';
import Navigation from './components/Navigation/Navigation';
// import HomePage from './pages/HomePage/HomePage';
// import MoviesPage from './pages/MoviesPage/MoviesPage';
// import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
// import MovieDetailsPage from './pages/MovieDetailsPage/MovieDetailsPage';
// import MovieCast from './components/MovieCast/MovieCast';
// import MovieReviews from './components/MovieReviews/MovieReviews';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MovieDetailsPage = lazy(() =>
  import('./pages/MovieDetailsPage/MovieDetailsPage')
);
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'));
const MovieReviews = lazy(() =>
  import('./components/MovieReviews/MovieReviews')
);

function App() {
  return (
    <>
      <Navigation />
      <Suspense
        fallback={
          <div className={s.loader}>
            <ThreeCircles
              visible={true}
              height="50"
              width="50"
              color="rgb(9, 217, 186)"
              ariaLabel="three-circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
