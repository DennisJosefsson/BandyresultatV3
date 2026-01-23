import { SelectItem } from '@/components/ui/select'
import { RowComponentProps } from 'react-window'

type Item = {
  value: number
  label: string
}

const RenderItem = ({
  index,
  style,
  teams,
}: RowComponentProps<{ teams: Item[] }>) => (
  <SelectItem
    value={teams[index].value.toString()}
    key={teams[index].value}
    style={{
      ...style,
    }}
  >
    {teams[index].label}
  </SelectItem>
)

export default RenderItem
