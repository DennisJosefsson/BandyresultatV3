import { Pie, PieChart } from 'recharts'
import type { Stats } from '@/lib/types/stats'
import type { ChartConfig } from '@/components/base/ui/chart'
import { ChartContainer, ChartLegend, ChartLegendContent } from '@/components/base/ui/chart'
import GameAndGoalCard from './GameAndGoalCard'
type GameDataProps = {
  gameData: Pick<Stats, 'awayGameData' | 'homeGameData' | 'gameCount' | 'drawData' | 'serie'>
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
    <GameAndGoalCard>
      <GameAndGoalCard.Header>
        <GameAndGoalCard.Title>{`Matchstatistik - ${gameData.gameCount.toLocaleString(
          'sv-SE',
        )} matcher`}</GameAndGoalCard.Title>
        <GameAndGoalCard.Description>
          {gameData.serie?.serieName ?? 'Slutspel'}
        </GameAndGoalCard.Description>
      </GameAndGoalCard.Header>
      <GameAndGoalCard.Content>
        <ChartContainer
          config={resultChartConfig}
          className="mx-auto aspect-square max-h-80 min-h-40"
        >
          <PieChart>
            <Pie data={chartData} dataKey="value" nameKey="result" strokeWidth={5} />

            <ChartLegend
              content={
                <ChartLegendContent className="xs:text-xs flex-col items-center-safe gap-0.5 text-[10px] sm:text-sm" />
              }
            />
          </PieChart>
        </ChartContainer>
      </GameAndGoalCard.Content>
    </GameAndGoalCard>
  )
}

export default GameData
