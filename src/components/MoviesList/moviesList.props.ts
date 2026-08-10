import type {IMovie} from "@/models/IMovie";
import type {IGenre} from "@/models/IGenre";

export interface MoviesListProps {
    movies: IMovie[];
    allGenres: IGenre[];
}