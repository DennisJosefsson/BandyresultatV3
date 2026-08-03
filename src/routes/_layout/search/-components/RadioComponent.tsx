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
  className?: string
}

const RadioComponent = ({ array, field, label, defaultValue, className }: RadioComponentProps) => {
  const searchField = useSearch({
    from: '/_layout/search',
    select: (search) => search[field],
  })

  const navigate = useNavigate({ from: '/search' })

  const handleOnChange = (value: string) => {
    navigate({
      resetScroll: true,
      search: (prev) => ({ ...prev, [field]: value }),
    })
  }

  return (
    <div className="mt-2 flex flex-col gap-4">
      <div>
        <h4 className="font-semibold md:text-sm">{label}</h4>
      </div>
      <div>
        <RadioBadges
          array={array}
          orientation="horizontal"
          name={field}
          onValueChange={handleOnChange}
          defaultValue={defaultValue}
          value={searchField ?? 'all'}
          className={className}
        />
      </div>
    </div>
  )
}

export default RadioComponent
