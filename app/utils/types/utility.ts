import { ComponentPropsWithoutRef, ElementType } from 'react'

type ComponentPropsExcludingRef<T extends ElementType> =
  ComponentPropsWithoutRef<T>

export type { ComponentPropsExcludingRef }
