import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/base/ui/card'
import { useFavTeam } from '@/lib/contexts/favTeamsContext'
import { cn } from '@/lib/utils/utils'
import type { ReactNode } from 'react'

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
        <div className="flex flex-row justify-between text-sm xl:text-base">
          {children}
        </div>
      </CardTitle>
    </CardHeader>
  )
}

function Group({ children }: { children: ReactNode }) {
  return <span className="mb-2">{children}</span>
}

function Result({ children }: { children: ReactNode }) {
  return (
    <span className="font-bold tracking-widest">
      {children}
    </span>
  )
}

function Content({ children }: { children: ReactNode }) {
  return (
    <CardContent className="text-sm flex flex-col gap-2">
      {children}
    </CardContent>
  )
}

function Team({
  teamId,
  children,
}: {
  teamId: number
  children: ReactNode
}) {
  const { favTeams } = useFavTeam()
  return (
    <span
      className={cn(
        'flex flex-row gap-2 sm:gap-2 items center',
        favTeams.includes(teamId) ? 'font-bold' : undefined,
      )}
    >
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
