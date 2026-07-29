import type { MouseEventHandler } from 'react';

export interface GenreBadgeProps {
    name: string;
    isActive?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}