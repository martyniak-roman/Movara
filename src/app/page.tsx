import { MoviesList } from "@/components/MoviesList/MoviesList";
import { Pagination } from "@/components/Pagination/Pagination";
import { IMovie } from "@/models/IMovie";
import { TMDBResponse } from "@/models/ITMDBResponse";
import {
    getGenres,
    getMovies,
    getTrendingMovies,
    searchMovies,
} from "@/services/api.service";
import { Suspense } from "react";
import { GenreFilter } from "@/components/GenreFilter/GenreFilter";
import { TrendingMovies } from "@/components/TrendingMovies/TrendingMovies";

type HomeProps = {
    searchParams: Promise<{ search?: string; page?: string; genre?: string }>;
};

async function getMoviesData(query: string, page: number, genre?: string,): Promise<TMDBResponse<IMovie>> {
    try {
        const data = query
            ? await searchMovies(query, page)
            : await getMovies({
                page,
                with_genres: genre ? Number(genre) : undefined,
            });

        return {
            page: data?.page ?? 1,
            results: Array.isArray(data?.results) ? data.results : [],
            total_pages: data?.total_pages ?? 0,
            total_results: data?.total_results ?? 0,
        };
    } catch (error) {
        console.error("Failed to load movies:", error);
        return { page: 1, results: [], total_pages: 0, total_results: 0 };
    }
}

export default async function Home({ searchParams }: HomeProps) {
    const { search = "", page = "1", genre } = await searchParams;

    const [moviesData, genresData, trendingData] = await Promise.all([
        getMoviesData(search, Number(page), genre),
        getGenres().catch(() => ({ genres: [] })),
        !search && page === "1" && !genre
            ? getTrendingMovies("week").catch(() => ({ results: [] }))
            : Promise.resolve({ results: [] }),
    ]);

    const results = moviesData?.results ?? [];
    const total_pages = moviesData?.total_pages ?? 0;
    const genres = genresData?.genres ?? [];
    const trendingResults = trendingData?.results ?? [];

    if (results.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-neutral-400">
                    Can&#39;t load movies at the moment.
                </p>
            </div>
        );
    }

    return (
        <main className="space-y-6 p-4">
            <Suspense fallback={null}>
                <GenreFilter allGenres={genres} />
            </Suspense>

            {trendingResults.length > 0 && (
                <TrendingMovies movies={trendingResults} allGenres={genres} />
            )}

            <MoviesList movies={results} allGenres={genres} />

            <Suspense fallback={null}>
                <Pagination totalPages={total_pages} />
            </Suspense>
        </main>
    );
}