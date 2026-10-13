import {
  colorLegend,
  colorLegendItems,
  defineChart,
} from '@tanstack/charts'
import {
  pie,
  polar,
  radialArc,
  radialText,
} from '@tanstack/charts/polar'
import { scaleLinear } from '@tanstack/charts/scales/linear'
interface PieStatValue {
  value: number | null
  label: string
}

export function createPieChart(
  stats: ReadonlyArray<PieStatValue>,
) {
  const arcs = pie(stats, {
    value: 'value',
    startAngle: Math.PI / 2,
    endAngle: (-Math.PI * 3) / 2,
  })

  const marks = [
    radialArc(arcs, {
      id: 'data-slices',
      key: 'label',
      innerRadius: undefined,
      color: 'label',
      stroke: 'var(--background)',
      strokeWidth: 5,
      cornerRadius: 5,
    }),
    radialText(arcs, {
      id: 'data-labels',
      angle: 'angle',
      radius: 0.68,
      radiusOffset: 0,
      text: (row) => row.value.toString(),
      key: 'value',
      anchor: 'middle',
      fill: 'var(--foreground)',
      fontSize: 14,
      fontWeight: 600,
    }),
  ]

  const labels = stats.map((v) => v.label)

  const colors = [
    '#2563eb',
    '#f97316',
    '#10b981',
    '#8b5cf6',
    '#ec4899',
    '#06b6d4',
  ]

  return defineChart(
    {
      marks: [
        polar({
          radiusRatio: 0.78,
          scales: {
            angle: {
              scale: scaleLinear().domain([0, Math.PI * 2]),
            },
            radius: { scale: scaleLinear().domain([0, 1]) },
          },
          marks,
        }),
      ],
      scales: {
        x: null,
        y: null,
      },
      color: {
        domain: labels,
        range: colors,
        legend: colorLegend<string>({
          placement: 'bottom',
          items: colorLegendItems({
            justify: 'center',
            gap: 12,
            rowGap: 8,
            indicator: {
              shape: 'square',
              width: 12,
              height: 12,
              gap: 6,
            },
            label: {
              fontSize: 14,
              fill: 'var(--foreground)',
            },
          }),
        }),
      },
      margin: { top: 0, right: 0, left: 0 },
    },
    {
      svgAnimation: false,
      focus: false,
    },
  )
}
