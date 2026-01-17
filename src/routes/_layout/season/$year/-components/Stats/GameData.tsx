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
type GameDataProps = {
  gameData: Pick<
    Stats,
    'awayGameData' | 'homeGameData' | 'gameCount' | 'drawData' | 'serie'
  >
}

const GameData = ({ gameData }: GameDataProps) => {
  const resultChartConfig = {
    games: {
      label: 'matcher',
    },
    home: {
      label: `Hemmaseger ${gameData.homeGameData.winTotal.toLocaleString(
        'sv-SE',
      )} (${gameData.homeGameData.winAvg} %)`,
      color: 'var(--chart-1)',
    },
    away: {
      label: `Bortseger ${gameData.awayGameData.winTotal.toLocaleString(
        'sv-SE',
      )} (${gameData.awayGameData.winAvg} %)`,
      color: 'var(--chart-2)',
    },
    draw: {
      label: `Oavgjort ${gameData.drawData.drawTotal.toLocaleString(
        'sv-SE',
      )} (${gameData.drawData.drawAvg} %)`,
      color: 'var(--chart-3)',
    },
  } satisfies ChartConfig

  const chartData = [
    {
      result: 'home',
      value: gameData.homeGameData.winTotal,
      fill: 'var(--chart-1)',
    },
    {
      result: 'away',
      value: gameData.awayGameData.winTotal,
      fill: 'var(--chart-2)',
    },
    {
      result: 'draw',
      value: gameData.drawData.drawTotal,
      fill: 'var(--chart-3)',
    },
  ]

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Matchstatistik</CardTitle>
        <CardDescription>
          {gameData.serie?.serieName ?? 'Slutspel'}
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
              nameKey="result"
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
                          {gameData.gameCount.toLocaleString('sv-SE')}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          matcher
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

export default GameData
