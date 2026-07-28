"use client";

import { useState, useEffect, useCallback, type ChangeEvent } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export const SearchInput = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("search") || "";
  const [value, setValue] = useState(initialQuery);

  useEffect(() => {
    setValue(initialQuery);
  }, [initialQuery]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const nextValue = e.target.value;
      setValue(nextValue);

      const trimmed = nextValue.trim();
      const params = new URLSearchParams(searchParams.toString());

      if (trimmed) {
        params.set("search", trimmed);
      } else {
        params.delete("search");
      }
      params.set("page", "1");

      const targetPath = pathname === "/" ? "/" : "/";
      router.push(
        `${targetPath}${params.toString() ? `?${params.toString()}` : ""}`,
        { scroll: false },
      );
    },
    [pathname, router, searchParams],
  );

  return (
    <form
      role="search"
      className="flex w-full justify-center lg:flex-1"
      onSubmit={(e) => e.preventDefault()}
    >
      <label className="relative w-full max-w-md">
        <span className="sr-only">Search movies</span>
        <input
          type="search"
          value={value}
          onChange={handleChange}
          placeholder="Search movies"
          className="h-10 w-full rounded-[0.4rem] border border-app-border bg-app-surface px-3 py-2 pr-10 text-sm text-app-text outline-none transition placeholder:text-app-text-faint focus:border-app-accent focus-visible:ring-2 focus-visible:ring-app-accent/20"
        />
      </label>
    </form>
  );
};
