import { CustomCatchBoundary } from '@/components/ErrorComponents/CustomCatchBoundary'
import {
  Outlet,
  createFileRoute,
} from '@tanstack/react-router'
import GroupMenubar from './-components/Menubar/GroupMenubar'
import { validateGroup } from './-functions/validateGroup'

export const Route = createFileRoute(
  '/_layout/seasons/$year/$group',
)({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({
    params: { year, group },
    deps: { women },
  }) => {
    const data = await validateGroup({
      data: { year, group, women },
    })

    return data
  },
  staticData: {
    breadcrumb: (match) => {
      return match.loaderData.breadCrumb ?? 'Serie'
    },
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <CustomCatchBoundary id="groupRoute">
      <Group />
    </CustomCatchBoundary>
  )
}

function Group() {
  return (
    <div className="flex flex-col gap-2">
      <GroupMenubar />

      <div>
        <Outlet />
      </div>
    </div>
  )
}
