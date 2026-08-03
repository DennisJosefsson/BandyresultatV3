import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/base/ui/card'
import { useCookies } from '@/lib/contexts/cookieContext'
import { cn } from '@/lib/utils/utils'
import type {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
} from 'react'

interface PlayoffCardProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {
  group: string
}

const PlayoffCard = ({
  className,
  children,
  group,
}: PlayoffCardProps) => {
  if (group === 'final') {
    return (
      <Card
        size="sm"
        className="shadow-lg"
      >
        {children}
      </Card>
    )
  }

  return (
    <Card
      size="sm"
      className={cn('shadow-lg', className)}
    >
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
    <CardContent className="flex flex-col gap-2 text-sm">
      {children}
    </CardContent>
  )
}

interface TeamProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
> {
  teamId: number
}

function Team({ teamId, children }: TeamProps) {
  const { favTeams } = useCookies()
  return (
    <span
      data-favteam={
        favTeams.includes(teamId) ? true : false
      }
      className="items center flex flex-row gap-2 p-0.5 data-[favteam=true]:font-semibold sm:gap-2"
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
