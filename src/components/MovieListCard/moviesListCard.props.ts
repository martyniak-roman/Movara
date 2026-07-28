import type { IMovie } from "../../models/IMovie.ts";
import type { IGenre } from "../../models/IGenre.ts";

export interface MoviesListCardProps {
  movie: IMovie;
  allGenres: IGenre[];
}
