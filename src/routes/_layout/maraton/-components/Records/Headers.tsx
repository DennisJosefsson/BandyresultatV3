import type { ReactNode } from 'react'

export function H1({ children }: { children: ReactNode }) {
  return (
    <h1 className="text-xs font-semibold sm:text-sm lg:text-base">
      {children}
    </h1>
  )
}

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-1 sm:mb-2 text-[10px] xl:leading-4 font-semibold sm:text-xs lg:text-sm">
      {children}
    </h2>
  )
}

export function H3({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-1 sm:mb-2 text-[10px] xl:leading-4 font-semibold sm:text-xs">
      {children}
    </h3>
  )
}
