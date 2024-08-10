import React, { useEffect, useState } from 'react'
import MoviesList from '../../components/MoviesList/MoviesList';
import { fetchTrendingMovies } from '../../services/api';
import s from './HomePage.module.css'
const HomePage = () => {

    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchTrendingMovies();
                setMovies(data);
            } catch (error) {
                setError('Error fetching trending movies. Please try again later.');
            }
        };

        getData();
    }, []);

    return (
        <div>
            <h2 className={s.title}>The most current movies:</h2>
            {error ? <p>{error}</p> : <MoviesList movies={movies} />}
        </div>
    );
}

export default HomePage;




