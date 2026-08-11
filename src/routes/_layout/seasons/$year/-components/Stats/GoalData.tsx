import type { ChartConfig } from '@/components/base/ui/chart'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from '@/components/base/ui/chart'
import type { Stats } from '@/lib/types/stats'
import { Pie, PieChart } from 'recharts'
import GameAndGoalCard from './GameAndGoalCard'
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
    <GameAndGoalCard>
      <GameAndGoalCard.Header>
        <GameAndGoalCard.Title>{`Målstatistik - ${goalData.goalData.goalsScoredTotal.toLocaleString(
          'sv-SE',
        )} mål (${goalData.goalData.goalsScoredAvg.toFixed(2)} per match)`}</GameAndGoalCard.Title>
        <GameAndGoalCard.Description>
          {goalData.serie?.serieName ?? 'Slutspel'}
        </GameAndGoalCard.Description>
      </GameAndGoalCard.Header>
      <GameAndGoalCard.Content>
        <ChartContainer
          config={resultChartConfig}
          className="mx-auto aspect-square max-h-80 min-h-40"
        >
          <PieChart className="min-w-full min-h-full">
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="goals"
              strokeWidth={5}
            />

            <ChartLegend
              content={
                <ChartLegendContent className="flex-col justify-items-center gap-0.5 text-[8px] xxs:text-[10px] xs:text-xs sm:text-sm xl:text-base" />
              }
            />
          </PieChart>
        </ChartContainer>
      </GameAndGoalCard.Content>
    </GameAndGoalCard>
  )
}

export default GoalData
