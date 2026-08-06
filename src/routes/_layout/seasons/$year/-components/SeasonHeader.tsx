import { Button } from '@/components/base/ui/button'
import { Link, useParams } from '@tanstack/react-router'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { useGetFirstAndLastSeason } from '../-hooks/useGetFirstAndLastSeason'

const SeasonHeader = () => {
  const { firstSeason, lastSeason } =
    useGetFirstAndLastSeason()

  const year = useParams({
    from: '/_layout/seasons/$year',
    select: (params) => params.year,
  })

  return (
    <div className="flex items-center justify-center gap-10">
      <Link
        to="."
        search={(prev) => ({ ...prev })}
        params={{
          year:
            year === firstSeason ? lastSeason : year - 1,
        }}
      >
        <Button
          variant="ghost"
          size="icon"
          className="size-3 lg:size-6"
          aria-label="Gå till föregående säsong"
        >
          <ArrowLeftIcon className="size-3 lg:size-6" />
          <span className="sr-only">Tidigare säsong</span>
        </Button>
      </Link>
      <span className="w-24 text-center text-sm font-semibold md:text-base">
        {year > 1963 ? `${year - 1}/${year}` : `${year}`}
      </span>
      <Link
        to="."
        search={(prev) => ({ ...prev })}
        params={{
          year:
            year === lastSeason ? firstSeason : year + 1,
        }}
      >
        <Button
          variant="ghost"
          size="icon"
          className="size-3 lg:size-6"
          aria-label="Gå till nästa säsong"
        >
          <ArrowRightIcon className="size-3 lg:size-6" />
          <span className="sr-only">Senare säsong</span>
        </Button>
      </Link>
    </div>
  )
}

export default SeasonHeader
