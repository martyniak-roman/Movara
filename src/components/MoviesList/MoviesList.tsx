import { IMovie } from "@/models/IMovie.js";
import { MoviesListCard } from "../MovieListCard/MovieListCard";
import type { MoviesListProps } from "./moviesList.props.ts";

export const MoviesList = ({
  movies = [],
  allGenres = [],
}: MoviesListProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-4">
      {movies.map((movie: IMovie) => (
        <MoviesListCard key={movie.id} movie={movie} allGenres={allGenres} />
      ))}
    </div>
  );
};
