import type { ReactNode } from 'react'

const StatsCard = ({
  children,
}: {
  children: ReactNode
}) => {
  return (
    <div className="border shadow-lg mb-2 flex flex-col gap-1 p-2">
      {children}
    </div>
  )
}

function Upper({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-row justify-between">
      {children}
    </div>
  )
}

function Lower({ children }: { children: ReactNode }) {
  return <div className="flex flex-row">{children}</div>
}

function Content({ children }: { children: ReactNode }) {
  return (
    <div className="text-[10px] xs:text-xs sm:text-sm">
      {children}
    </div>
  )
}

StatsCard.Upper = Upper
StatsCard.Lower = Lower
StatsCard.Content = Content

export default StatsCard
