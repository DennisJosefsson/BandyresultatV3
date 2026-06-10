import { createFileRoute } from '@tanstack/react-router'
import { getSeriesTableData } from '@/routes/_layout/dashboard/-functions/SerieFunctions/getSeriesTableData'
import AddStaticTableForm from '@/routes/_layout/dashboard/-components/Forms/TableForms/AddStaticTableForm'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/info_/$serieId/edit/addTable',
)({
  loader: async ({ params: { serieId } }) => {
    const data = await getSeriesTableData({
      data: { serieId },
    })
    if (!data) throw new Error('Missing data')

    return data
  },
  component: RouteComponent,
})

function RouteComponent() {
  const data = Route.useLoaderData()

  if (data.status === 400) {
    return (
      <div className="mt-4 flex flex-row justify-center">
        <span className="text-sm font-semibold">{data.message}</span>
      </div>
    )
  }

  return (
    <div>
      <AddStaticTableForm />
    </div>
  )
}
