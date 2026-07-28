"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { PaginationProps } from "./pagination.props";

export const Pagination = ({ totalPages }: PaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page") || "1");

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex items-center justify-center"
    >
      <div className="flex items-center gap-3 rounded-[0.4rem] px-3 py-2">
        <button
          type="button"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Previous page"
          className="cursor-pointer inline-flex min-w-20 items-center justify-center rounded-[0.35rem] border border-app-border bg-app-bg px-3 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-app-text-muted transition hover:border-app-border-strong hover:text-app-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent/30 focus-visible:ring-offset-2 focus-visible:ring-offset-app-bg disabled:cursor-not-allowed disabled:border-app-border disabled:text-app-text-faint disabled:opacity-40"
        >
          Prev
        </button>

        <div className="min-w-24 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-app-text-muted">
          <span className="text-app-text">{currentPage}</span>
          <span className="mx-2 text-app-text-faint">/</span>
          <span>{totalPages}</span>
        </div>

        <button
          type="button"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Next page"
          className="cursor-pointer inline-flex min-w-20 items-center justify-center rounded-[0.35rem] border border-app-border bg-app-bg px-3 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-app-text-muted transition hover:border-app-border-strong hover:text-app-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent/30 focus-visible:ring-offset-2 focus-visible:ring-offset-app-bg disabled:cursor-not-allowed disabled:border-app-border disabled:text-app-text-faint disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </nav>
  );
};
