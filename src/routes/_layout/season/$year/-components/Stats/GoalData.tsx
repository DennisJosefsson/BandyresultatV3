import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import { Stats } from '@/lib/types/stats'
import { Label, Pie, PieChart } from 'recharts'
type GoalDataProps = {
  goalData: Pick<Stats, 'awayGoalData' | 'homeGoalData' | 'goalData' | 'serie'>
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
        <CardTitle>Målstatistik</CardTitle>
        <CardDescription>
          {goalData.serie?.serieName ?? 'Slutspel'}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={resultChartConfig}
          className="mx-auto aspect-square max-h-80"
        >
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="goals"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {goalData.goalData.goalsScoredTotal.toLocaleString(
                            'sv-SE',
                          )}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          mål
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>

            <ChartLegend
              content={
                <ChartLegendContent className="flex-col items-center-safe md:text-sm" />
              }
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default GoalData
