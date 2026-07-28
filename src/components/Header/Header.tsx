import Link from "next/link";
import { Suspense } from "react";
import { UserInfo } from "../UserInfo/UserInfo";
import { SearchInput } from "../SearchInput/SearchInput";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-app-border bg-app-bg/88 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div className="flex min-w-0 items-center justify-between gap-4 lg:w-55 lg:shrink-0">
          <Link
            href="/"
            className="inline-block text-sm font-semibold uppercase tracking-[0.32em] text-app-text transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent/30 focus-visible:ring-offset-2 focus-visible:ring-offset-app-bg"
          >
            Movara
          </Link>

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.35rem] text-[11px] font-semibold uppercase tracking-[0.14em] text-app-text md:hidden">
            RM
          </div>
        </div>

        <Suspense fallback={<div className="h-10 w-full max-w-md" />}>
          <SearchInput />
        </Suspense>

        <UserInfo />
      </div>
    </header>
  );
};
