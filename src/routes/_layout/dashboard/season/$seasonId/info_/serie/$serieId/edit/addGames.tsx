import type { BulkGameFileParser } from '@/lib/types/game'
import BulkGames from '@/routes/_layout/dashboard/-components/Games/BulkGames'
import FileInput from '@/routes/_layout/dashboard/-components/Utils/BulkGameFileInput'
import {
  createFileRoute,
  useLoaderData,
} from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/info_/serie/$serieId/edit/addGames',
)({
  component: RouteComponent,
})

type DataError =
  | {
      error: true
      message: string
    }
  | { error: false }

function RouteComponent() {
  const [gameData, setGameData] =
    useState<BulkGameFileParser | null>(null)
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
        <FileInput
          setGameData={setGameData}
          setDataError={setDataError}
          teamsInSerie={teamsInSerie}
        />
      </div>
      <div>
        {gameData ? (
          <BulkGames gameData={gameData} />
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
