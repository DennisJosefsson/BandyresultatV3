import type { RowComponentProps } from 'react-window'

import { SelectItem } from '@/components/ui/select'

type Item = {
  value: number
  label: string
}

const RenderItem = ({
  index,
  style,
  teams,
}: RowComponentProps<{ teams: Array<Item> }>) => (
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
