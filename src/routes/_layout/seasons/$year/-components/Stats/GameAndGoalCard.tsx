import type { ReactNode } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/base/ui/card'

const GameAndGoalCard = ({ children }: { children: ReactNode }) => {
  return <Card className="flex flex-col shadow-xs md:shadow-sm">{children}</Card>
}

function Header({ children }: { children: ReactNode }) {
  return <CardHeader className="items-center pb-0">{children}</CardHeader>
}

function Title({ children }: { children: ReactNode }) {
  return <CardTitle className="xs:text-xs text-[10px] sm:text-sm">{children}</CardTitle>
}

function Description({ children }: { children: ReactNode }) {
  return <CardDescription>{children}</CardDescription>
}

function Content({ children }: { children: ReactNode }) {
  return <CardContent className="flex-1 pb-0">{children}</CardContent>
}

GameAndGoalCard.Header = Header
GameAndGoalCard.Title = Title
GameAndGoalCard.Description = Description
GameAndGoalCard.Content = Content

export default GameAndGoalCard
