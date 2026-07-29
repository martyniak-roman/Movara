import {getMovieDetails} from "@/services/api.service";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";

type MovieDetailsProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: MovieDetailsProps): Promise<Metadata> {
  const { id } = await params;
  const movie = await getMovieDetails(id);

  if (!movie) {
    return { title: "No movie found" };
  }

  return {
    title: movie.title,
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
  const movie = await getMovieDetails(id);

  if (!movie) {
    notFound();
  }
  return (
    <div>
      <div className="flex flex-col gap-6 md:flex-row">
        {movie.poster_path && (
          <Image
            width={300}
            height={300}
            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
            alt={movie.title}
            className="w-full max-w-xs rounded-lg self-start"
          />
        )}
        <div>
          <h1 className="text-2xl font-semibold">{movie.title}</h1>
          <p className="mt-2 text-sm text-app-text-faint">
            {movie.release_date}
          </p>
          <p className="mt-4">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}
