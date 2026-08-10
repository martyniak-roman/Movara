export interface IReviewAuthorDetails {
    name: string;
    username: string;
    avatar_path: string | null;
    rating: number | null;
}

export interface IReview {
    id: string;
    author: string;
    author_details: IReviewAuthorDetails;
    content: string;
    created_at: string;
    updated_at: string;
    url: string;
}