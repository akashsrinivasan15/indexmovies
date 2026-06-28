import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { useMovieContext } from "../contexts/MovieContext";

function Home() {
  const { movies, searchMovie, error, loading } = useMovieContext();

  async function handleSearch(e) {
    e.preventDefault();
    const trimedMovie = searchMovie.trim();
    if (!trimedMovie) return alert("Field is Empty");
    if (loading) return;
    setLoading(true);
    try {
      const searchResults = await searchMovies(trimedMovie);
      setMovies(searchResults);
      setError(false);
    } catch (err) {
      console.log(err);
      setError("Failed to Search Movies...");
    } finally {
      setLoading(false);
    }
    setSearchMovie("");
  }

  return (
    <div className="bg-mist-800 text-white p-4">
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
      {error && <div>{error}</div>}
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  w-fit mx-auto">
          {movies.map((movie) => (
            <MovieCard movieInfo={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
