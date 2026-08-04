import type { ReactNode } from 'react'

const StatsCard = ({
  children,
}: {
  children: ReactNode
}) => {
  return (
    <div className="mt-2 mb-4 last:mb-1 border p-2 shadow-xs md:shadow-sm sm:w-120 xl:w-full xl:max-w-160 h-fit justify-self-start">
      {children}
    </div>
  )
}

function Title({ children }: { children: ReactNode }) {
  return (
    <div>
      <span className="text-[10px] xs:text-xs sm:text-sm font-medium">
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
