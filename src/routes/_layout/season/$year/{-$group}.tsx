import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
export const Route = createFileRoute('/_layout/season/$year/{-$group}')({
  loader: async ({ params, parentMatchPromise }) => {
    const parent = await parentMatchPromise
    if (!parent.loaderData) throw new Error('Grupper saknas.')

    if (!params.group)
      throw redirect({
        from: '/season/$year/{-$group}',
        to: '/season/$year/{-$group}',
        params: { year: params.year, group: parent.loaderData[0].group },
        search: (prev) => ({ ...prev }),
      })
    const loaderDataObject = parent.loaderData?.find(
      (g) => g.group === params.group,
    )
    if (!loaderDataObject)
      throw redirect({
        from: '/season/$year/{-$group}',
        to: '/season/$year/{-$group}',
        params: { year: params.year, group: parent.loaderData[0].group },
        search: (prev) => ({ ...prev }),
      })
    return loaderDataObject.name
  },
  component: RouteComponent,
  pendingComponent: () => <div>Loading in group route...</div>,
})

function RouteComponent() {
  return (
    <div>
      <Outlet />
    </div>
  )
}
