import { Input } from '@/components/base/ui/input'
import type { BulkResultFileParser } from '@/lib/types/game'
import { bulkResultFileParser } from '@/lib/types/game'
import { CsvError, parse } from 'csv-parse/browser/esm/sync'
import type { Dispatch, SetStateAction } from 'react'

type DataError =
  | {
      error: true
      message: string
    }
  | { error: false }

type BulkResultFileInputProps = {
  setGameData: Dispatch<
    SetStateAction<BulkResultFileParser | null>
  >
  setDataError: Dispatch<SetStateAction<DataError>>
  teamsInSerie: Array<number>
}

const process = (fileText: string) => {
  try {
    const jsonData = parse(fileText, {
      columns: [
        'date',
        'homeTeamName',
        'awayTeamName',
        'homeTeamId',
        'awayTeamId',
        'result',
        'halftimeResult',
        'otResult',
      ],
      delimiter: ';',
      fromLine: 2,
      cast: (value, context) => {
        if (
          context.column === 'homeTeamId' ||
          context.column === 'awayTeamId'
        ) {
          return parseInt(value)
        }
        return value
      },
    })

    return jsonData
  } catch (error) {
    if (error instanceof CsvError) {
      return error.message
    }
    throw new Error('Okänt fel', { cause: error })
  }
}

//

const BulkResultFileInput = ({
  setGameData,
  setDataError,
  teamsInSerie,
}: BulkResultFileInputProps) => {
  const onChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files) {
      const file = await event.target.files[0]
      const text = await file.text()

      const parsedData = await process(text)
      if (typeof parsedData === 'string') {
        setDataError({ error: true, message: parsedData })
        return
      }
      const gameData =
        bulkResultFileParser.safeParse(parsedData)

      if (!gameData.success) {
        const errorString = gameData.error.message

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

export default BulkResultFileInput
