import {
  useNavigate,
  useSearch,
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
import type {
  OperatorValues,
  SearchParamsFields,
} from '@/lib/types/search'

type OperatorSelectorProps = {
  array: Array<{
    value: OperatorValues
    label: string
  }>
  field: Extract<
    SearchParamsFields,
    | 'goalDiffOperator'
    | 'goalsScoredOperator'
    | 'goalsConcededOperator'
    | 'order'
    | 'orderVar'
  >
  defaultValue: 'gte' | 'lte' | 'eq' | 'asc' | 'date'
  label: string
}

const OperatorSelector = ({
  array,
  field,
  defaultValue,
  label,
}: OperatorSelectorProps) => {
  const searchField = useSearch({
    from: '/_layout/search',
    select: (search) => search[field],
  })
  const [value, setValue] = useState<OperatorValues>(
    searchField ?? defaultValue,
  )
  const navigate = useNavigate({ from: '/search' })

  const onValueChange = (val: OperatorValues): void => {
    navigate({
      resetScroll: false,
      search: (prev) => ({ ...prev, [field]: val }),
    })
    setValue(val)
  }
  return (
    <div>
      <Label>{label}</Label>
      <Select
        value={value}
        onValueChange={onValueChange}
      >
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Välj" />
        </SelectTrigger>
        <SelectContent>
          {array.map((item) => {
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

export default OperatorSelector
