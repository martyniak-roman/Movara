import type { IGenre } from '@/models/IGenre.ts';

export interface MovieInfoProps {
    title: string;
    overview: string;
    releaseDate?: string;
    genreIds: number[];
    genres: IGenre[];
}