import { MoviesList } from "@/components/MoviesList/MoviesList";
import { Pagination } from "@/components/Pagination/Pagination";
import { IMovie } from "@/models/IMovie";
import { TMDBResponse } from "@/models/ITMDBResponse";
import {getGenres, getMovies, searchMovies} from "@/services/api.service";
import { Suspense } from "react";
import {GenreFilter} from "@/components/GenreFilter/GenreFilter";

type HomeProps = {
  searchParams: Promise<{ search?: string; page?: string, genre?: string }>;
};

async function getMoviesData(
    query: string,
    page: number,
    genre?: string,
): Promise<TMDBResponse<IMovie>> {
    try {
        const data = query
            ? await searchMovies(query, page)
            : await getMovies({ page, with_genres: genre ? Number(genre) : undefined });
        return data ?? { page: 1, results: [], total_pages: 0, total_results: 0 };
    } catch (error) {
        console.error("Failed to load movies:", error);
        return { page: 1, results: [], total_pages: 0, total_results: 0 };
    }
}

export default async function Home({ searchParams }: HomeProps) {
  const { search = "", page = "1", genre } = await searchParams;
  const [{ results, total_pages }, genresData] = await Promise.all([getMoviesData(search, Number(page), genre), getGenres()]);

  if (results.length === 0) {
    return (
      <main className="p-4">
        <p>Can&#39;t load movies at the moment.</p>
      </main>
    );
  }

  return (
    <main className="p-4">
      <Suspense fallback={null}>
        <GenreFilter allGenres={genresData.genres} />
      </Suspense>
      <MoviesList movies={results} allGenres={genresData.genres} />
      <Suspense fallback={null}>
        <Pagination totalPages={total_pages} />
      </Suspense>
    </main>
  );
}
