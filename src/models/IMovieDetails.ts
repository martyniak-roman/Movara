import type {IGenre} from "./IGenre";
import type {IMovie} from "./IMovie";
import type {IVideo} from "./IVideo";
import type {ICastMember} from "./ICastMember";

export interface IMovieDetails extends IMovie {
    genres: IGenre[];
    runtime: number | null;
    budget: number;
    revenue: number;
    status: string;
    tagline: string;
    homepage: string | null;
    videos?: {
        results: IVideo[];
    };
    credits?: {
        cast: ICastMember[];
    };
}