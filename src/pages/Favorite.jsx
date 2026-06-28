import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import { useEffect } from "react";

function Favorite() {
    useEffect(() => {
      document.title = "Index Movies | Favorites";
    }, []);
  const { favorites } = useMovieContext();

  return (
    <div className="min-h-[calc(100vh-72px)] bg-gray-800 text-white p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-fit mx-auto">
        {favorites.length > 0 ? (
          favorites.map((movie) => (
            <MovieCard movieInfo={movie} key={movie.id} />
          ))
        ) : (
          <div className="col-span-full flex justify-center items-center h-100 ">
            <div className="bg-gray-400 text-black p-6 rounded-lg">
              No favorite movies added yet.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Favorite;
