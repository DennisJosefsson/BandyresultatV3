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
import { createResultBarChart } from '../-functions/barChart'
import { Tooltip } from './Tooltip'

type DivisionResultsProps = {
  data: Array<DivisionScoreStats>
}

const DivisionResults = ({
  data,
}: DivisionResultsProps) => {
  const seededTooltip = useRef(false)
  const divisionResultStats: ReadonlyArray<GoalBarStatValue> =
    data.map((s) => {
      return {
        divisionName: s.divisionName,
        homeAvg: s.homeWinAvg,
        awayAvg: s.awayWinAvg,
        totalAvg: s.drawAvg,
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

  const divisionResultStatsDefinition =
    createResultBarChart(divisionResultStats)

  const contentWidth = Math.max(1, 640 - 50)
  const chartWidth = Math.min(320, contentWidth)

  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>Resultatstatistik</CardTitle>
        <CardDescription>
          Per division - hemma-/bortavinst och oavgjort, i
          procent
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RendererChart
          definition={divisionResultStatsDefinition}
          renderer={renderer}
          initialWidth={chartWidth}
          aspectRatio={16 / 9}
          ariaLabel="Resultatstatistik - divisioner - procent"
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
              variant="result"
            />
          )}
        />
      </CardContent>
    </Card>
  )
}

export default DivisionResults
