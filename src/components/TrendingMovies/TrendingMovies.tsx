import Link from "next/link";
import { IMovie } from "@/models/IMovie";
import { IGenre } from "@/models/IGenre";
import { PosterPreview } from "../PosterPreview/PosterPreview";
import { MovieInfo } from "../MovieInfo/MovieInfo";
import { StarsRating } from "../StarsRating/StarsRating";
import { FaFire } from "react-icons/fa";

type TrendingMoviesProps = {
    movies: IMovie[];
    allGenres: IGenre[];
};

export const TrendingMovies = ({movies, allGenres}: TrendingMoviesProps) => {
    if (!movies.length) {
        return null;
    }

    const trendingList = movies.slice(0, 5);

    return (
        <section className="mb-6 space-y-6">
            <div className="flex items-center gap-2">
                <FaFire className="text-lg text-red-500 animate-pulse" />
                <h2 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                    Trends now
                </h2>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {trendingList.map((movie) => {
                    const releaseYear = movie.release_date
                        ? new Date(movie.release_date).getFullYear()
                        : null;

                    const genreIds = movie.genre_ids || [];

                    return (
                        <Link
                            key={movie.id}
                            href={`/movie/${movie.id}`}
                            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/60 backdrop-blur-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-red-500/50 hover:bg-neutral-900/90 hover:shadow-[0_12px_32px_rgba(220,38,38,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                        >
                            <div className="relative aspect-2/3 w-full overflow-hidden bg-neutral-950">
                                <PosterPreview
                                    posterPath={movie.poster_path}
                                    title={movie.title}
                                />

                                <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-transparent to-black/30 opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

                                {releaseYear && (
                                    <span className="absolute right-3 top-3 z-10 rounded-full border border-white/15 bg-black/60 px-3 py-0.5 text-xs font-semibold tracking-wider text-neutral-200 backdrop-blur-md shadow-sm">{releaseYear}</span>
                                )}
                            </div>

                            <div className="flex flex-1 flex-col justify-between gap-4 p-4">
                                <MovieInfo
                                    title={movie.title}
                                    overview={movie.overview}
                                    releaseDate={movie.release_date}
                                    genreIds={genreIds}
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
                })}
            </div>
        </section>
    );
};