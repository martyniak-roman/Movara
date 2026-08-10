import type { IMovie } from "@/models/IMovie";
import type { IGenre } from "@/models/IGenre";

export interface MoviesListCardProps {
  movie: IMovie;
  allGenres: IGenre[];
}
