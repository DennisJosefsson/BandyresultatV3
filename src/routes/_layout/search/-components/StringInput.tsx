import {
  useNavigate,
  useSearch,
} from '@tanstack/react-router'
import type { ChangeEvent } from 'react'
import { useEffect, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

import { Input } from '@/components/base/ui/input'
import { Label } from '@/components/base/ui/label'
import type { SearchParamsFields } from '@/lib/types/search'

type StringInputProps = {
  field: Extract<SearchParamsFields, 'result' | 'inputDate'>
  label: string
  placeholder: string
}

const StringInput = ({
  field,
  label,
  placeholder,
}: StringInputProps) => {
  const searchField = useSearch({
    from: '/_layout/search',
    select: (search) => search[field],
  })
  const [input, setInput] = useState(searchField ?? '')
  const [debouncedValue, setValue] = useDebounceValue(
    input,
    250,
  )
  const navigate = useNavigate({ from: '/search' })

  useEffect(() => {
    navigate({
      resetScroll: false,
      search: (prev) => ({
        ...prev,
        [field]:
          debouncedValue.length === 0
            ? undefined
            : debouncedValue,
      }),
    })
  }, [debouncedValue, field, navigate])

  const handleOnChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
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
