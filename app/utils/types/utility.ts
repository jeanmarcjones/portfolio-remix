import type { ComponentPropsWithoutRef, ElementType } from 'react'

export type ComponentPropsExcludingRef<T extends ElementType> =
  ComponentPropsWithoutRef<T>
