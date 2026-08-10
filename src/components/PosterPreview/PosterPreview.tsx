import type { PosterPreviewProps } from "./posterPreview.props";
import Image from "next/image";

const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";
const FALLBACK_POSTER =
  "https://placehold.co/500x750/171614/cdccca?text=No+Poster";

export const PosterPreview = ({ posterPath, title }: PosterPreviewProps) => {
  const src = posterPath ? `${POSTER_BASE_URL}${posterPath}` : FALLBACK_POSTER;

  return (
    <div className="relative aspect-2/3 overflow-hidden bg-app-bg">
        <Image
            src={src}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
    </div>
  );
};
