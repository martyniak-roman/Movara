import { getMovieDetails, getMovieReviews } from "@/services/api.service";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MovieReviews } from "@/components/MovieReviews/MovieReviews";

type MovieDetailsProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: MovieDetailsProps): Promise<Metadata> {
  const { id } = await params;
  const movie = await getMovieDetails(id);

  if (!movie) {
    return { title: "No movie found" };
  }

  return {
    title: `${movie.title}`,
    description: movie.overview,
    openGraph: {
      title: movie.title,
      description: movie.overview,
      images: movie.poster_path
          ? [`https://image.tmdb.org/t/p/w500${movie.poster_path}`]
          : [],
    },
  };
}

export default async function MovieDetailsPage({ params }: MovieDetailsProps) {
  const { id } = await params;

  const [movie, reviewsData] = await Promise.all([
    getMovieDetails(id),
    getMovieReviews(id).catch(() => ({ page: 1, results: [], total_pages: 0, total_results: 0 })),
  ]);

  if (!movie) {
    notFound();
  }

  const reviews = Array.isArray(reviewsData?.results) ? reviewsData.results : [];

  return (
      <div className="space-y-10 pb-8">
        <div className="flex flex-col gap-6 md:flex-row">
          {movie.poster_path && (
              <Image
                  width={300}
                  height={450}
                  src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                  alt={movie.title}
                  priority
                  className="w-full max-w-xs rounded-2xl self-start border border-white/10"
              />
          )}
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-white">{movie.title}</h1>
            <p className="text-sm text-neutral-400">
              {movie.release_date}
            </p>
            <p className="text-neutral-300 leading-relaxed">{movie.overview}</p>
          </div>
        </div>

        <MovieReviews reviews={reviews} />
      </div>
  );
}