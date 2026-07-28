export const UserInfo = () => {
  return (
    <>
      <div className="hidden min-w-0 items-center justify-end gap-3 lg:flex lg:w-55 lg:shrink-0">
        <span className="truncate text-[11px] font-medium uppercase tracking-[0.16em] text-app-text-muted">
          Roman Martyniak
        </span>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.35rem] border border-app-accent/20 bg-app-accent-soft text-[11px] font-semibold uppercase tracking-[0.14em] text-app-text">
          RM
        </div>
      </div>
    </>
  );
};
