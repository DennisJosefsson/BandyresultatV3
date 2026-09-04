import { Button } from '@/components/base/ui/button'
import { Datum } from '@/components/Common/Date'
import { zd } from '@/lib/utils/zod'
import { createFileRoute } from '@tanstack/react-router'
import { getSingleError } from '../-functions/ErrorFunctions/getSingleError'

export const Route = createFileRoute(
  '/_layout/dashboard/$errorId/',
)({
  params: {
    parse: (params) => ({
      errorId: zd
        .number()
        .int()
        .parse(Number(params.errorId)),
    }),
    stringify: ({ errorId }) => ({ errorId: `${errorId}` }),
  },
  loader: async ({ params }) => {
    const error = await getSingleError({
      data: { errorId: params.errorId },
    })
    if (!error) throw new Error('Missing error data')

    return error
  },
  component: RouteComponent,
})

function RouteComponent() {
  const data = Route.useLoaderData()
  if (data.status === 404) {
    return (
      <div className="flex flex-row mt-4 justify-center text-sm">
        {data.message}
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-1 text-sm">
      <span>
        {data.error.createdAt ? (
          <Datum>{data.error.createdAt}</Datum>
        ) : (
          <Datum>{data.error.date}</Datum>
        )}
      </span>
      <span>{data.error.name}</span>
      <span>{data.error.message}</span>
      <span>
        {data.error.production === true
          ? 'Production'
          : 'Development'}
      </span>
      <span>
        {data.error.backend === true
          ? 'Backend'
          : 'Frontend'}
      </span>
      <span>{data.error.origin}</span>
      <span>{data.error.body}</span>

      <Route.Link
        to="/dashboard"
        search={(prev) => ({ ...prev })}
        className="mt-4"
      >
        <Button>Tillbaka</Button>
      </Route.Link>
    </div>
  )
}
