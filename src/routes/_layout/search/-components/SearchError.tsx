import { useNavigate, useSearch } from '@tanstack/react-router'
import type { SearchParamsFields, SearchResult } from '@/lib/types/search'
import { cn } from '@/lib/utils/utils'
import { Button } from '@/components/base/ui/button'
type SearchErrorProps = {
  searchResult:
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
  reset: () => void
}

const SearchError = ({ searchResult, reset }: SearchErrorProps) => {
  const navigate = useNavigate({ from: '/search' })
  const searchFields = useSearch({
    from: '/_layout/search',
  })

  const resetFn = () => {
    if (searchResult.status === 400) {
      const fields = searchResult.paths

      if (Array.isArray(fields)) {
        fields.forEach((field) => {
          if (searchFields[field] !== undefined) {
            navigate({
              search: (prev) => ({
                ...prev,
                [field]: undefined,
              }),
            })
          }
        })
      }
    }
    reset()
  }

  if (searchResult.status === 200) return null

  return (
    <div
      className={cn(
        'flex flex-col p-2 m-4',
        searchResult.status === 400 ? 'bg-red-500' : 'undefined',
      )}
    >
      <div>
        <span className="xs:text-[10px] text-[8px] font-semibold sm:text-sm">
          {searchResult.status === 400 ? 'Oops, där blev det fel.' : 'Inga resultat'}
        </span>
      </div>
      <div className="flex flex-row items-center gap-2">
        <span className="xs:text-[10px] text-[8px] sm:text-sm">{searchResult.message}</span>
        <div>
          {searchResult.status === 400 ? (
            <Button size="responsive" onClick={resetFn}>
              Nollställ sökfel
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default SearchError
