import type { TMDBResponse } from "@/models/ITMDBResponse";
import type { IMovie } from "@/models/IMovie";
import { IGenre } from "@/models/IGenre";
import { BASE_URL, HEADERS } from "./api.config";

export async function getMovies(
  page: number = 1,
): Promise<TMDBResponse<IMovie>> {
  const response = await fetch(`${BASE_URL}3/discover/movie?page=${page}`, {
    headers: HEADERS,
    next: { revalidate: 3600 },
  });
  const data: TMDBResponse<IMovie> = await response.json();
  return data;
}

export async function getGenres(): Promise<TMDBResponse<{ genres: IGenre[] }>> {
  const response = await fetch(BASE_URL + "3/genre/movie/list", {
    headers: HEADERS,
    next: { revalidate: 86400 },
  });
  const data: TMDBResponse<{ genres: IGenre[] }> = await response.json();
  return data;
}

export async function getMovieById(id: string): Promise<IMovie> {
  const response = await fetch(`${BASE_URL}3/movie/${id}`, {
    headers: HEADERS,
    next: { revalidate: 3600 },
  });
  const data: IMovie = await response.json();
  return data;
}

export async function searchMovies(
  query: string,
  page: number = 1,
): Promise<TMDBResponse<IMovie>> {
  const response = await fetch(
    `${BASE_URL}3/search/movie?query=${encodeURIComponent(query)}&page=${page}`,
    {
      headers: HEADERS,
    },
  );
  const data: TMDBResponse<IMovie> = await response.json();
  return data;
}
