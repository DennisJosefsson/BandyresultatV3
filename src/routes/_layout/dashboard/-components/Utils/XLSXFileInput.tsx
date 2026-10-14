import { Input } from '@/components/base/ui/input'
import type { BulkGameFileParser } from '@/lib/types/game'
import { bulkGameFileParser } from '@/lib/types/game'
import { parse } from 'csv-parse/browser/esm/sync'
import type { Dispatch, SetStateAction } from 'react'

type DataError =
  | {
      error: true
      message: string
    }
  | { error: false }

type FileInputProps = {
  setGameData: Dispatch<
    SetStateAction<BulkGameFileParser | null>
  >
  setDataError: Dispatch<SetStateAction<DataError>>
  teamsInSerie: Array<number>
}

const process = (fileText: string) => {
  const jsonData = parse(fileText, {
    columns: ['date', 'homeTeamId', 'awayTeamId'],
    delimiter: ';',
    fromLine: 2,
  })
  return jsonData
}

//

const FileInput = ({
  setGameData,
  setDataError,
  teamsInSerie,
}: FileInputProps) => {
  const onChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    console.log(event)
    if (event.target.files) {
      const file = await event.target.files[0]
      const text = await file.text()

      const parsedData = await process(text)
      const gameData =
        bulkGameFileParser.safeParse(parsedData)
      if (!gameData.success) {
        const errorString = gameData.error.message
        console.log('ERROR', gameData.error)
        setDataError({ error: true, message: errorString })
      } else {
        setDataError({ error: false })
        setGameData(
          gameData.data.filter(
            (t) =>
              teamsInSerie.includes(t.homeTeamId) ||
              teamsInSerie.includes(t.awayTeamId),
          ),
        )
      }
    }
  }

  return (
    <div className="flex flex-row items-center gap-1.5">
      <Input
        id="csv-file"
        type="file"
        accept=".csv,application/csv"
        onChange={onChange}
        className="file:mr-24 file:justify-between"
      />
    </div>
  )
}

export default FileInput
