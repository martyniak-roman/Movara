import type { TMDBResponse } from "@/models/ITMDBResponse";
import type { IMovie } from "@/models/IMovie";
import { IGenre } from "@/models/IGenre";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const HEADERS = {
  Accept: "application/json",
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
};

export async function getMovies(): Promise<TMDBResponse<IMovie>> {
  const response = await fetch(BASE_URL + "3/discover/movie", {
    headers: HEADERS,
  });
  const data: TMDBResponse<IMovie> = await response.json();
  return data;
}

export async function getGenres(): Promise<TMDBResponse<{ genres: IGenre[] }>> {
  const response = await fetch(BASE_URL + "3/genre/movie/list", {
    headers: HEADERS,
  });
  const data: TMDBResponse<{ genres: IGenre[] }> = await response.json();
  return data;
}

export async function getMovieById(id: string): Promise<IMovie> {
  {
    const response = await fetch(`${BASE_URL}3/movie/${id}`, {
      headers: HEADERS,
    });
    const data: IMovie = await response.json();
    return data;
  }
}

export async function searchMovies(
  query: string,
): Promise<TMDBResponse<IMovie>> {
  const response = await fetch(`${BASE_URL}3/search/movie?query=${query}`, {
    headers: HEADERS,
  });
  const data: TMDBResponse<IMovie> = await response.json();
  return data;
}
