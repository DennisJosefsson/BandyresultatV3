import type { competitions } from '@/db/schema'
import type { Serie } from '@/lib/types/serie'

type SeasonSeries = Serie & {
  competition: typeof competitions.$inferSelect | null
}

type SortedSeasonSeries = Record<
  string,
  Array<SeasonSeries>
>

export function sortSeasonSeries(
  seasonSeries: Array<SeasonSeries>,
) {
  const seriesArray = seasonSeries.reduce(
    (series, serie) => {
      if (!serie.competition?.competitionName)
        throw new Error('Competition saknas')

      if (!series[serie.competition.competitionName]) {
        series[serie.competition.competitionName] = []
      }
      series[serie.competition.competitionName].push(serie)
      return series
    },
    {} as SortedSeasonSeries,
  )

  const sortedTables = Object.keys(seriesArray).map(
    (competition) => {
      const competitionObject = seasonSeries.find(
        (s) =>
          s.competition?.competitionName === competition,
      )
      if (!competitionObject)
        throw new Error('Turnering saknas')
      return {
        competition,
        competitionId: competitionObject.competitionId,
        series: seriesArray[competition],
      }
    },
  )

  return sortedTables
}
