import { IGenre } from "@/models/IGenre";
import { GenreBadge } from "../GenreBadge/GenreBadge";
import type { MovieInfoProps } from "./movieInfo.props.ts";

export const MovieInfo = ({
  title,
  overview,
  genreIds,
  genres,
}: MovieInfoProps) => {
  const movieGenres = genres.filter((genre: IGenre) =>
    genreIds.includes(genre.id),
  );

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <h3 className="line-clamp-1 text-base font-semibold tracking-tight text-app-text">
          {title}
        </h3>

        <p className="line-clamp-2 text-sm leading-6 text-app-text-muted">
          {overview || "No movie description available"}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {movieGenres.map((genre: IGenre) => (
          <GenreBadge key={genre.id} name={genre.name} />
        ))}
      </div>
    </div>
  );
};
