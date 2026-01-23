import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SearchParamsFields } from '@/lib/types/search'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { CircleXIcon } from 'lucide-react'
import { List, useListRef } from 'react-window'
import { useSearchTeams } from '../-hooks/useSearchTeams'
import RenderItem from './SelectRenderItem'

type TeamSelectionProps = {
  field: Extract<SearchParamsFields, 'teamId' | 'opponentId'>
  label: string
}

const TeamSelection = ({ field, label }: TeamSelectionProps) => {
  const listRef = useListRef(null)
  const searchField = useSearch({
    from: '/_layout/search',
    select: (search) => search[field],
  })

  const navigate = useNavigate({ from: '/search' })
  const { teamSelection } = useSearchTeams()

  const onValueChange = (value: string): void => {
    navigate({ search: (prev) => ({ ...prev, [field]: parseInt(value) }) })
  }

  const reset = () => {
    navigate({ search: (prev) => ({ ...prev, [field]: undefined }) })
  }

  const teamSelectIndex = teamSelection.findIndex((val) => {
    val.value === searchField
  })

  const openIndex = teamSelectIndex === -1 ? 0 : teamSelectIndex

  const onOpenChange = (open: boolean): void => {
    if (open && listRef && listRef.current) {
      listRef.current.scrollToRow({
        index: openIndex,
        align: 'center',
        behavior: 'smooth',
      })
    }
  }

  const selectedLabel = teamSelection.find(
    (val) => val.value === searchField,
  )?.label

  return (
    <div className="flex flex-col gap-1">
      <div>
        <Label>{label}</Label>
      </div>
      <div className="flex flex-row items-center gap-x-2">
        <div>
          <Select
            value={searchField?.toString() ?? ''}
            onValueChange={onValueChange}
            onOpenChange={(open) => onOpenChange(open)}
          >
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Välj">{selectedLabel}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <List
                rowComponent={RenderItem}
                rowHeight={40}
                rowCount={teamSelection.length}
                listRef={listRef}
                rowProps={{ teams: teamSelection }}
              />
            </SelectContent>
          </Select>
        </div>
        <div>
          <Button onClick={reset} variant="ghost" size="icon">
            <CircleXIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TeamSelection
