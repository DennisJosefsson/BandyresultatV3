import {
  getRouteApi,
  useNavigate,
} from '@tanstack/react-router'
import { useState } from 'react'

import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { limitSelection } from './arrays/arrays'

const route = getRouteApi('/_layout/search')

const LimitSelection = () => {
  const limit = route.useSearch({
    select: (search) => search.limit,
  })
  const [value, setValue] = useState(
    limit?.toString() ?? '10',
  )
  const navigate = useNavigate({ from: '/search' })

  const onValueChange = (val: string): void => {
    navigate({
      resetScroll: false,
      search: (prev) => ({ ...prev, limit: parseInt(val) }),
    })
    setValue(val)
  }
  return (
    <div>
      <Label>Antal träffar</Label>
      <Select
        value={value}
        onValueChange={onValueChange}
      >
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Välj" />
        </SelectTrigger>
        <SelectContent>
          {limitSelection.map((item) => {
            return (
              <SelectItem
                value={item.value}
                key={item.value}
              >
                {item.label}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </div>
  )
}

export default LimitSelection
