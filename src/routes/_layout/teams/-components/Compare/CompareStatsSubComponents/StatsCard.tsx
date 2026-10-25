import type { ReactNode } from 'react'

const StatsCard = ({
  children,
}: {
  children: ReactNode
}) => {
  return <div>{children}</div>
}

function Title({ children }: { children: ReactNode }) {
  return (
    <div>
      <span className="text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm/6 font-semibold">
        {children}
      </span>
    </div>
  )
}
function Content({ children }: { children: ReactNode }) {
  return <div>{children}</div>
}

StatsCard.Title = Title
StatsCard.Content = Content

export default StatsCard
