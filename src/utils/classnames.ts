/**
 * Classnames Utility
 * Centralized class name combining with clsx + tailwind-merge
 * Ensures consistent usage across components
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines classes using clsx and tailwind-merge
 * Resolves Tailwind class conflicts intelligently
 *
 * @example
 * cn('px-2', 'px-4') // returns 'px-4'
 * cn('text-lg', condition && 'text-xl')
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export default cn;
