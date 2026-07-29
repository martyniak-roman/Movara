"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { GenreBadge } from "@/components/GenreBadge/GenreBadge";
import type { IGenre } from "@/models/IGenre";

type GenreFilterProps = {
    allGenres: IGenre[];
};

export const GenreFilter = ({ allGenres }: GenreFilterProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const activeGenreId = searchParams.get("genre");

    const handleSelect = (genreId: number) => {
        const params = new URLSearchParams(searchParams.toString());

        if (activeGenreId === String(genreId)) {
            params.delete("genre");
        } else {
            params.set("genre", String(genreId));
        }
        params.set("page", "1");

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex flex-wrap gap-2">
            {allGenres.map((genre) => (
                <GenreBadge
                    key={genre.id}
                    name={genre.name}
                    isActive={activeGenreId === String(genre.id)}
                    onClick={() => handleSelect(genre.id)}
                />
            ))}
        </div>
    );
};