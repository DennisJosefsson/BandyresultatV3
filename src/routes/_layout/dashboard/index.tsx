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

import CronJobBarChart from './-components/CronJob/CronJobBarChart'
import { getCronJobDetails } from './-functions/CronJobFunctions/cronJobs'
import { getErrors } from './-functions/ErrorFunctions/getErrors'

export const Route = createFileRoute('/_layout/dashboard/')(
  {
    loader: async () => {
      const errors = await getErrors()
      const cronJobs = await getCronJobDetails()
      if (!errors || !cronJobs)
        throw new Error('Missing errors data')

      return { errors, cronJobs }
    },
    component: RouteComponent,
  },
)

function RouteComponent() {
  const errors = Route.useLoaderData({
    select: (s) => s.errors,
  })

  return (
    <div className="flex flex-col gap-4">
      <div>
        <CronJobs />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <ErrorsComponent
            title="Frontend Production"
            errors={errors.production.frontend.errors}
            count={errors.production.frontend.count}
          />
        </div>
        <div>
          <ErrorsComponent
            title="Backend Production"
            errors={errors.production.backend.errors}
            count={errors.production.backend.count}
          />
        </div>
        <div>
          <ErrorsComponent
            title="Frontend Development"
            errors={errors.development.frontend.errors}
            count={errors.development.frontend.count}
          />
        </div>
        <div>
          <ErrorsComponent
            title="Backend Development"
            errors={errors.development.backend.errors}
            count={errors.development.backend.count}
          />
        </div>
      </div>
    </div>
  )
}

function CronJobs() {
  const cronJobs = Route.useLoaderData({
    select: (s) => s.cronJobs.cronJobs,
  })

  const cronJobStats = Route.useLoaderData({
    select: (s) => s.cronJobs.cronJobStats,
  })

  if (cronJobs.length === 0) {
    return (
      <div className="flex flex-row justify-center">
        <span>Inga cronjobs har körts.</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="w-5xl">
        <CronJobBarChart data={cronJobStats} />
      </div>
      <div className="border p-2 text-sm">
        <div className="grid grid-cols-5 gap-4 font-semibold">
          <span>jobId</span>
          <span>Jobbnamn</span>
          <span>Status</span>
          <span>Tid</span>
          <span>Längd</span>
        </div>
        {cronJobs.map((cj) => {
          return (
            <div
              className="grid grid-cols-5 gap-4"
              key={cj.jobPid}
            >
              <span>{cj.jobId}</span>
              <span>{cj.jobName}</span>
              <span>{cj.status}</span>
              <span>
                {cj.startTime
                  ? `${cj.startTime.toLocaleDateString()} ${cj.startTime.toLocaleTimeString()}`
                  : 'Ingen starttid'}
              </span>
              <span>{cj.duration}</span>
            </div>
          )
        })}
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
