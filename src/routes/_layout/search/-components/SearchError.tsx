import {
  useNavigate,
  useSearch,
} from '@tanstack/react-router'

import { Button } from '@/components/base/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/base/ui/dialog'
import type {
  SearchParamsFields,
  SearchResult,
} from '@/lib/types/search'
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

const SearchError = ({
  searchResult,
  reset,
}: SearchErrorProps) => {
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
    <Dialog defaultOpen={true}>
      <DialogContent className="bg-red-600 text-white">
        <DialogHeader>
          <DialogTitle>Oops, något gick fel.</DialogTitle>
        </DialogHeader>
        {searchResult.message}
        <DialogFooter className="sm:justify-start">
          <DialogClose
            render={
              <Button
                className="bg-white text-black hover:bg-slate-300"
                onClick={resetFn}
              >
                Stäng
              </Button>
            }
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default SearchError
