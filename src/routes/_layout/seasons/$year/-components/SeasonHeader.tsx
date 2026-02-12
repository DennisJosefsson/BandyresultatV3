import { Button } from '@/components/ui/button'

import { Link, useParams, useSearch } from '@tanstack/react-router'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'

import { useGetFirstAndLastSeason } from '../-hooks/useGetFirstAndLastSeason'

const SeasonHeader = () => {
  const { firstSeason, lastSeason } = useGetFirstAndLastSeason()
  const women = useSearch({
    from: '/_layout',
    select: (search) => search.women,
  })

  const year = useParams({
    from: '/_layout/seasons/$year',
    select: (params) => params.year,
  })

  return (
    <div className="mb-1 flex items-center justify-center gap-10 pt-2 sm:mb-2 xl:mb-4">
      <Link
        to="."
        search={(prev) => ({ ...prev })}
        params={{
          year: year === firstSeason ? lastSeason : year - 1,
        }}
      >
        <Button variant="outline" size="icon" className="h-3 w-3 lg:h-6 lg:w-6">
          <ArrowLeftIcon className="h-4 w-4" />
          <span className="sr-only">Tidigare säsong</span>
        </Button>
      </Link>
      <span className="w-24 text-center font-semibold">
        {year > 1963 ? `${year - 1}/${year}` : `${year}`}
      </span>
      <Link
        to="."
        search={{ women }}
        params={{
          year: year === lastSeason ? firstSeason : year + 1,
        }}
      >
        <Button variant="outline" size="icon" className="h-3 w-3 lg:h-6 lg:w-6">
          <ArrowRightIcon className="h-4 w-4" />
          <span className="sr-only">Senare säsong</span>
        </Button>
      </Link>
    </div>
  )
}

export default SeasonHeader
