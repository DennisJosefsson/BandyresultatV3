import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SearchParamsFields } from '@/lib/types/search'

import { useNavigate, useSearch } from '@tanstack/react-router'
import { ChangeEvent, useEffect, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

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
  const [input, setInput] = useState(searchField ?? '')
  const [debouncedValue, setValue] = useDebounceValue(input, 500)
  const navigate = useNavigate({ from: '/search' })

  useEffect(() => {
    navigate({
      resetScroll: false,
      search: (prev) => ({
        ...prev,
        [field]: debouncedValue.length === 0 ? undefined : debouncedValue,
      }),
    })
  }, [debouncedValue, field, navigate])

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
    setValue(event.target.value)
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5 px-1">
      <Label htmlFor={field}>{label}</Label>

      <Input
        value={input}
        onChange={handleOnChange}
        name={field}
        type="text"
        id={field}
        placeholder={placeholder}
      />
    </div>
  )
}

export default StringInput
