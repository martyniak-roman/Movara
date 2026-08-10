import type { TMDBResponse } from "@/models/ITMDBResponse";
import type { IMovie } from "@/models/IMovie";
import type { IMovieDetails } from "@/models/IMovieDetails";
import type { IGenre } from "@/models/IGenre";
import type { IReview } from "@/models/IReview";
import { BASE_URL, HEADERS } from "./api.config";

interface GetMoviesParams {
  page?: number;
  with_genres?: number;
}

export async function getMovies({page = 1, with_genres,}: GetMoviesParams = {}): Promise<TMDBResponse<IMovie>> {
  try {
    const params = new URLSearchParams({ page: String(page) });
    if (with_genres) params.set("with_genres", String(with_genres));

    const response = await fetch(
        `${BASE_URL}3/discover/movie?${params.toString()}`,
        {
          headers: HEADERS,
          next: { revalidate: 3600 },
        }
    );

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("getMovies error:", error);
    return { page: 1, results: [], total_pages: 0, total_results: 0 };
  }
}

export async function getGenres(): Promise<{ genres: IGenre[] }> {
  try {
    const response = await fetch(`${BASE_URL}3/genre/movie/list`, {
      headers: HEADERS,
      next: { revalidate: 86400 },
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("getGenres error:", error);
    return { genres: [] };
  }
}

export async function getMovieDetails(id: string): Promise<IMovieDetails | null> {
  try {
    const response = await fetch(
        `${BASE_URL}3/movie/${id}?append_to_response=videos,credits`,
        {
          headers: HEADERS,
          next: { revalidate: 3600 },
        }
    );

    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error(`getMovieDetails error for id ${id}:`, error);
    return null;
  }
}

export async function searchMovies(query: string, page: number = 1): Promise<TMDBResponse<IMovie>> {
  try {
    const params = new URLSearchParams({ query, page: String(page) });

    const response = await fetch(
        `${BASE_URL}3/search/movie?${params.toString()}`,
        {
          headers: HEADERS,
          next: { revalidate: 300 },
        }
    );

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("searchMovies error:", error);
    return { page: 1, results: [], total_pages: 0, total_results: 0 };
  }
}

export async function getTrendingMovies(timeWindow: "day" | "week" = "day"): Promise<TMDBResponse<IMovie>> {
  try {
    const response = await fetch(
        `${BASE_URL}3/trending/movie/${timeWindow}`,
        {
          headers: HEADERS,
          next: { revalidate: 3600 },
        }
    );

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("getTrendingMovies error:", error);
    return { page: 1, results: [], total_pages: 0, total_results: 0 };
  }
}

export async function getMovieReviews(movieId: number | string, page: number = 1): Promise<TMDBResponse<IReview>> {
  try {
    const response = await fetch(
        `${BASE_URL}3/movie/${movieId}/reviews?page=${page}`,
        {
          headers: HEADERS,
          next: { revalidate: 3600 },
        }
    );

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`getMovieReviews error for movieId ${movieId}:`, error);
    return { page: 1, results: [], total_pages: 0, total_results: 0 };
  }
}