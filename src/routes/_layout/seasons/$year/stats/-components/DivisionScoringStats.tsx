import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/base/ui/card'
import { motion } from '@tanstack/charts/motion'
import type { ChartPoint } from '@tanstack/charts/react/tooltip'
import { RendererChart } from '@tanstack/charts/react/tooltip'
import { getRouteApi } from '@tanstack/react-router'
import { useRef } from 'react'
import type {
  GoalBarStatValue,
  ResultBarStatValue,
} from '../-functions/barChart'
import {
  createGoalBarChart,
  createResultBarChart,
} from '../-functions/barChart'
import { createPieChart } from '../-functions/pieChart'
const route = getRouteApi('/_layout/seasons/$year/stats/')

const DivisionScoringStats = () => {
  const seededTooltip = useRef(false)
  const data = route.useLoaderData()
  if (data.status === 404) return null

  const allResultStats = [
    {
      value: data.stats.allStats.homeWinCount,
      label: `Hemma ${data.stats.allStats.homeWinAvg?.toLocaleString()} %`,
    },
    {
      value: data.stats.allStats.awayWinCount,
      label: `Borta ${data.stats.allStats.awayWinAvg?.toLocaleString()} %`,
    },
    {
      value: data.stats.allStats.drawCount,
      label: `Oavgjort ${data.stats.allStats.drawAvg?.toLocaleString()} %`,
    },
  ]

  const allGoalStats = [
    {
      value: data.stats.allStats.homeGoalsScored,
      label: `Hemma ${data.stats.allStats.homeAvgGoalsScored?.toLocaleString()} mål/m`,
    },
    {
      value: data.stats.allStats.awayGoalsScored,
      label: `Borta ${data.stats.allStats.awayAvgGoalsScored?.toLocaleString()} mål/m`,
    },
  ]

  const divisionScoringStats: ReadonlyArray<GoalBarStatValue> =
    data.stats.divisionStats.map((s) => {
      return {
        divisionName: s.divisionName,
        homeAvg: s.homeAvgGoalsScored,
        awayAvg: s.awayAvgGoalsScored,
        totalAvg: s.avgGoalsScored,
      }
    })

  const divisionResultStats: ReadonlyArray<ResultBarStatValue> =
    data.stats.divisionStats.flatMap((s) => {
      return [
        {
          count: s.drawAvg,
          divisionName: s.divisionName,
          domain: 'Oavgjort',
        },
        {
          count: s.homeWinAvg,
          divisionName: s.divisionName,
          domain: 'Hemma',
        },
        {
          count: s.awayWinAvg,
          divisionName: s.divisionName,
          domain: 'Borta',
        },
      ]
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

  const allResultStatsDefinition =
    createPieChart(allResultStats)
  const allGoalStatsDefinition =
    createPieChart(allGoalStats)

  const divisionScoringStatsDefinition = createGoalBarChart(
    divisionScoringStats,
  )

  const divisionResultStatsDefinition =
    createResultBarChart(divisionResultStats)

  const contentWidth = Math.max(1, 640 - 50)
  const chartWidth = Math.min(320, contentWidth)
  const chartHeight = chartWidth
  return (
    <div className="@container flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold text-xs sm:text-sm">
          Säsongsstatistik
        </h1>
      </div>
      <div className="grid grid-cols-1 @5xl:grid-cols-2 gap-2 sm:gap-8">
        <Card size="sm">
          <CardHeader>
            <CardTitle>
              Resultat - vinstdistribution
            </CardTitle>
            <CardDescription>
              Alla divisioner
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
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardTitle>
              {`Målstatistik - ${data.stats.allStats.goalsScored?.toLocaleString()} mål (${data.stats.allStats.avgGoalsScored?.toLocaleString()} mål/m)`}
            </CardTitle>
            <CardDescription>
              Alla divisioner{' '}
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
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardTitle>Målstatistik</CardTitle>
            <CardDescription>
              Per division, mål per match
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RendererChart
              definition={divisionScoringStatsDefinition}
              renderer={renderer}
              initialWidth={chartWidth}
              aspectRatio={16 / 9}
              ariaLabel="Målstatistik - divisioner - mål per match"
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
                <GoalTooltip
                  points={
                    points as ReadonlyArray<
                      ChartPoint<GoalBarStatValue>
                    >
                  }
                />
              )}
            />
          </CardContent>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardTitle>Resultatstatistik</CardTitle>
            <CardDescription>
              Per division, procent
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
                    (candidate.datum as ResultBarStatValue)
                      .divisionName === 'Högsta divisionen',
                )
                if (!point) return
                seededTooltip.current = true
                interaction.setControlledFocus(point, {
                  source: 'programmatic',
                })
              }}
              renderTooltipBody={({ points }) => (
                <ResultTooltip
                  points={
                    points as ReadonlyArray<
                      ChartPoint<ResultBarStatValue>
                    >
                  }
                />
              )}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DivisionScoringStats

function GoalTooltip({
  points,
}: {
  points: ReadonlyArray<ChartPoint<GoalBarStatValue>>
}) {
  return (
    <div className="sc-chart-tooltip w-48 h-24 bg-foreground text-background p-2 rounded-sm">
      {points.map((point) => (
        <div
          className="sc-shadcn-tooltip-row flex flex-col"
          key={point.datum.divisionName}
        >
          <div>
            <span className="font-semibold">
              {point.datum.divisionName}
            </span>
          </div>
          <div className="flex flex-row justify-between">
            <span>Totalt</span>
            <span>
              {point.datum.totalAvg?.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-row justify-between">
            <span>Hemma</span>
            <span>
              {point.datum.homeAvg?.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-row justify-between">
            <span>Borta</span>
            <span>
              {point.datum.awayAvg?.toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

function ResultTooltip({
  points,
}: {
  points: ReadonlyArray<ChartPoint<ResultBarStatValue>>
}) {
  return (
    <div className="sc-chart-tooltip w-48 h-24 bg-foreground text-background p-2 rounded-sm">
      {points.map((point) => (
        <div
          className="sc-shadcn-tooltip-row flex flex-col"
          key={point.datum.divisionName}
        >
          <div>
            <span className="font-semibold">
              {point.datum.divisionName}
            </span>
          </div>
          <div className="flex flex-row justify-between">
            <span>{point.datum.domain}</span>
            <span>
              {`${point.datum.count?.toLocaleString()} %`}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
