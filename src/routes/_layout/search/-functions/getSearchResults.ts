import { zodValidator } from '@tanstack/zod-adapter'
import { createServerFn } from '@tanstack/react-start'
import type { SearchParamsFields, SearchResult } from '@/lib/types/search'
import { clientSearchParams } from '@/lib/types/search'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { getSearchData } from './getSearchData'

type SearchResultReturn =
  | {
      status: 404
      message: string
    }
  | {
      status: 400
      message: string
      paths: Array<SearchParamsFields>
    }
  | { status: 200; searchResult: Array<SearchResult> }
  | undefined

export const getSearchResults = createServerFn({
  method: 'GET',
})
  .middleware([errorMiddleware])
  .validator(zodValidator(clientSearchParams))
  .handler(async ({ data }): Promise<SearchResultReturn> => {
    try {
      const result = await getSearchData({ data })

      if (typeof result === 'object' && 'message' in result) {
        return result
      }

      return { status: 200, searchResult: result }
    } catch (error) {
      catchError(error)
    }
  })
