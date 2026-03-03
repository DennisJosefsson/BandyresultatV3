import AddStaticTableForm from '@/routes/_layout/dashboard/-components/Forms/TableForms/AddStaticTableForm'
import { getSeriesTableData } from '@/routes/_layout/dashboard/-functions/SerieFunctions/getSeriesTableData'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/info_/$serieId/edit/addTable',
)({
  loader: async ({ params: { serieId } }) => {
    const data = await getSeriesTableData({ data: { serieId } })
    if (!data) throw new Error('Missing data')

    return data
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <AddStaticTableForm />
    </div>
  )
}
