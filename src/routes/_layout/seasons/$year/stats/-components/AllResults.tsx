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

type AllResultsProps = {
  data: ScoreStats
}

const AllResults = ({ data }: AllResultsProps) => {
  const allResultStats = [
    {
      value: data.homeWinCount,
      label: `Hemma ${data.homeWinAvg?.toLocaleString()} %`,
    },
    {
      value: data.awayWinCount,
      label: `Borta ${data.awayWinAvg?.toLocaleString()} %`,
    },
    {
      value: data.drawCount,
      label: `Oavgjort ${data.drawAvg?.toLocaleString()} %`,
    },
  ]

  const allResultStatsDefinition =
    createPieChart(allResultStats)

  const renderer = motion({
    initial: 'always',
    transition: {
      type: 'spring',
      stiffness: 170,
      damping: 18,
      mass: 1,
    },
  })

  const contentWidth = Math.max(1, 640 - 50)
  const chartWidth = Math.min(320, contentWidth)
  const chartHeight = chartWidth

  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>Resultat</CardTitle>
        <CardDescription>
          Alla divisioner - hemma-/bortavinst och oavgjort,
          antal matcher
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RendererChart
          definition={allResultStatsDefinition}
          renderer={renderer}
          initialWidth={chartWidth}
          height={chartHeight}
          ariaLabel="Resultat"
        />
      </CardContent>
      <CardFooter>{`Totalt ${data.gameCount?.toLocaleString()} matcher.`}</CardFooter>
    </Card>
  )
}

export default AllResults
