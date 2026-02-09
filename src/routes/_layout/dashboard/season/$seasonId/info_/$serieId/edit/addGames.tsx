import { BulkGameFileParser } from '@/lib/types/game'
import BulkGames from '@/routes/_layout/dashboard/-components/Games/BulkGames'
import FileInput from '@/routes/_layout/dashboard/-components/Utils/XLSXFileInput'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/info_/$serieId/edit/addGames',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const [gameData, setGameData] = useState<BulkGameFileParser | null>(null)

  return (
    <div className="flex flex-col gap-2">
      <div>
        <FileInput setGameData={setGameData} />
      </div>
      <div>
        {gameData ? (
          <BulkGames gameData={gameData} />
        ) : (
          <div className="mt-6 flex flex-row justify-center">
            <span className="text-sm">Väntar på data...</span>
          </div>
        )}
      </div>
    </div>
  )
}
