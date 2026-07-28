import { MoviesList } from "@/components/MoviesList/MoviesList";
import { Pagination } from "@/components/Pagination/Pagination";
import { IMovie } from "@/models/IMovie";
import { TMDBResponse } from "@/models/ITMDBResponse";
import { getMovies, searchMovies } from "@/services/api.service";
import { Suspense } from "react";

type HomeProps = {
  searchParams: Promise<{ search?: string; page?: string }>;
};

async function getMoviesData(
  query: string,
  page: number,
): Promise<TMDBResponse<IMovie>> {
  try {
    const data = query
      ? await searchMovies(query, page)
      : await getMovies(page);
    return data ?? { page: 1, results: [], total_pages: 0, total_results: 0 };
  } catch (error) {
    console.log("Failed to load movies:", error);
    return { page: 1, results: [], total_pages: 0, total_results: 0 };
  }
}

export default async function Home({ searchParams }: HomeProps) {
  const { search = "", page = "1" } = await searchParams;
  const { results, total_pages } = await getMoviesData(search, Number(page));

  if (results.length === 0) {
    return (
      <main className="p-4">
        <p>Can't load movies at the moment.</p>
      </main>
    );
  }

  return (
    <main className="p-4">
      <MoviesList movies={results} allGenres={[]} />
      <Suspense fallback={null}>
        <Pagination totalPages={total_pages} />
      </Suspense>
    </main>
  );
}
