import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Standard shadcn/ui utility function to conditionally join classNames
 * and resolve any conflicting Tailwind classes using tailwind-merge.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
