import type { ChartPoint } from '@tanstack/charts'
import type { GoalBarStatValue } from '../-functions/barChart'

export function Tooltip({
  variant,
  points,
}: {
  variant: 'result' | 'goal'
  points: ReadonlyArray<ChartPoint<GoalBarStatValue>>
}) {
  return (
    <div className="sc-chart-tooltip w-54 h-24 bg-foreground text-background p-2 rounded-sm">
      {points.map((point, index) => (
        <div
          className="sc-shadcn-tooltip-row flex flex-col"
          key={`${point.datum.divisionName}-${index}`}
        >
          <div>
            <span className="font-semibold">
              {point.datum.divisionName}
            </span>
          </div>
          {variant === 'result' ? (
            <>
              <div className="flex flex-row justify-between">
                <span>Hemmavinst</span>
                <span>
                  {`${point.datum.homeAvg?.toLocaleString()} %`}
                </span>
              </div>
              <div className="flex flex-row justify-between">
                <span>Bortavinst</span>
                <span>
                  {`${point.datum.awayAvg?.toLocaleString()} %`}
                </span>
              </div>
              <div className="flex flex-row justify-between">
                <span>Oavgjort</span>
                <span>
                  {`${point.datum.totalAvg?.toLocaleString()} %`}
                </span>
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      ))}
    </div>
  )
}
