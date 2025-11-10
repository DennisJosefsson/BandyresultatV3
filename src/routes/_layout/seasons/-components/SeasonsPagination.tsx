import { Button } from '@/components/ui/button'
import { Link, useLoaderData, useSearch } from '@tanstack/react-router'
import { ChevronLeftIcon, ChevronRightIcon, EllipsisIcon } from 'lucide-react'
import { useMediaQuery } from 'usehooks-ts'

const Ellips = () => {
  return (
    <span aria-hidden className="flex h-9 w-9 items-center justify-center">
      <EllipsisIcon className="h-4 w-4" />
      <span className="sr-only">Fler sidor</span>
    </span>
  )
}

const MiddleButtons = ({
  page,
  maxPage,
}: {
  page: number
  maxPage: number
}) => {
  const matches = useMediaQuery('(min-width: 430px)')
  if (page < 4) {
    return (
      <>
        <Link
          from="/seasons"
          to="/seasons"
          search={(prev) => ({ ...prev, page: 2 })}
        >
          {({ isActive }) => (
            <Button
              size={matches ? 'icon' : 'xs'}
              variant={isActive ? 'outline' : 'ghost'}
              aria-label="Sida 2"
            >
              2
            </Button>
          )}
        </Link>
        <Link
          from="/seasons"
          to="/seasons"
          search={(prev) => ({ ...prev, page: 3 })}
        >
          {({ isActive }) => (
            <Button
              size={matches ? 'icon' : 'xs'}
              variant={isActive ? 'outline' : 'ghost'}
              aria-label="Sida 3"
            >
              3
            </Button>
          )}
        </Link>
        <Link
          from="/seasons"
          to="/seasons"
          search={(prev) => ({ ...prev, page: 4 })}
        >
          {({ isActive }) => (
            <Button
              size={matches ? 'icon' : 'xs'}
              variant={isActive ? 'outline' : 'ghost'}
              aria-label="Sida 4"
            >
              4
            </Button>
          )}
        </Link>
        <Link
          from="/seasons"
          to="/seasons"
          search={(prev) => ({ ...prev, page: 5 })}
        >
          {({ isActive }) => (
            <Button
              size={matches ? 'icon' : 'xs'}
              variant={isActive ? 'outline' : 'ghost'}
              aria-label="Sida 5"
            >
              5
            </Button>
          )}
        </Link>
        <Ellips />
      </>
    )
  } else if (page > maxPage - 3) {
    return (
      <>
        <Ellips />
        <Link
          from="/seasons"
          to="/seasons"
          search={(prev) => ({ ...prev, page: maxPage - 4 })}
        >
          {({ isActive }) => (
            <Button
              size={matches ? 'icon' : 'xs'}
              variant={isActive ? 'outline' : 'ghost'}
              aria-label={`Sida ${maxPage - 4}`}
            >
              {maxPage - 4}
            </Button>
          )}
        </Link>
        <Link
          from="/seasons"
          to="/seasons"
          search={(prev) => ({ ...prev, page: maxPage - 3 })}
        >
          {({ isActive }) => (
            <Button
              size={matches ? 'icon' : 'xs'}
              variant={isActive ? 'outline' : 'ghost'}
              aria-label={`Sida ${maxPage - 3}`}
            >
              {maxPage - 3}
            </Button>
          )}
        </Link>
        <Link
          from="/seasons"
          to="/seasons"
          search={(prev) => ({ ...prev, page: maxPage - 2 })}
        >
          {({ isActive }) => (
            <Button
              size={matches ? 'icon' : 'xs'}
              variant={isActive ? 'outline' : 'ghost'}
              aria-label={`Sida ${maxPage - 2}`}
            >
              {maxPage - 2}
            </Button>
          )}
        </Link>
        <Link
          from="/seasons"
          to="/seasons"
          search={(prev) => ({ ...prev, page: maxPage - 1 })}
        >
          {({ isActive }) => (
            <Button
              size={matches ? 'icon' : 'xs'}
              variant={isActive ? 'outline' : 'ghost'}
              aria-label={`Sida ${maxPage - 1}`}
            >
              {maxPage - 1}
            </Button>
          )}
        </Link>
      </>
    )
  } else {
    return (
      <>
        <Ellips />
        <Link
          from="/seasons"
          to="/seasons"
          search={(prev) => ({ ...prev, page: page - 1 })}
        >
          {({ isActive }) => (
            <Button
              size={matches ? 'icon' : 'xs'}
              variant={isActive ? 'outline' : 'ghost'}
              aria-label={`Sida ${page - 1}`}
            >
              {page - 1}
            </Button>
          )}
        </Link>
        <Link
          from="/seasons"
          to="/seasons"
          search={(prev) => ({ ...prev, page: page })}
        >
          {({ isActive }) => (
            <Button
              size={matches ? 'icon' : 'xs'}
              variant={isActive ? 'outline' : 'ghost'}
              aria-label={`Sida ${page}`}
            >
              {page}
            </Button>
          )}
        </Link>
        <Link
          from="/seasons"
          to="/seasons"
          search={(prev) => ({ ...prev, page: page + 1 })}
        >
          {({ isActive }) => (
            <Button
              size={matches ? 'icon' : 'xs'}
              variant={isActive ? 'outline' : 'ghost'}
              aria-label={`Sida ${page + 1}`}
            >
              {page + 1}
            </Button>
          )}
        </Link>
        <Ellips />
      </>
    )
  }
}

