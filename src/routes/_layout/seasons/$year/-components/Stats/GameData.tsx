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
type GameDataProps = {
  gameData: Pick<
    Stats,
    | 'awayGameData'
    | 'homeGameData'
    | 'gameCount'
    | 'drawData'
    | 'serie'
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
      label: `Bortaseger ${gameData.awayGameData.winTotal.toLocaleString(
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
        <CardTitle className="text-[10px] xs:text-xs sm:text-sm">{`Matchstatistik - ${gameData.gameCount.toLocaleString(
          'sv-SE',
        )} matcher`}</CardTitle>
        <CardDescription>
          {gameData.serie?.serieName ?? 'Slutspel'}
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
              nameKey="result"
              strokeWidth={5}
            />

            <ChartLegend
              content={
                <ChartLegendContent className="flex-col items-center-safe text-[10px] xs:text-xs sm:text-sm gap-0.5" />
              }
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default GameData
