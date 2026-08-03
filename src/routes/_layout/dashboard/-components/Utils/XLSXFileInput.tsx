import type { Dispatch, SetStateAction } from 'react'
import XLSX from 'xlsx'
import type { BulkGameFileParser } from '@/lib/types/game'
import { bulkGameFileParser } from '@/lib/types/game'
import { Input } from '@/components/base/ui/input'

type DataError =
  | {
      error: true
      message: string
    }
  | { error: false }

type FileInputProps = {
  setGameData: Dispatch<SetStateAction<BulkGameFileParser | null>>
  setDataError: Dispatch<SetStateAction<DataError>>
}

const process = (ab: ArrayBuffer) => {
  const wb = XLSX.read(ab)
  const sheet = wb.Sheets[wb.SheetNames[0]]

  const jsonData = XLSX.utils.sheet_to_json(sheet, {
    header: [
      'Matchnr',
      'Dag',
      'date',
      'Tid',
      'Tävling',
      'homeTeamId',
      'Resultat',
      'awayTeamId',
      'Spelplats',
      'Match',
    ],
  })
  return jsonData
}

//

const FileInput = ({ setGameData, setDataError }: FileInputProps) => {
  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const parsedData = await process(await event.target.files[0].arrayBuffer())
      const gameData = bulkGameFileParser.safeParse(parsedData)
      if (!gameData.success) {
        const errorString = gameData.error.message
        console.log('ERROR', gameData.error)
        setDataError({ error: true, message: errorString })
      } else {
        setDataError({ error: false })
        setGameData(gameData.data)
      }
    }
  }

  return (
    <div className="flex flex-row items-center gap-1.5">
      <Input
        id="xlsx-file"
        type="file"
        accept=".xlsx,application/xlsx"
        onChange={onChange}
        className="file:mr-24 file:justify-between"
      />
    </div>
  )
}

export default FileInput