const SeasonsPagination = () => {
  const matches = useMediaQuery('(min-width: 430px)')
  const count = useLoaderData({
    from: '/_layout/seasons/',
    select: (data) => data.count,
  })
  const page = useSearch({
    from: '/_layout/seasons/',
    select: (s) => s.page,
  })
  const maxPage = Math.ceil(count / 12)

  return (
    <div className="w-full flex flex-row justify-center items-center gap-1">
      <Link
        from="/seasons"
        to="/seasons"
        search={(prev) => ({ ...prev, page: prev.page && prev.page - 1 })}
        disabled={page === 1 ? true : false}
      >
        <Button
          variant="ghost"
          disabled={page === 1 ? true : false}
          aria-label="Gå till föregående sida"
          aria-disabled={page === 1 ? true : false}
        >
          <div className="inline-flex gap-1 pl-2.5 items-center">
            <ChevronLeftIcon className="h-4 w-4" />
            <span className="hidden sm:block">Föregående</span>
          </div>
        </Button>
      </Link>
      <Link
        from="/seasons"
        to="/seasons"
        search={(prev) => ({ ...prev, page: 1 })}
      >
        {({ isActive }) => (
          <Button
            size={matches ? 'icon' : 'xs'}
            variant={isActive ? 'outline' : 'ghost'}
            aria-label="Sida 1"
          >
            1
          </Button>
        )}
      </Link>
      <MiddleButtons page={page} maxPage={maxPage} />
      <Link
        from="/seasons"
        to="/seasons"
        search={(prev) => ({ ...prev, page: maxPage })}
      >
        {({ isActive }) => (
          <Button
            size={matches ? 'icon' : 'xs'}
            variant={isActive ? 'outline' : 'ghost'}
            aria-label={`Sida ${maxPage}`}
          >
            {maxPage}
          </Button>
        )}
      </Link>
      <Link
        from="/seasons"
        to="/seasons"
        search={(prev) => ({ ...prev, page: prev.page && prev.page + 1 })}
        disabled={page === maxPage ? true : false}
      >
        <Button
          variant="ghost"
          disabled={page === maxPage ? true : false}
          aria-label="Gå till nästa sida"
          aria-disabled={page === maxPage ? true : false}
        >
          <div className="inline-flex gap-1 pr-2.5 items-center">
            <span className="hidden sm:block">Nästa</span>
            <ChevronRightIcon className="h-4 w-4" />
          </div>
        </Button>
      </Link>
    </div>
  )
}

export default SeasonsPagination
