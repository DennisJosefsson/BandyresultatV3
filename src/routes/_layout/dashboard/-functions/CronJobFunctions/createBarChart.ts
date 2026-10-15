import {
  barY,
  colorLegend,
  colorLegendItems,
  defineChart,
  group,
  whenFocused,
} from '@tanstack/charts'
import { scaleBand } from '@tanstack/charts/scales/band'
import { scaleLinear } from '@tanstack/charts/scales/linear'
import { tooltip } from '@tanstack/charts/tooltip'

export interface CronJobStatValue {
  jobId: number
  averageDuration: number
  latestDuration: number
}

type StatSlots = 'latest' | 'average'

const groupedStats = ['Senaste', 'Genomsnitt']

const colors = [
  '#2563eb',
  '#f97316',
  '#10b981',
  '#8b5cf6',
  '#ec4899',
  '#06b6d4',
]

const groupScale = scaleBand<StatSlots>()
  .domain(['latest', 'average'])
  .paddingInner(0.08)
  .paddingOuter(0)

export function createCronJobBarChart(
  stats: ReadonlyArray<CronJobStatValue>,
) {
  return defineChart(
    {
      chart: ({ width }) => ({
        marks: [
          barY(stats, {
            x: 'jobId',
            y: 'latestDuration',
            z: () => 'latest',
            color: 'jobId',
            key: (row) => `${row.jobId}-latest`,
            layout: group({ scale: groupScale }),
            radius: 0,
            fill: '#2563eb',
            fillOpacity: 0.75,
          }),
          barY(stats, {
            x: 'jobId',
            y: 'averageDuration',
            z: () => 'average',
            color: 'jobId',
            key: (row) => `${row.jobId}-average`,
            layout: group({ scale: groupScale }),
            radius: 0,
            fill: '#f97316',
            fillOpacity: 0.75,
          }),

          whenFocused(
            barY(stats, {
              x: 'jobId',
              y: 'latestDuration',
              z: () => 'latest',
              color: 'jobId',
              key: (row) => `${row.jobId}-latest-focus`,
              layout: group({ scale: groupScale }),
              radius: 0,
              fill: '#2563eb',
            }),
          ),
          whenFocused(
            barY(stats, {
              x: 'jobId',
              y: 'averageDuration',
              z: () => 'average',
              color: 'jobId',
              key: (row) => `${row.jobId}-average`,
              layout: group({ scale: groupScale }),
              radius: 0,
              fill: '#f97316',
            }),
          ),
        ],
        scales: {
          y: { scale: scaleLinear, axis: undefined },
          x: {
            scale: () =>
              scaleBand<string>()
                .paddingInner(0.18)
                .paddingOuter(0.08),
            axis: {
              line: true,
              ticks: { size: 0, padding: 6 },
            },
          },
        },
        color: {
          domain: groupedStats,
          range: colors,
          legend: colorLegend<string>({
            placement: 'bottom',
            items: colorLegendItems({
              justify: 'center',
              gap: width < 320 ? 4 : 12,
              rowGap: 8,
              indicator: {
                shape: 'square',
                width: width < 640 ? 8 : 12,
                height: width < 640 ? 8 : 12,
                gap: width < 320 ? 4 : width < 640 ? 8 : 12,
              },
              label: {
                fontSize: width < 640 ? 10 : 14,
                fill: 'var(--foreground)',
              },
            }),
          }),
        },
        margin: {
          top: 2,
          right: 5,
          bottom: 64,
          left: width < 320 ? 100 : width < 640 ? 120 : 150,
        },
      }),
    },
    {
      svgAnimation: true,
      focus: 'nearest-x',
      focusRing: false,
      tooltip: {
        use: tooltip,
        className:
          'sc-chart-tooltip data-active:ring-2 data-active:ring-blue-500',
        anchor: (_points, context) => ({
          x: context.surface.width * 0.2,
          y: context.surface.height * 0.05,
        }),
        placement: 'bottom-right',
        offset: 0,
        sort: 'color-domain',
        content: () => ({ rows: [] }),
      },
    },
  )
}
