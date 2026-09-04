import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/base/ui/table'
import { Datum } from '@/components/Common/Date'
import type { errors } from '@/db/schema'
import { createFileRoute } from '@tanstack/react-router'

import { getErrors } from './-functions/ErrorFunctions/getErrors'

export const Route = createFileRoute('/_layout/dashboard/')(
  {
    loader: async () => {
      const errors = await getErrors()
      if (!errors) throw new Error('Missing errors data')

      return errors
    },
    component: RouteComponent,
  },
)

function RouteComponent() {
  const data = Route.useLoaderData()

  if (data.status === 404) return null
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <ErrorsComponent
          title="Frontend Production"
          errors={data.production.frontend.errors}
          count={data.production.frontend.count}
        />
      </div>
      <div>
        <ErrorsComponent
          title="Backend Production"
          errors={data.production.backend.errors}
          count={data.production.backend.count}
        />
      </div>
      <div>
        <ErrorsComponent
          title="Frontend Development"
          errors={data.development.frontend.errors}
          count={data.development.frontend.count}
        />
      </div>
      <div>
        <ErrorsComponent
          title="Backend Development"
          errors={data.development.backend.errors}
          count={data.development.backend.count}
        />
      </div>
    </div>
  )
}

type ErrorComponentsProps = {
  errors: Array<typeof errors.$inferSelect>
  count: number
  title: string
}

function ErrorsComponent({
  errors,
  count,
  title,
}: ErrorComponentsProps) {
  return (
    <div className="flex flex-col gap-2 p-2 border">
      <div className="flex flex-row justify-between">
        <h4 className="text-sm">{title}</h4>
        <h4 className="text-sm">Antal: {count}</h4>
      </div>
      <Table className="text-sm">
        <TableHeader>
          <TableRow>
            <TableHead className="w-80">Datum</TableHead>
            <TableHead className="w-80">Namn</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {errors.map((e) => {
            return (
              <TableRow key={e.errorId}>
                <TableCell className="w-80">
                  {e.createdAt ? (
                    <Datum>{e.createdAt}</Datum>
                  ) : (
                    <Datum>{e.date}</Datum>
                  )}
                </TableCell>
                <TableCell className="w-80">
                  <Route.Link
                    to="/dashboard/$errorId"
                    params={{ errorId: e.errorId }}
                    search={(prev) => ({ ...prev })}
                  >
                    {e.name}
                  </Route.Link>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
