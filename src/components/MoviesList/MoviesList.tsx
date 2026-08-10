import { IMovie } from "@/models/IMovie";
import { MoviesListCard } from "../MovieListCard/MovieListCard";
import type { MoviesListProps } from "./moviesList.props.ts";

export const MoviesList = ({movies, allGenres,}: MoviesListProps) => {
  if (!movies.length){
      return <div className="p-4">
          <p>Can&#39;t load movies at the moment.</p>
      </div>;
  }

  return (
      <section className="space-y-4 pt-4">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
            Movies
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:gap-6">
          {movies.map((movie: IMovie) => (
              <MoviesListCard key={movie.id} movie={movie} allGenres={allGenres} />
          ))}
        </div>
      </section>
  );
};