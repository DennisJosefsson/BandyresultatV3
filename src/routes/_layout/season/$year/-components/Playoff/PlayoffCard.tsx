import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ReactNode } from 'react'

import { useFavTeam } from '@/lib/contexts/favTeamsContext'

const PlayoffCard = ({
  styleClass = '',
  children,
  group,
}: {
  styleClass?: string
  children: ReactNode
  group: string
}) => {
  if (group === 'final') {
    return <Card>{children}</Card>
  }

  return (
    <Card className={styleClass}>
      <div>{children}</div>
    </Card>
  )
}

function Title({ children }: { children: ReactNode }) {
  return (
    <CardHeader>
      <CardTitle>
        <div className="flex flex-row justify-between text-[10px] sm:text-xs lg:text-sm xl:text-base">
          {children}
        </div>
      </CardTitle>
    </CardHeader>
  )
}

function Group({ children }: { children: ReactNode }) {
  return <span>{children}</span>
}

function Result({ children }: { children: ReactNode }) {
  return <span>{children}</span>
}

function Content({ children }: { children: ReactNode }) {
  return (
    <CardContent className="text-[10px] sm:text-xs lg:text-sm">
      {children}
    </CardContent>
  )
}

function Team({ teamId, children }: { teamId: number; children: ReactNode }) {
  const { favTeams } = useFavTeam()
  return (
    <span className={favTeams.includes(teamId) ? 'font-bold' : undefined}>
      {children}
    </span>
  )
}

PlayoffCard.Title = Title
PlayoffCard.Group = Group
PlayoffCard.Result = Result
PlayoffCard.Content = Content
PlayoffCard.Team = Team

export default PlayoffCard
