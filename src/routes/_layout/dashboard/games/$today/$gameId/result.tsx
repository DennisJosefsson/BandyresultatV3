import { createFileRoute } from '@tanstack/react-router'
import ResultUpdateForm from '../../../-components/Forms/GameForms/ResultUpdateForm'

export const Route = createFileRoute(
  '/_layout/dashboard/games/$today/$gameId/result',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div className="fixed inset-y-40 z-50 m-2 flex items-center justify-center overflow-x-hidden outline-none focus:outline-none">
        <div className="fixed inset-2 mx-auto my-6 w-auto max-w-3xl">
          <ResultUpdateForm />
        </div>
      </div>
    </>
  )
}
