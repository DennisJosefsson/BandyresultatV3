import { Input } from '@/components/base/ui/input'
import { Label } from '@/components/base/ui/label'
import type { SearchParamsFields } from '@/lib/types/search'
import {
  useNavigate,
  useSearch,
} from '@tanstack/react-router'
import type { ChangeEvent } from 'react'

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
  // const [input, setInput] = useState(searchField ?? '')
  // const [debouncedValue, setValue] = useDebounceValue(input, 250)
  const navigate = useNavigate({ from: '/search' })

  // useEffect(() => {
  //   navigate({
  //     resetScroll: false,
  //     search: (prev) => ({
  //       ...prev,
  //       [field]: debouncedValue.length === 0 ? undefined : debouncedValue,
  //     }),
  //   })
  // }, [debouncedValue, field, navigate])

  // const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setInput(event.target.value)
  //   setValue(event.target.value)
  // }

  const handleOnChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
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
      <Label htmlFor={field}>{label}</Label>

      <Input
        value={searchField ?? ''}
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
