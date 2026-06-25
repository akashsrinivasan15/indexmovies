import React from "react";
import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({ movieInfo }) {
  const { isFavorites, addToFavorites, removeFromFavorites } =
    useMovieContext();
  const favorite = isFavorites(movieInfo.id);

  const onFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent parent click events

    if (favorite) {
      removeFromFavorites(movieInfo.id);
    } else {
      addToFavorites(movieInfo);
    }
  };

  return (
    <div className="relative group cursor-pointer transform transition duration-300 hover:scale-102">
      <img
        className="w-full rounded-lg"
        src={`https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`}
        alt={movieInfo.title}
      />

      <button
        onClick={onFavoriteClick}
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 hover: transition-opacity duration-300 bg-black/60 p-1 rounded-full border border-gray-700"
      >
        {favorite ? "❤️" : "🤍"}
      </button>

      <div className="mt-2">
        <h2 className="font-bold text-lg truncate">{movieInfo.title}</h2>
        <p className="text-gray-500">
          {movieInfo.release_date?.split("-")[0] || "N/A"}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;
