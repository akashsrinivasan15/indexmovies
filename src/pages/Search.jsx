import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { useMovieContext } from "../contexts/MovieContext";
import { Link } from "react-router-dom";

function Search() {
  const {
    searchMovie,
    setSearchMovie,
    movieName,
    error,
    loading,
    handleSearch,
  } = useMovieContext();
  useEffect(() => {
    document.title = "Movie App | Search";
  }, []);
  return (
    <div className="bg-mist-800 text-white p-4">
      <div className="flex items-center  px-2 pb-4">
        <Link to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
          </svg>
        </Link>
        <form
          onSubmit={handleSearch}
          className="border border-gray-200  w-fit px-4 py-2  mx-auto rounded-3xl mb-4"
        >
          <input
            className="outline-none"
            type="text"
            placeholder="Search for movie..."
            value={searchMovie}
            onChange={(e) => setSearchMovie(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      {error && <div>{error}</div>}
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : movieName.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-fit mx-auto">
          {movieName.map((movie) => (
            <MovieCard movieInfo={movie} key={movie.id} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-105">
          <div className="text-gray-200 p-6 rounded-lg text-2xl font-black">
            MOVIE NOT FOUND.
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
