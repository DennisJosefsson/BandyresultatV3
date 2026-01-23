import { useMutation } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import { getSearchResults } from '../-functions/getSearchResults'

const route = getRouteApi('/_layout/search')

const useSearchMutation = () => {
  const data = route.useSearch()
  const mutation = useMutation({ mutationFn: () => getSearchResults({ data }) })

  return mutation
}

export default useSearchMutation
