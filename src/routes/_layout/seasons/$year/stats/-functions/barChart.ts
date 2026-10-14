import {
  barX,
  colorLegend,
  colorLegendItems,
  defineChart,
  group,
  whenFocused,
} from '@tanstack/charts'
import { scaleBand } from '@tanstack/charts/scales/band'
import { scaleLinear } from '@tanstack/charts/scales/linear'
import { tooltip } from '@tanstack/charts/tooltip'
export interface GoalBarStatValue {
  homeAvg: number | null
  awayAvg: number | null
  totalAvg: number | null
  divisionName: string
}

export interface ResultBarStatValue {
  count: number | null
  domain: 'Hemma' | 'Borta' | 'Oavgjort'
  divisionName: string
}

type GoalBarSlot = 'stack' | 'independent'

const groupedGoalDomain = ['Hemma', 'Borta', 'Totalt']
const groupedResultDomain = [
  'Hemma',
  'Borta',
  'Oavgjort',
] as const

const colors = [
  '#2563eb',
  '#f97316',
  '#10b981',
  '#8b5cf6',
  '#ec4899',
  '#06b6d4',
]

export function createResultBarChart(
  stats: ReadonlyArray<GoalBarStatValue>,
) {
  return defineChart(
    {
      chart: ({ width }) => ({
        marks: [
          barX(stats, {
            x1: 0,
            x2: 'homeAvg',
            y: (row) => divLabel(width, row),
            z: () => 'stack',
            color: 'divisionName',
            key: (row) =>
              `${row.divisionName}-${row.homeAvg}-homeAvg-result`,
            fill: '#2563eb',
            fillOpacity: 0.75,
          }),
          barX(stats, {
            x1: 'homeAvg',
            x2: (row) =>
              (row.homeAvg ? row.homeAvg : 0) +
              (row.awayAvg ? row.awayAvg : 0),
            y: (row) => divLabel(width, row),
            z: () => 'stack',
            color: 'divisionName',
            key: (row) =>
              `${row.divisionName}-${row.awayAvg}-awayAvg-result`,
            fill: '#f97316',
            fillOpacity: 0.75,
          }),
          barX(stats, {
            x1: (row) =>
              (row.homeAvg ? row.homeAvg : 0) +
              (row.awayAvg ? row.awayAvg : 0),
            x2: (row) =>
              (row.homeAvg ? row.homeAvg : 0) +
              (row.awayAvg ? row.awayAvg : 0) +
              (row.totalAvg ? row.totalAvg : 0),
            y: (row) => divLabel(width, row),
            z: () => 'stack',
            color: 'divisionName',
            key: (row) =>
              `${row.divisionName}-${row.totalAvg}-allAvg-result`,
            radius: [0, 2, 2, 0],
            fill: '#10b981',
            fillOpacity: 0.75,
          }),
          whenFocused(
            barX(stats, {
              x1: 0,
              x2: 'homeAvg',
              y: (row) => divLabel(width, row),
              z: () => 'stack',
              color: 'divisionName',
              key: (row) =>
                `${row.divisionName}-${row.homeAvg}-homeAvg-result`,
              fill: '#2563eb',
            }),
          ),
          whenFocused(
            barX(stats, {
              x1: 'homeAvg',
              x2: (row) =>
                (row.homeAvg ? row.homeAvg : 0) +
                (row.awayAvg ? row.awayAvg : 0),
              y: (row) => divLabel(width, row),
              z: () => 'stack',
              color: 'divisionName',
              key: (row) =>
                `${row.divisionName}-${row.awayAvg}-awayAvg-result`,
              fill: '#f97316',
            }),
          ),
          whenFocused(
            barX(stats, {
              x1: (row) =>
                (row.homeAvg ? row.homeAvg : 0) +
                (row.awayAvg ? row.awayAvg : 0),
              x2: (row) =>
                (row.homeAvg ? row.homeAvg : 0) +
                (row.awayAvg ? row.awayAvg : 0) +
                (row.totalAvg ? row.totalAvg : 0),
              y: (row) => divLabel(width, row),
              z: () => 'stack',
              color: 'divisionName',
              key: (row) =>
                `${row.divisionName}-${row.totalAvg}-allAvg-result`,
              radius: [0, 2, 2, 0],
              fill: '#10b981',
            }),
          ),
        ],
        scales: {
          x: { scale: scaleLinear, axis: undefined },
          y: {
            scale: () =>
              scaleBand<string>()
                .paddingInner(0.18)
                .paddingOuter(0.08),
            axis: {
              line: false,
              ticks: { size: 0, padding: 6 },
            },
          },
        },
        color: {
          domain: groupedResultDomain,
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
          bottom: width < 320 ? 80 : 64,
          left: width < 320 ? 100 : width < 640 ? 120 : 150,
        },
      }),
    },
    {
      svgAnimation: true,
      focus: 'nearest-y',
      focusRing: false,
      tooltip: {
        use: tooltip,
        className: 'sc-chart-tooltip',
        anchor: (_points, context) => ({
          x: context.surface.width * 0.221,
          y: context.surface.height * 0.554,
        }),
        placement: 'bottom-right',
        offset: 0,
        sort: 'color-domain',
        content: () => ({ rows: [] }),
      },
    },
  )
}

