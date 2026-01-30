import { createFileRoute } from '@tanstack/react-router'
import DateUpdateForm from '../../../-components/Forms/GameForms/DateUpdateForm'

export const Route = createFileRoute(
  '/_layout/dashboard/games/$today/$gameId/date',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div className="fixed inset-y-40 z-50 m-2 flex items-center justify-center overflow-x-hidden outline-none focus:outline-none">
        <div className="fixed inset-2 mx-auto my-40 w-auto max-w-3xl">
          <DateUpdateForm />
        </div>
      </div>
    </>
  )
}
