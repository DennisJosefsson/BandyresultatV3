import { CustomCatchBoundary } from '@/components/ErrorComponents/CustomCatchBoundary'
import {
  Outlet,
  createFileRoute,
} from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/seasons/$year/$group/tables',
)({
  component: Tables,
})

function Tables() {
  const { year } = Route.useParams()

  if (year < 1930) {
    return (
      <div className="font-inter text-foreground mx-auto mt-4 grid place-items-center py-5 text-sm font-bold md:text-base">
        <p className="mx-10 text-center">
          Inga serietabeller för denna säsong.
        </p>
      </div>
    )
  }
  return (
    <div>
      {/* <SeasonTablesButtonList /> */}
      <CustomCatchBoundary id="Säsongstabell">
        <Outlet />
      </CustomCatchBoundary>
    </div>
  )
}
