import {
  getRouteApi,
  useNavigate,
} from '@tanstack/react-router'

import { Label } from '@/components/base/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/base/ui/select'

import { limitSelection } from './arrays/arrays'

const route = getRouteApi('/_layout/search')

const LimitSelection = () => {
  const limit = route.useSearch({
    select: (search) => search.limit,
  })

  const navigate = useNavigate({ from: '/search' })

  const onValueChange = (val: string | null): void => {
    if (val) {
      navigate({
        resetScroll: false,
        search: (prev) => ({
          ...prev,
          limit: parseInt(val),
        }),
      })
    }
  }
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5 px-1">
      <Label htmlFor="limit">Antal träffar</Label>
      <Select
        value={limit?.toString() ?? '10'}
        onValueChange={onValueChange}
        name="limit"
        id="limit"
      >
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Välj" />
        </SelectTrigger>
        <SelectContent>
          {limitSelection.map((item) => {
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

export default LimitSelection