const groupScale = scaleBand<GoalBarSlot>()
  .domain(['stack', 'independent'])
  .paddingInner(0.08)
  .paddingOuter(0)

export function createGoalBarChart(
  stats: ReadonlyArray<GoalBarStatValue>,
) {
  return defineChart(
    {
      chart: ({ width }) => ({
        marks: [
          barX(stats, {
            x1: 0,
            x2: 'homeAvg',
            y: (row) => divLabel(width, row),
            z: () => 'stack',
            color: 'divisionName',
            key: (row) =>
              `${row.divisionName}-${row.homeAvg}-homeAvg`,
            layout: group({ scale: groupScale }),
            radius: 0,
            fill: '#2563eb',
            fillOpacity: 0.75,
          }),
          barX(stats, {
            x1: 'homeAvg',
            x2: (row) =>
              (row.homeAvg ? row.homeAvg : 0) +
              (row.awayAvg ? row.awayAvg : 0),
            y: (row) => divLabel(width, row),
            z: () => 'stack',
            color: 'divisionName',
            key: (row) =>
              `${row.divisionName}-${row.awayAvg}-awayAvg`,
            layout: group({ scale: groupScale }),
            radius: [0, 2, 2, 0],
            fill: '#f97316',
            fillOpacity: 0.75,
          }),
          barX(stats, {
            x: 'totalAvg',
            y: (row) => divLabel(width, row),
            z: () => 'independent',
            color: 'divisionName',
            key: (row) =>
              `${row.divisionName}-${row.totalAvg}-allAvg`,
            layout: group({ scale: groupScale }),
            radius: [0, 2, 2, 0],
            fill: '#10b981',
            fillOpacity: 0.75,
          }),
          whenFocused(
            barX(stats, {
              x1: 0,
              x2: 'homeAvg',
              y: (row) => divLabel(width, row),
              z: () => 'stack',
              color: 'divisionName',
              key: (row) =>
                `${row.divisionName}-${row.homeAvg}-homeAvg-focus`,
              layout: group({ scale: groupScale }),
              radius: 0,
              fill: '#2563eb',
            }),
          ),
          whenFocused(
            barX(stats, {
              x1: 'homeAvg',
              x2: (row) =>
                (row.homeAvg ? row.homeAvg : 0) +
                (row.awayAvg ? row.awayAvg : 0),
              y: (row) => divLabel(width, row),
              z: () => 'stack',
              color: 'divisionName',
              key: (row) =>
                `${row.divisionName}-${row.awayAvg}-awayAvg-focus`,
              layout: group({ scale: groupScale }),
              radius: [0, 2, 2, 0],
              fill: '#f97316',
            }),
          ),
          whenFocused(
            barX(stats, {
              x: 'totalAvg',
              y: (row) => divLabel(width, row),
              z: () => 'independent',
              color: 'divisionName',
              key: (row) =>
                `${row.divisionName}-${row.totalAvg}-allAvg-focus`,
              layout: group({ scale: groupScale }),
              radius: [0, 2, 2, 0],
              fill: '#10b981',
            }),
          ),
        ],
        scales: {
          x: { scale: scaleLinear, axis: undefined },
          y: {
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
          domain: groupedGoalDomain,
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
      focus: 'nearest-y',
      focusRing: false,
      tooltip: {
        use: tooltip,
        className:
          'sc-chart-tooltip data-active:ring-2 data-active:ring-blue-500',
        anchor: (_points, context) => ({
          x: context.surface.width * 0.221,
          y: context.surface.height * 0.554,
        }),
        placement: 'bottom-right',
        offset: 0,
        sort: 'color-domain',
        content: () => ({ rows: [] }),
      },
    },
  )
}

function divLabel(
  width: number,
  row: NoInfer<GoalBarStatValue | ResultBarStatValue>,
): string {
  if (width > 640) {
    return row.divisionName
  }
  if (width > 320) {
    return row.divisionName.replace('divisionen', 'div')
  }

  return row.divisionName
    .replace('divisionen', 'div')
    .replace('näst', 'n.')
    .replace('till', 't.')
}
