import { Label } from '@/components/base/ui/label'
import CustomNumberInput from '@/components/Common/CustomNumberInput'
import type { SearchParamsFields } from '@/lib/types/search'
import {
  useNavigate,
  useSearch,
} from '@tanstack/react-router'
import type { ChangeEvent } from 'react'

type NumberInputProps = {
  field: Extract<
    SearchParamsFields,
    | 'endSeason'
    | 'startSeason'
    | 'goalDiff'
    | 'goalsConceded'
    | 'goalsScored'
  >
  label: string
  placeholder: string
  min?: number
  max?: number
}

const NumberInput = ({
  field,
  label,
  placeholder,
  min,
  max,
}: NumberInputProps) => {
  const searchField = useSearch({
    from: '/_layout/search',
    select: (search) => search[field],
  })

  const navigate = useNavigate({ from: '/search' })

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
          [field]: Number(value),
        }),
      })
    }
  }

  const handleIncrement = () => {
    if (searchField || searchField === 0) {
      navigate({
        resetScroll: false,
        search: (prev) => ({
          ...prev,
          [field]: searchField + 1,
        }),
      })
    } else if (searchField === undefined) {
      navigate({
        resetScroll: false,
        search: (prev) => ({
          ...prev,
          [field]: 1,
        }),
      })
    }
  }

  const handleDecrement = () => {
    if (searchField || searchField === 0) {
      navigate({
        resetScroll: false,
        search: (prev) => ({
          ...prev,
          [field]: searchField - 1,
        }),
      })
    } else if (searchField === undefined) {
      navigate({
        resetScroll: false,
        search: (prev) => ({
          ...prev,
          [field]: -1,
        }),
      })
    }
  }

  const handleReset = () => {
    navigate({
      resetScroll: false,
      search: (prev) => ({
        ...prev,
        [field]: undefined,
      }),
    })
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5 px-1">
      <Label htmlFor={field}>{label}</Label>
      <CustomNumberInput
        value={searchField ?? ''}
        onChange={handleOnChange}
        name={field}
        id={field}
        placeholder={placeholder}
        incrementer={handleIncrement}
        decrementer={handleDecrement}
        resetter={handleReset}
        min={min}
        max={max}
      />
    </div>
  )
}

export default NumberInput
