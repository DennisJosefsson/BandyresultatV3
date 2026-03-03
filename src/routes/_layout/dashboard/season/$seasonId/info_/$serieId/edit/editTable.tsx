import EditStaticTableForm from '@/routes/_layout/dashboard/-components/Forms/TableForms/EditStaticTableForm'
import { getSeriesTableDataForEdit } from '@/routes/_layout/dashboard/-functions/SerieFunctions/getSeriesTableDataForEdit'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/info_/$serieId/edit/editTable',
)({
  loader: async ({ params: { serieId } }) => {
    const data = await getSeriesTableDataForEdit({ data: { serieId } })
    if (!data) throw new Error('Missing data')

    return data
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <EditStaticTableForm />
    </div>
  )
}
