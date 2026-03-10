import { createFileRoute } from '@tanstack/react-router'

import EditStaticTableForm from '@/routes/_layout/dashboard/-components/Forms/TableForms/EditStaticTableForm'
import { getSeriesTableDataForEdit } from '@/routes/_layout/dashboard/-functions/SerieFunctions/getSeriesTableDataForEdit'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/info_/$serieId/edit/editTable',
)({
  loader: async ({ params: { serieId } }) => {
    const data = await getSeriesTableDataForEdit({
      data: { serieId },
    })
    if (!data) throw new Error('Missing data')

    return data
  },
  component: RouteComponent,
})

function RouteComponent() {
  const data = Route.useLoaderData()

  if (data.status === 404) {
    return (
      <div className="mt-4 flex flex-row justify-center">
        <span className="text-base font-semibold">
          {data.message}
        </span>
      </div>
    )
  }
  return (
    <div>
      <EditStaticTableForm />
    </div>
  )
}
