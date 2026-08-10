import { StarsRating } from "../StarsRating/StarsRating";
import { MovieInfo } from "../MovieInfo/MovieInfo";
import { PosterPreview } from "../PosterPreview/PosterPreview";
import type { MoviesListCardProps } from "./moviesListCard.props";
import Link from "next/link";

export const MoviesListCard = ({ movie, allGenres }: MoviesListCardProps) => {
  const releaseYear = movie.release_date
      ? new Date(movie.release_date).getFullYear()
      : null;

  return (
      <Link
          href={`/movie/${movie.id}`}
          className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/60 transition-all duration-300 hover:-translate-y-1.5 hover:border-red-500/50 hover:bg-neutral-900/90 hover:shadow-[0_12px_32px_rgba(220,38,38,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 backdrop-blur-xs"
      >
        <div className="relative aspect-2/3 w-full overflow-hidden bg-neutral-950">
          <PosterPreview posterPath={movie.poster_path} title={movie.title} />

          <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-transparent to-black/30 opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

          {releaseYear && (
              <span className="absolute right-3 top-3 z-10 rounded-full border border-white/15 bg-black/60 px-3 py-0.5 text-xs font-semibold tracking-wider text-neutral-200 backdrop-blur-md shadow-sm">
            {releaseYear}
          </span>
          )}
        </div>

        <div className="flex flex-1 flex-col justify-between gap-4 p-4">
          <MovieInfo
              title={movie.title}
              overview={movie.overview}
              releaseDate={movie.release_date}
              genreIds={movie.genre_ids}
              genres={allGenres}
          />

          <div className="border-t border-white/10 pt-3">
            <div className="flex items-center justify-between">
              <StarsRating rating={movie.vote_average} />
            </div>
          </div>
        </div>
      </Link>
  );
};