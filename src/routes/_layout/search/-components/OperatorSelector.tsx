import {
  useNavigate,
  useSearch,
} from '@tanstack/react-router'

import { Label } from '@/components/base/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/base/ui/select'
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

  const navigate = useNavigate({ from: '/search' })

  const onValueChange = (
    val: OperatorValues | null,
  ): void => {
    if (val) {
      navigate({
        resetScroll: false,
        search: (prev) => ({ ...prev, [field]: val }),
      })
    }
  }

  const arrayLabel = searchField
    ? array.find((lab) => lab.value === searchField)?.label
    : array.find((lab) => lab.value === defaultValue)?.label

  return (
    <div>
      <Label>{label}</Label>
      <Select
        value={searchField ?? defaultValue}
        onValueChange={onValueChange}
      >
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Välj">
            {arrayLabel}
          </SelectValue>
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={true}>
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
