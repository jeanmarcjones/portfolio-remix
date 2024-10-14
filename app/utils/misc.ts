import { type ClassValue, clsx } from 'clsx/lite'
import { twMerge } from 'tailwind-merge'

/**
 * @description A shadcn/ui helper to make it easier to conditionally add
 * Tailwind CSS classes.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * @description Base styles for HTML styled by the Tailwind CSS Typography
 * plugin.
 */
export function prose(classValue?: ClassValue): string {
  return clsx(
    'prose dark:prose-invert prose-a:transition-colors',
    'prose-a:text-emerald-600 hover:prose-a:text-emerald-800',
    'dark:prose-a:text-indigo-300 dark:hover:prose-a:text-indigo-400',
    classValue
  )
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
