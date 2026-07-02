import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/base/ui/card'
import type { ChartConfig } from '@/components/base/ui/chart'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from '@/components/base/ui/chart'
import type { Stats } from '@/lib/types/stats'
import { Pie, PieChart } from 'recharts'
type GoalDataProps = {
  goalData: Pick<
    Stats,
    'awayGoalData' | 'homeGoalData' | 'goalData' | 'serie'
  >
}

const GoalData = ({ goalData }: GoalDataProps) => {
  const resultChartConfig = {
    goals: {
      label: 'mål',
    },

    homeGoals: {
      label: `Mål hemmalag ${goalData.homeGoalData.goalsScoredTotal.toLocaleString(
        'sv-SE',
      )} (${goalData.homeGoalData.goalsScoredAvg.toFixed(1)})`,
      color: 'var(--chart-2)',
    },
    awayGoals: {
      label: `Mål bortalag ${goalData.awayGoalData.goalsScoredTotal.toLocaleString(
        'sv-SE',
      )} (${goalData.awayGoalData.goalsScoredAvg.toFixed(1)})`,
      color: 'var(--chart-3)',
    },
  } satisfies ChartConfig

  const chartData = [
    {
      goals: 'homeGoals',
      value: goalData.homeGoalData.goalsScoredTotal,
      fill: 'var(--chart-2)',
    },
    {
      goals: 'awayGoals',
      value: goalData.awayGoalData.goalsScoredTotal,
      fill: 'var(--chart-3)',
    },
  ]

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-[10px] xs:text-xs sm:text-sm">{`Målstatistik - ${goalData.goalData.goalsScoredTotal.toLocaleString(
          'sv-SE',
        )} mål (${goalData.goalData.goalsScoredAvg.toFixed(2)} per match)`}</CardTitle>
        <CardDescription>
          {goalData.serie?.serieName ?? 'Slutspel'}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={resultChartConfig}
          className="mx-auto aspect-square max-h-80 min-h-40"
        >
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="goals"
              strokeWidth={5}
            />

            <ChartLegend
              content={
                <ChartLegendContent className="flex-col justify-items-center text-[10px] xs:text-xs sm:text-sm gap-0.5" />
              }
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default GoalData
