import { useNavigate, useSearch } from '@tanstack/react-router'
import { useEffect } from 'react'
import useSearchMutation from './useSearchMutation'

export const useSearchResults = () => {
  const searchParams = useSearch({ from: '/_layout/search' })
  const navigate = useNavigate({ from: '/search' })
  const { data: searchResult, mutate, reset } = useSearchMutation()

  useEffect(() => {
    if (searchParams.submit) {
      mutate()
    }
    navigate({ search: (prev) => ({ ...prev, submit: undefined }) })
  }, [searchParams, mutate, navigate])

  if (searchResult && searchResult.status === 200) {
    return {
      error: false,
      isSearchResultSuccess: true,
      searchResult,
      sendSearchRequest: mutate,
      reset,
    }
  }

  return {
    error: true,
    isSearchResultSuccess: false,
    searchResult,
    sendSearchRequest: mutate,
    reset,
  }
}
