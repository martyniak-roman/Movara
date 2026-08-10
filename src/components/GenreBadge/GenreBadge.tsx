import type { GenreBadgeProps } from "./genreBadge.props.ts";

export const GenreBadge = ({name, onClick, isActive = false,}: GenreBadgeProps) => {
  const baseClassName =
    "inline-flex items-center select-none rounded-[0.35rem] border px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] transition duration-200";

  const stateClassName = isActive
    ? "border-app-accent/30 bg-app-accent-soft text-app-text"
    : "border-app-border bg-app-surface text-app-text-muted";

  const interactiveClassName = onClick
    ? "cursor-pointer hover:border-app-border-strong hover:text-app-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent/30 focus-visible:ring-offset-2 focus-visible:ring-offset-app-bg"
    : "cursor-default";

  const className = `${baseClassName} ${stateClassName} ${interactiveClassName}`;

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={isActive}
        className={className}
      >
        {name}
      </button>
    );
  }

  return <span className={className}>{name}</span>;
};
