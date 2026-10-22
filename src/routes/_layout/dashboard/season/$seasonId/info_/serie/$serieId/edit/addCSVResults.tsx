import type { BulkResultFileParser } from '@/lib/types/game'
import CSVBulkResults from '@/routes/_layout/dashboard/-components/Games/CSVBulkResults'
import BulkResultFileInput from '@/routes/_layout/dashboard/-components/Utils/BulkResultFileInput'
import {
  createFileRoute,
  useLoaderData,
} from '@tanstack/react-router'
import { useState } from 'react'

type DataError =
  | {
      error: true
      message: string
    }
  | { error: false }

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/info_/serie/$serieId/edit/addCSVResults',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const [gameData, setGameData] =
    useState<BulkResultFileParser | null>(null)
  const [dataError, setDataError] = useState<DataError>({
    error: false,
  })

  const teamsInSerie = useLoaderData({
    from: '/_layout/dashboard/season/$seasonId/info_/serie/$serieId/edit',
    select: (s) => s.teamsInSerie,
  }).map((t) => t.teamId)
  return (
    <div className="mt-6 flex flex-col gap-4 min-h-100">
      <div className="flex flex-row justify-center">
        <BulkResultFileInput
          setGameData={setGameData}
          setDataError={setDataError}
          teamsInSerie={teamsInSerie}
        />
      </div>
      <div>
        {gameData ? (
          <CSVBulkResults games={gameData} />
        ) : (
          <div className="flex flex-row justify-center">
            {dataError.error ? (
              <span>{dataError.message}</span>
            ) : (
              <span className="text-sm">
                Väntar på data...
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
