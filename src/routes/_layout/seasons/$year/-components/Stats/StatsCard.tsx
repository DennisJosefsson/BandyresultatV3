import type { ReactNode } from 'react'

const StatsCard = ({
  children,
}: {
  children: ReactNode
}) => {
  return (
    <div className="@container/statscard mb-2 flex flex-col gap-0.5 border shadow-sm">
      {children}
    </div>
  )
}

function Upper({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-row justify-between py-1 px-2">
      {children}
    </div>
  )
}

function Lower({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-row py-1 px-2">
      {children}
    </div>
  )
}

function Content({ children }: { children: ReactNode }) {
  return (
    <div className="text-[8px] @3xs/statscard:text-xs @xs/statscard:text-sm @sm/statscard:text-sm">
      {children}
    </div>
  )
}

StatsCard.Upper = Upper
StatsCard.Lower = Lower
StatsCard.Content = Content

export default StatsCard
