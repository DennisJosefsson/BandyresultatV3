import { useNavigate, useSearch } from '@tanstack/react-router'
import type { SearchParamsFields } from '@/lib/types/search'
import RadioBadges from '@/components/Common/RadioBadge'

type RadioComponentProps = {
  array: Array<{
    value: string
    label: string
    description: string
  }>
  field: Extract<SearchParamsFields, 'homeGame' | 'selectedGender' | 'gameResult'>
  label: string
  defaultValue: string
}

const RadioComponent = ({ array, field, label, defaultValue }: RadioComponentProps) => {
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
    <div className="mt-2 flex flex-col gap-4">
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
          className="grid grid-cols-1 gap-4 sm:flex sm:flex-row sm:justify-between sm:gap-8"
        />
      </div>
    </div>
  )
}

export default RadioComponent
