import type { ReactNode } from 'react'

const StatsCard = ({
  children,
}: {
  children: ReactNode
}) => {
  return (
    <div className="mt-2 mb-2 border p-2 shadow-xs md:shadow-sm sm:w-140 md:w-160">
      {children}
    </div>
  )
}

function Title({ children }: { children: ReactNode }) {
  return (
    <div>
      <span className="text-sm font-medium">
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
