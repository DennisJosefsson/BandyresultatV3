import {
  useNavigate,
  useSearch,
} from '@tanstack/react-router'

import RadioBadges from '@/components/Common/RadioBadge'
import type { SearchParamsFields } from '@/lib/types/search'

type RadioComponentProps = {
  array: Array<{
    value: string
    label: string
    description: string
  }>
  field: Extract<
    SearchParamsFields,
    'homeGame' | 'selectedGender' | 'gameResult'
  >
  label: string
  defaultValue: string
}

const RadioComponent = ({
  array,
  field,
  label,
  defaultValue,
}: RadioComponentProps) => {
  const searchField = useSearch({
    from: '/_layout/search',
    select: (search) => search[field],
  })

  const navigate = useNavigate({ from: '/search' })

  const handleOnChange = (value: string) => {
    navigate({
      resetScroll: false,
      search: (prev) => ({ ...prev, [field]: value }),
    })
  }

  return (
    <div className="flex flex-col gap-4 mt-2">
      <div>
        <h4 className="text-sm">{label}</h4>
      </div>
      <div>
        <RadioBadges
          array={array}
          orientation="horizontal"
          name={field}
          onValueChange={handleOnChange}
          defaultValue={defaultValue}
          value={searchField ?? 'all'}
          className="flex flex-row justify-between gap-8"
        />
      </div>
    </div>
  )
}

export default RadioComponent
