import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/base/ui/card'

import type { ChartPoint } from '@tanstack/charts'
import { motion } from '@tanstack/charts/motion'
import { RendererChart } from '@tanstack/charts/react/tooltip'
import { useRef } from 'react'
import type { CronJobStatValue } from '../../-functions/CronJobFunctions/createBarChart'
import { createCronJobBarChart } from '../../-functions/CronJobFunctions/createBarChart'

type CronJobChartProps = {
  data: Array<CronJobStatValue>
}

const CronJobBarChart = ({ data }: CronJobChartProps) => {
  const seededTooltip = useRef(false)

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
    createCronJobBarChart(data)

  const contentWidth = Math.max(1, 640 - 50)
  const chartWidth = Math.min(320, contentWidth)

  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>CronJob-statistik</CardTitle>
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
                (candidate.datum as CronJobStatValue)
                  .jobId === 1,
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
                  ChartPoint<CronJobStatValue>
                >
              }
            />
          )}
        />
      </CardContent>
    </Card>
  )
}

export default CronJobBarChart

function Tooltip({
  points,
}: {
  points: ReadonlyArray<ChartPoint<CronJobStatValue>>
}) {
  return (
    <div className="sc-chart-tooltip w-54 h-24 bg-foreground text-background p-2 rounded-sm">
      {points.map((point, index) => (
        <div
          className="sc-shadcn-tooltip-row flex flex-col"
          key={`${point.datum.jobId}-${index}`}
        >
          <div>
            <span className="font-semibold">
              {point.datum.jobId}
            </span>
          </div>
          <div className="flex flex-row justify-between">
            <span>Genomsnitt</span>
            <span>
              {point.datum.averageDuration?.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-row justify-between">
            <span>Senaste</span>
            <span>
              {point.datum.latestDuration?.toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
