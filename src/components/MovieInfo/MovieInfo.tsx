import { IGenre } from "@/models/IGenre";
import { GenreBadge } from "../GenreBadge/GenreBadge";
import type { MovieInfoProps } from "./movieInfo.props.ts";

export const MovieInfo = ({title, overview, genreIds, genres,}: MovieInfoProps) => {
    const safeGenres = Array.isArray(genres) ? genres : [];
    const safeGenreIds = Array.isArray(genreIds) ? genreIds : [];

    const movieGenres = safeGenres.filter((genre: IGenre) =>
        safeGenreIds.includes(genre.id),
    );

    return (
        <div className="flex flex-col gap-3">
            <div className="space-y-1.5">
                <h3 className="line-clamp-1 text-lg font-bold tracking-tight text-white transition-colors group-hover:text-red-500">
                    {title}
                </h3>

                <p className="line-clamp-2 text-sm leading-relaxed text-neutral-400">
                    {overview}
                </p>
            </div>

            {movieGenres.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-1">
                    {movieGenres.map((genre: IGenre) => (
                        <GenreBadge key={genre.id} name={genre.name} />
                    ))}
                </div>
            )}
        </div>
    );
};