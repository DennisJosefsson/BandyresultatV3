import type { ReactNode } from 'react'

const StatsCard = ({ children }: { children: ReactNode }) => {
  return <div className="mb-2 flex flex-col gap-1 border p-2 shadow-sm">{children}</div>
}

function Upper({ children }: { children: ReactNode }) {
  return <div className="flex flex-row justify-between">{children}</div>
}

function Lower({ children }: { children: ReactNode }) {
  return <div className="flex flex-row">{children}</div>
}

function Content({ children }: { children: ReactNode }) {
  return <div className="xs:text-xs text-[10px] sm:text-sm">{children}</div>
}

StatsCard.Upper = Upper
StatsCard.Lower = Lower
StatsCard.Content = Content

export default StatsCard
