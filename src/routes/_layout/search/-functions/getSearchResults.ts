import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import {
  clientSearchParams,
  SearchParamsFields,
  SearchResult,
} from '@/lib/types/search'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { getSearchData } from './getSearchData'

type SearchResultReturn =
  | {
      status: 404
      message: string
    }
  | { status: 400; message: string; paths: SearchParamsFields[] }
  | { status: 200; searchResult: SearchResult[] }
  | undefined

export const getSearchResults = createServerFn({ method: 'GET' })
  .middleware([errorMiddleware])
  .inputValidator(zodValidator(clientSearchParams))
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
