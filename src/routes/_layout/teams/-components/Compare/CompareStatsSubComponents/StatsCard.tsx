import type { ReactNode } from 'react'

const StatsCard = ({
  children,
}: {
  children: ReactNode
}) => {
  return (
    <div className="border shadow-md mt-2 w-full p-2 mb-2">
      {children}
    </div>
  )
}

function Title({ children }: { children: ReactNode }) {
  return (
    <div>
      <span className="text-sm font-medium ">
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
