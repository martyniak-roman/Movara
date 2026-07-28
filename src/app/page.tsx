import { MoviesList } from "@/components/MoviesList/MoviesList";
import { IMovie } from "@/models/IMovie";
import { getMovies } from "@/services/api.service";

export async function getMoviesData(): Promise<IMovie[]> {
  try {
    const data = await getMovies();
    return data?.results;
  } catch (error) {
    console.error("Failed to load movies:", error);
    return [];
  }
}

export default async function Home() {
  const data = await getMoviesData();

  if (data.length === 0) {
    return (
      <main className="p-4">
        <p>Can't load movies at the moment.</p>
      </main>
    );
  }

  return (
    <main className="p-4">
      {data.map((movie: IMovie) => (
        <MoviesList key={movie.id} movies={data} allGenres={[]} />
      ))}
    </main>
  );
}
