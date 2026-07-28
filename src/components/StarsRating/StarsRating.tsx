import { FaStar } from "react-icons/fa";
import type { StarsRatingProps } from "./starsRating.props.ts";

export const StarsRating = ({ rating }: StarsRatingProps) => {
  const normalizedRating = Math.max(0, Math.min(5, rating / 2));
  const filledStars = Math.round(normalizedRating);

  return (
    <div
      className="inline-flex items-center gap-2"
      role="img"
      aria-label={`Rating: ${normalizedRating.toFixed(1)} out of 5`}
    >
      <div className="inline-flex items-center gap-1" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => (
          <FaStar
            key={index}
            className={
              index < filledStars
                ? "text-[0.95rem] text-rating"
                : "text-[0.95rem] text-rating-muted"
            }
          />
        ))}
      </div>

      <span className="text-sm font-semibold text-rating">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};
