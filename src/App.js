import React, { useEffect, useState, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import AddFilm from "./components/AddFilm";
import "./App.css";

function App() {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://swapi.dev/api/films/");

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const transformedFilms = data.results.map((film) => {
        return {
          id: film.episode_id,
          title: film.title,
          openingText: film.opening_crawl,
          releaseDate: film.release_date,
        };
      });
      setFilms(transformedFilms);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  const addFilmHandler = (film) => {
    console.log(film);
  };

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  let content = <p>No Films Found...</p>;

  if (films.length > 0) {
    content = <MoviesList movies={films} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddFilm onAddFilm={addFilmHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
