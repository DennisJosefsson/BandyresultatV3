import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { useNavigate, useSearch } from '@tanstack/react-router'
import { useState } from 'react'

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { SearchParamsFields } from '@/lib/types/search'

type RadioComponentProps = {
  array: { value: string; label: string }[]
  field: Extract<
    SearchParamsFields,
    'homeGame' | 'selectedGender' | 'gameResult'
  >
  label: string
}

const RadioComponent = ({ array, field, label }: RadioComponentProps) => {
  const searchField = useSearch({
    from: '/_layout/search',
    select: (search) => search[field],
  })
  const [selectedRadio, setSelectedRadio] = useState<string>(
    searchField ?? 'all',
  )
  const navigate = useNavigate({ from: '/search' })

  const handleOnChange = (value: string) => {
    navigate({
      resetScroll: false,
      search: (prev) => ({ ...prev, [field]: value }),
    })
    setSelectedRadio(value)
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{label}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            name={field}
            onValueChange={handleOnChange}
            defaultValue={selectedRadio}
            value={selectedRadio}
          >
            <div className="grid grid-cols-1 gap-y-2 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-12">
              {array.map((cat) => {
                return (
                  <div
                    key={cat.value}
                    className="flex items-center space-y-0 space-x-3"
                  >
                    <Label htmlFor={cat.value}>{cat.label}</Label>
                    <RadioGroupItem value={cat.value} id={cat.value} />
                  </div>
                )
              })}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  )
}

export default RadioComponent
