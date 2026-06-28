import { createContext, useContext, useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../service/api";
import { useNavigate } from "react-router-dom";

const MovieContext = createContext();

export const useMovieContext = () => {
  return useContext(MovieContext);
};

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [movieName, setMovieName] = useState([]);
  const navigate = useNavigate();
  const [searchMovie, setSearchMovie] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("failed to load movies...");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);
  async function handleSearch(e) {
    e.preventDefault();
    const trimedMovie = searchMovie.trim();
    if (!trimedMovie) return alert("Field is Empty");
    if (loading) return;
    setLoading(true);
    try {
      const searchResults = await searchMovies(trimedMovie);
      setMovieName(searchResults);
      navigate("/search");
      setError(false);
    } catch (err) {
      console.log(err);
      setError("Failed to Search Movies...");
    } finally {
      setLoading(false);
    }
   
  }

  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");

    if (storedFavs) {
      setFavorites(JSON.parse(storedFavs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (movie) => {
    setFavorites((prev) => [...prev, movie]);
  };

  const removeFromFavorites = (movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavorites = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        searchMovie,
        setSearchMovie,
        movieName,
        error,
        loading,
        favorites,
        handleSearch,
        addToFavorites,
        removeFromFavorites,
        isFavorites,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
