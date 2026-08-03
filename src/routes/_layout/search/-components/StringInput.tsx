import type { ChangeEvent } from 'react'
import { useNavigate, useSearch } from '@tanstack/react-router'
import type { SearchParamsFields } from '@/lib/types/search'
import { Label } from '@/components/base/ui/label'
import { Input } from '@/components/base/ui/input'

type StringInputProps = {
  field: Extract<SearchParamsFields, 'result' | 'inputDate'>
  label: string
  placeholder: string
}

const StringInput = ({ field, label, placeholder }: StringInputProps) => {
  const searchField = useSearch({
    from: '/_layout/search',
    select: (search) => search[field],
  })
  const navigate = useNavigate({ from: '/search' })

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    if (value === '') {
      navigate({
        resetScroll: false,
        search: (prev) => ({
          ...prev,
          [field]: undefined,
        }),
      })
    } else {
      navigate({
        resetScroll: false,
        search: (prev) => ({
          ...prev,
          [field]: value,
        }),
      })
    }
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5 px-1">
      <Label htmlFor={field} className="font-semibold md:text-sm">
        {label}
      </Label>

      <Input
        value={searchField ?? ''}
        onChange={handleOnChange}
        name={field}
        type="text"
        id={field}
        placeholder={placeholder}
        className="xs:w-3xs w-50"
      />
    </div>
  )
}

export default StringInput
