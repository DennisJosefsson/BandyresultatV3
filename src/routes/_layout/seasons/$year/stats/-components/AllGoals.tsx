import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/base/ui/card'
import type { ScoreStats } from '@/lib/types/stats'
import { motion } from '@tanstack/charts/motion'
import { RendererChart } from '@tanstack/charts/react/tooltip'
import { createPieChart } from '../-functions/pieChart'

type AllGoalsProps = {
  data: ScoreStats
}

const AllGoals = ({ data }: AllGoalsProps) => {
  const allGoalStats = [
    {
      value: data.homeGoalsScored,
      label: `Hemma ${data.homeAvgGoalsScored?.toLocaleString()} mål/m`,
    },
    {
      value: data.awayGoalsScored,
      label: `Borta ${data.awayAvgGoalsScored?.toLocaleString()} mål/m`,
    },
  ]

  const renderer = motion({
    initial: 'always',
    transition: {
      type: 'spring',
      stiffness: 170,
      damping: 18,
      mass: 1,
    },
  })

  const allGoalStatsDefinition =
    createPieChart(allGoalStats)

  const contentWidth = Math.max(1, 640 - 50)
  const chartWidth = Math.min(320, contentWidth)
  const chartHeight = chartWidth

  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>Målstatistik</CardTitle>
        <CardDescription>
          Alla divisioner, genomsnitt antal mål
          hemma-/bortalag och totalt
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RendererChart
          definition={allGoalStatsDefinition}
          renderer={renderer}
          initialWidth={chartWidth}
          height={chartHeight}
          ariaLabel="Målstatistik - alla divisioner"
        />
      </CardContent>
      <CardFooter>{`Totalt ${data.goalsScored?.toLocaleString()} mål (${data.avgGoalsScored?.toLocaleString()} mål/m).`}</CardFooter>
    </Card>
  )
}

export default AllGoals
