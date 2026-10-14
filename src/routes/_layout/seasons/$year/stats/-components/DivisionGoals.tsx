import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/base/ui/card'
import type { DivisionScoreStats } from '@/lib/types/stats'
import type { ChartPoint } from '@tanstack/charts'
import { motion } from '@tanstack/charts/motion'
import { RendererChart } from '@tanstack/charts/react/tooltip'
import { useRef } from 'react'
import type { GoalBarStatValue } from '../-functions/barChart'
import { createGoalBarChart } from '../-functions/barChart'
import { Tooltip } from './Tooltip'

type DivisionGoalsProps = {
  data: Array<DivisionScoreStats>
}

const DivisionGoals = ({ data }: DivisionGoalsProps) => {
  const seededTooltip = useRef(false)
  const divisionScoringStats: ReadonlyArray<GoalBarStatValue> =
    data.map((s) => {
      return {
        divisionName: s.divisionName,
        homeAvg: s.homeAvgGoalsScored,
        awayAvg: s.awayAvgGoalsScored,
        totalAvg: s.avgGoalsScored,
      }
    })

  const renderer = motion({
    initial: 'always',
    transition: {
      type: 'spring',
      stiffness: 170,
      damping: 18,
      mass: 1,
    },
  })

  const divisionScoringStatsDefinition = createGoalBarChart(
    divisionScoringStats,
  )

  const contentWidth = Math.max(1, 640 - 50)
  const chartWidth = Math.min(320, contentWidth)

  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>Målstatistik</CardTitle>
        <CardDescription>
          Per division, genomsnitt antal mål hemma-/bortalag
          och totalt
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RendererChart
          definition={divisionScoringStatsDefinition}
          renderer={renderer}
          initialWidth={chartWidth}
          aspectRatio={16 / 9}
          ariaLabel="Målstatistik - divisioner - per match"
          onRender={({ scene, interaction }) => {
            if (seededTooltip.current) return
            const point = scene.points.find(
              (candidate) =>
                (candidate.datum as GoalBarStatValue)
                  .divisionName === 'Högsta divisionen',
            )
            if (!point) return
            seededTooltip.current = true
            interaction.setControlledFocus(point, {
              source: 'programmatic',
            })
          }}
          renderTooltipBody={({ points }) => (
            <Tooltip
              points={
                points as ReadonlyArray<
                  ChartPoint<GoalBarStatValue>
                >
              }
              variant="goal"
            />
          )}
        />
      </CardContent>
    </Card>
  )
}

export default DivisionGoals
