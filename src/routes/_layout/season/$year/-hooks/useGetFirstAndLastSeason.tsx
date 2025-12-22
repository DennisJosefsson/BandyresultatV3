import { useSuspenseQuery } from '@tanstack/react-query'
import { getFirstAndLastSeason } from '../-functions/getFirstAndLastSeasons'

export const useGetFirstAndLastSeason = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['firstAndLastSeason'],
    queryFn: getFirstAndLastSeason,
  })

  return data
}
