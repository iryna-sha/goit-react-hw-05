import { useEffect, useState } from "react";
import MovieList from "../../components/MoviesList/MoviesList";
import { searchMovies } from "../../services/api";
import s from './MoviesPage.module.css'
import { useLocation, useSearchParams } from "react-router-dom";

const MoviesPage = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [noMovies, setNoMovies] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const queryParam = searchParams.get('query') || '';
        setQuery(queryParam);

        if (queryParam) {
            handleSearch(queryParam, false);
        }
    }, [searchParams]);

    const handleSearch = async (searchQuery, updateURL = true) => {
        if (searchQuery.trim() === '') {
            setMovies([]);
            setError(false);
            setNoMovies(true);
            return;
        }

        try {
            const results = await searchMovies(searchQuery);
            setMovies(results);
            setError(null);
            setNoMovies(false);

            if (updateURL) {
                searchParams.set('query', searchQuery);
                setSearchParams(searchParams);
            }
        } catch (error) {
            setError('Failed to fetch movies.');
            setMovies([]);
        }
    };

    const onChange = (event) => {
        const newValue = event.target.value;
        setQuery(newValue);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        handleSearch(query);
    };

    return (
        <div className={s.searchMovies}>
            <h2>Search Movies</h2>
            <form className={s.form} onSubmit={onSubmit}>
                <input
                    placeholder='Enter search movie...'
                    type='search'
                    value={query}
                    onChange={onChange}
                />
                <button type="submit">Search</button>
            </form>
            {error && <p className={s.error}>{error}</p>}
            {noMovies && !error && <p className={s.error}>Do not found movies, Please Try again!</p>}
            {movies.length > 0 && <MovieList movies={movies} />}
        </div>
    );
};

export default MoviesPage;