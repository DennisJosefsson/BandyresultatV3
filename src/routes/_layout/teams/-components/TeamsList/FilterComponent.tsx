import { Input } from '@/components/base/ui/input'
import type {
  Dispatch,
  KeyboardEvent,
  SetStateAction,
} from 'react'
type FilterComponentProps = {
  teamFilter: string
  setTeamFilter: Dispatch<SetStateAction<string>>
}

const FilterComponent = ({
  teamFilter,
  setTeamFilter,
}: FilterComponentProps) => {
  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }
  return (
    <div>
      <Input
        className="text-foreground border-[#011d29] focus:border-[#011d29]"
        type="text"
        placeholder="Filter"
        value={teamFilter}
        name="teamFilter"
        onChange={(event) =>
          setTeamFilter(
            event.target.value.replace(
              /[^a-z0-9\u00C0-\u017F]/gi,
              '',
            ),
          )
        }
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}

export default FilterComponent
