import { IReview } from "@/models/IReview";
import { FaQuoteLeft } from "react-icons/fa";
import {ReviewCard} from '../ReviewCard/ReviewCard'

type MovieReviewsProps = {
    reviews: IReview[];
};

export const MovieReviews = ({ reviews }: MovieReviewsProps) => {
    if (!reviews || reviews.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-white/10 bg-neutral-900/30 p-8 text-center text-neutral-400">
                <p className="text-sm">This movie don&#39;t have reviews!</p>
            </div>
        );
    }

    return (
        <section className="space-y-6 pt-6">
            <div className="flex items-center gap-2">
                <FaQuoteLeft className="text-red-500 text-xl" />
                <h2 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                    Viewers reviews ({reviews.length})
                </h2>
            </div>

            <div className="grid gap-4 sm:gap-6">
                {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                ))}
            </div>
        </section>
    );
};