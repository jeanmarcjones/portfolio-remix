import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * @description A shadcn/ui helper to make it easier to conditionally add
 * Tailwind CSS classes.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * @description Extracts the error message from the given error instance.
 */
export function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') return error

  if (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    typeof error.message === 'string'
  )
    return error.message

  console.error('Error message not found', error)
  return 'Unknown Error'
}
