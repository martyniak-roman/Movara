import type { TMDBResponse } from "@/models/ITMDBResponse";
import type { IMovie } from "@/models/IMovie";
import type { IMovieDetails } from "@/models/IMovieDetails";
import type { IGenre } from "@/models/IGenre";
import { BASE_URL, HEADERS } from "./api.config";

interface GetMoviesParams {
  page?: number;
  with_genres?: number;
}

export async function getMovies({page = 1, with_genres,}: GetMoviesParams = {}): Promise<TMDBResponse<IMovie>> {
  const params = new URLSearchParams({ page: String(page) });
  if (with_genres) params.set("with_genres", String(with_genres));

  const response = await fetch(`${BASE_URL}3/discover/movie?${params.toString()}`, {
    headers: HEADERS,
    next: { revalidate: 3600 },
  });
  return response.json();
}

export async function getGenres(): Promise<{ genres: IGenre[] }> {
  const response = await fetch(BASE_URL + "3/genre/movie/list", {
    headers: HEADERS,
    next: { revalidate: 86400 },
  });
  return response.json();
}

export async function getMovieDetails(id: string): Promise<IMovieDetails> {
  const response = await fetch(
      `${BASE_URL}3/movie/${id}?append_to_response=videos,credits`,
      {
        headers: HEADERS,
        next: { revalidate: 3600 },
      },
  );
  return response.json();
}

export async function searchMovies(query: string, page: number = 1,): Promise<TMDBResponse<IMovie>> {
  const params = new URLSearchParams({ query, page: String(page) });

  const response = await fetch(`${BASE_URL}3/search/movie?${params.toString()}`, {
    headers: HEADERS,
    next: { revalidate: 300 },
  });
  return response.json();
}