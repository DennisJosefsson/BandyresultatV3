import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/base/ui/card'
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
  if (group === 'cup-final' || group === 'cup-bronze') {
    return (
      <Card
        size="sm"
        className="shadow-lg text-xs @2xs/playoff:text-sm @2xl/playoff:text-xs @4xl/playoff:text-sm data-[size=sm]:py-1.5 data-[size=sm]:@4xl/playoff:py-2"
      >
        {children}
      </Card>
    )
  }

  return (
    <Card
      size="sm"
      className={cn(
        'shadow-lg text-xs @2xs/playoff:text-sm @2xl/playoff:text-xs @4xl/playoff:text-sm data-[size=sm]:py-1.5 data-[size=sm]:@4xl/playoff:py-2',
        className,
      )}
    >
      <div>{children}</div>
    </Card>
  )
}

function Title({ children }: { children: ReactNode }) {
  return (
    <CardHeader>
      <CardTitle>
        <div className="flex flex-row justify-between text-xs @2xs/playoff:text-sm @2xl/playoff:text-xs @4xl/playoff:text-sm">
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
    <CardContent className="flex flex-col gap-2 group-data-[size=sm]/card:p-1 text-xs @2xs/playoff:text-sm @2xl/playoff:text-xs @4xl/playoff:text-sm group-data-[size=sm]/card:@2xl/playoff:p-2">
      {children}
    </CardContent>
  )
}

function Team({ children }: { children: ReactNode }) {
  return (
    <div className="items-center flex flex-row gap-1 @5xl/playoff:gap-2 p-0.5 text-xs @2xs/playoff:text-sm @2xl/playoff:text-xs @4xl/playoff:text-sm">
      {children}
    </div>
  )
}

PlayoffCard.Title = Title
PlayoffCard.Group = Group
PlayoffCard.Result = Result
PlayoffCard.Content = Content
PlayoffCard.Team = Team

export default PlayoffCard
