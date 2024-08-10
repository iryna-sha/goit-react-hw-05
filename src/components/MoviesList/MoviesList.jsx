import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import s from './MoviesList.module.css';


const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul className={s.listMovies}>
      {movies.map((movie) => (
        <li className={s.item} key={movie.id}>
          <Link to={`/movies/${movie.id}`} state={location}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <p>{movie.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  )
};

export default MovieList;

