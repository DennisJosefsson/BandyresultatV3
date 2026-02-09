import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { bulkGameFileParser, BulkGameFileParser } from '@/lib/types/game'
import { Dispatch, SetStateAction } from 'react'
import XLSX from 'xlsx'

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

const FileInput = ({
  setGameData,
}: {
  setGameData: Dispatch<SetStateAction<BulkGameFileParser | null>>
}) => {
  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const parsedData = await process(
        await event.target.files[0].arrayBuffer(),
      )
      const gameData = bulkGameFileParser.safeParse(parsedData)
      if (!gameData.success) {
        console.log('ERROR', gameData.error)
      } else {
        setGameData(gameData.data)
      }
    }
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="xlsx-file">Matchfil</Label>
      <Button asChild variant="outline">
        <Input
          id="xlsx-file"
          type="file"
          accept=".xlsx,application/xlsx"
          onChange={onChange}
        />
      </Button>
    </div>
  )
}

export default FileInput
