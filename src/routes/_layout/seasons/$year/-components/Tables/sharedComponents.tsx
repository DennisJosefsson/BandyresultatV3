import type { ReactNode } from 'react'

export function SerieName({
  children,
}: {
  children: ReactNode
}) {
  return (
    <h2 className="text-primary text-[10px] font-bold tracking-wide @sm:text-xs @3xl:text-sm @5xl:text-base">
      {children}
    </h2>
  )
}

export function Comment({
  children,
}: {
  children: ReactNode
}) {
  return (
    <p className="p-1 text-[8px] @lg:text-xs">{children}</p>
  )
}

export function TableDiv({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="@md:p-2 border p-0.5 shadow-xs @xl:shadow-sm">
      {children}
    </div>
  )
}
