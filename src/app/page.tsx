import { MoviesList } from "@/components/MoviesList/MoviesList";
import { IMovie } from "@/models/IMovie";
import { getMovies, searchMovies } from "@/services/api.service";

type HomeProps = {
  searchParams: Promise<{ search?: string; page?: string }>;
};

async function getMoviesData(query: string, page: string): Promise<IMovie[]> {
  try {
    const data = query
      ? await searchMovies(query, page)
      : await getMovies(page);
    return data?.results ?? [];
  } catch (error) {
    console.error("Failed to load movies:", error);
    return [];
  }
}

export default async function Home({ searchParams }: HomeProps) {
  const { search = "", page = "1" } = await searchParams;
  const data = await getMoviesData(search, page);

  if (data.length === 0) {
    return (
      <main className="p-4">
        <p>Can't load movies at the moment.</p>
      </main>
    );
  }

  return (
    <main className="p-4">
      <MoviesList movies={data} allGenres={[]} />
    </main>
  );
}
