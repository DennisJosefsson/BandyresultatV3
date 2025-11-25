import { createFileRoute } from '@tanstack/react-router'
import CategoryArray from './-components/Selection/CategoryArray'
import EndSeason from './-components/Selection/EndSeason'
import StartSeason from './-components/Selection/StartSeason'
import { getSeasons } from './-functions/getSeasons'
import Loading from '@/components/Loading/Loading'

export const Route = createFileRoute('/_layout/teams/selection')({
  component: Selection,
  pendingComponent: () => <Loading page="searchSelection" />,
  loader: () => getSeasons(),
})

function Selection() {
  return (
    <div className="m-2 font-inter text-foreground xl:mx-0">
      <div className=" flex flex-col gap-2">
        <CategoryArray />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          <StartSeason />
          <EndSeason />
        </div>
      </div>
    </div>
  )
}
