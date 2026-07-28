import { StarsRating } from "../StarsRating/StarsRating";
import { MovieInfo } from "../MovieInfo/MovieInfo";
import { PosterPreview } from "../PosterPreview/PosterPreview";
import type { MoviesListCardProps } from "./moviesListCard.props.ts";
import Link from "next/link.js";

export const MoviesListCard = ({ movie, allGenres }: MoviesListCardProps) => {
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : null;

  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-app-border bg-app-surface shadow-[0_12px_32px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:border-app-border-strong hover:bg-app-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent/30 focus-visible:ring-offset-2 focus-visible:ring-offset-app-bg"
    >
      <div className="relative">
        <PosterPreview posterPath={movie.poster_path} title={movie.title} />

        {releaseYear && (
          <span className="absolute right-3 top-3 rounded-[0.45rem] border border-black/10 bg-black/55 px-2.5 py-1 text-[11px] font-medium tracking-[0.08em] text-white/85 backdrop-blur-sm">
            {releaseYear}
          </span>
        )}
      </div>

      <div className="flex grow flex-col justify-between gap-4 p-4">
        <MovieInfo
          title={movie.title}
          overview={movie.overview}
          releaseDate={movie.release_date}
          genreIds={movie.genre_ids}
          genres={allGenres}
        />

        <div className="border-t border-app-border pt-3">
          <div className="flex items-center justify-start">
            <StarsRating rating={movie.vote_average} />
          </div>
        </div>
      </div>
    </Link>
  );
};
