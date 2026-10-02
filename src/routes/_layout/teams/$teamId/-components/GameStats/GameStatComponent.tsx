import { Datum } from '@/components/Common/Date'
import TeamLogo from '@/components/Common/TeamLogo'
import type { TeamRecord } from '@/lib/types/team'
import type { ReactNode } from 'react'

const GameStatComponent = ({
  children,
}: {
  children: ReactNode
}) => {
  return (
    <div className="border p-1 @xs:p-2 shadow-xs md:shadow-sm w-full @2xl:max-w-lg @4xl:max-w-xl h-fit justify-self-start">
      {children}
    </div>
  )
}

function Title({ children }: { children: ReactNode }) {
  return <div>{children}</div>
}

function Content({
  statArray,
}: {
  statArray: Array<TeamRecord> | null
}) {
  if (!statArray || statArray.length === 0) return null

  return (
    <div>
      {statArray.map((stat, index) => {
        return (
          <div
            key={`${stat.gameId}-${index}`}
            className="bg-muted-foreground/20 px-1 @sm:px-3 py-2 mb-1 flex flex-col gap-2"
          >
            <div className="flex flex-row gap-2 justify-between">
              <span>{stat.serieName}</span>
              <span>
                <Datum>{stat.date}</Datum>
              </span>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2">
                  <TeamLogo
                    size={32}
                    logoId={stat.home.logo.logoId}
                    hasDark={stat.home.logo.hasDark}
                    className="@sm:block size-[1lh] object-scale-down"
                    aria-label={stat.home.casualName}
                    title={stat.home.casualName}
                  />
                  <span>{stat.home.name}</span>
                </div>
                <div className="flex flex-row gap-2">
                  <TeamLogo
                    size={32}
                    logoId={stat.away.logo.logoId}
                    hasDark={stat.away.logo.hasDark}
                    className="@sm:block size-[1lh] object-scale-down"
                    aria-label={stat.away.casualName}
                    title={stat.away.casualName}
                  />
                  <span>{stat.away.name}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-right">
                  {stat.result}
                </span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

GameStatComponent.Title = Title
GameStatComponent.Content = Content

export default GameStatComponent
