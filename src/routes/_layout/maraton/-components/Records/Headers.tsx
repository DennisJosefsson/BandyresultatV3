import type { ReactNode } from 'react'

export function H1({ children }: { children: ReactNode }) {
  return <h1 className="text-sm font-semibold sm:text-base lg:text-lg">{children}</h1>
}

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-2 text-xs leading-4 font-semibold sm:text-sm lg:text-base">{children}</h2>
  )
}

export function H3({ children }: { children: ReactNode }) {
  return <h3 className="mb-2 text-xs leading-4 font-semibold sm:text-sm">{children}</h3>
}
