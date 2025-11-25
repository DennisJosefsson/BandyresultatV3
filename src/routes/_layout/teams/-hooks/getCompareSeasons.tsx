import { useLoaderData, useSearch } from '@tanstack/react-router'

export const useCompareSeasons = () => {
  const seasons = useLoaderData({ from: '/_layout/teams/selection' })
  const { women } = useSearch({
    from: '__root__',
  })

  const reversedSeasons = [...seasons].sort((a, b) => a.seasonId - b.seasonId)
  const startOptions = reversedSeasons
    .filter((item) => item.women === women)
    .map((season) => {
      return { label: season.year, value: season.seasonId }
    })

  const endOptions = seasons
    .filter((item) => item.women === women)
    .map((season) => {
      return { label: season.year, value: season.seasonId }
    })

  const endOptionsPlaceholder = endOptions[0]?.label

  return { startOptions, endOptions, endOptionsPlaceholder }
}
