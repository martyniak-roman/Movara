'use client'

import {useState} from "react";
import {IReview} from "@/models/IReview";
import {FaStar, FaUserCircle} from "react-icons/fa";
import Image from "next/image";

export const ReviewCard = ({ review }: { review: IReview }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const isLongText = review.content.length > 300;

    const formattedDate = new Date(review.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const avatarUrl = review.author_details.avatar_path
        ? review.author_details.avatar_path.startsWith("/http")
            ? review.author_details.avatar_path.slice(1)
            : `https://image.tmdb.org/t/p/w45${review.author_details.avatar_path}`
        : null;

    return (
        <article className="relative flex flex-col gap-4 rounded-2xl border border-white/10 bg-neutral-900/60 p-5 sm:p-6 backdrop-blur-md transition-all hover:border-white/20">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    {avatarUrl ? (
                        <Image
                            width={200}
                            height={200}
                            src={avatarUrl}
                            alt={review.author}
                            className="h-10 w-10 rounded-full object-cover border border-white/10"
                        />
                    ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-neutral-400 border border-white/10">
                            <FaUserCircle className="h-6 w-6" />
                        </div>
                    )}

                    <div>
                        <h3 className="text-sm font-bold text-white">{review.author}</h3>
                        <p className="text-[11px] text-neutral-400">{formattedDate}</p>
                    </div>
                </div>

                {review.author_details.rating && (
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-rating-border bg-rating-soft px-3 py-1 text-xs font-bold text-rating shadow-[0_0_8px_var(--color-rating-soft)]">
                        <FaStar className="text-[11px] text-rating" />
                        <span>{review.author_details.rating}</span>
                        <span className="text-[10px] text-rating font-medium">/ 10</span>
                    </div>
                )}
            </div>

            <div className="text-sm leading-relaxed text-neutral-300">
                <p className={!isExpanded && isLongText ? "line-clamp-4" : ""}>
                    {review.content}
                </p>

                {isLongText && (
                    <button
                        type="button"
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="mt-2 text-xs font-semibold text-red-500 hover:text-red-400 transition-colors focus:outline-none"
                    >
                        {isExpanded ? "Collapse" : "Read the full article"}
                    </button>
                )}
            </div>
        </article>
    );
};