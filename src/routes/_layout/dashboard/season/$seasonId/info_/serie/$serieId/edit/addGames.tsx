import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import type { BulkGameFileParser } from '@/lib/types/game'
import FileInput from '@/routes/_layout/dashboard/-components/Utils/XLSXFileInput'
import BulkGames from '@/routes/_layout/dashboard/-components/Games/BulkGames'

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
  const [gameData, setGameData] = useState<BulkGameFileParser | null>(null)
  const [dataError, setDataError] = useState<DataError>({
    error: false,
  })

  return (
    <div className="mt-6 flex flex-col gap-4">
      <div className="flex flex-row justify-center">
        <FileInput setGameData={setGameData} setDataError={setDataError} />
      </div>
      <div>
        {gameData ? (
          <BulkGames gameData={gameData} />
        ) : (
          <div className="flex flex-row justify-center">
            {dataError.error ? (
              <span>{dataError.message}</span>
            ) : (
              <span className="text-sm">Väntar på data...</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
