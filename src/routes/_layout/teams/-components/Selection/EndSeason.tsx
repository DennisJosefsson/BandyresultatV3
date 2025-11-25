import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { useNavigate, useSearch } from '@tanstack/react-router'
import { useState } from 'react'
import { List, useListRef } from 'react-window'
import { useCompareSeasons } from '../../-hooks/getCompareSeasons'
import RenderItem from './RenderItem'

const EndSeason = () => {
  const listRef = useListRef(null)
  const { endSeason } = useSearch({
    from: '/_layout/teams',
  })
  const navigate = useNavigate({ from: '/teams/selection' })
  const { endOptions: teams, endOptionsPlaceholder } = useCompareSeasons()
  const [value, setValue] = useState<string>(
    endSeason ? endSeason.toString() : teams.slice(0, 1)[0].value.toString(),
  )

  const onValueChange = (value: string): void => {
    navigate({
      resetScroll: false,
      search: (prev) => ({ ...prev, endSeason: parseInt(value) }),
    })
    setValue(value)
  }

  const onOpenChange = (open: boolean): void => {
    if (open && listRef && listRef.current) {
      listRef.current.scrollToRow({
        align: 'center',
        behavior: 'smooth',
        index: teams.findIndex((val) => val.value === parseInt(value)),
      })
    }
  }

  const selectedLabel = teams.find(
    (val) => val.value === parseInt(value),
  )?.label

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Sista säsong</CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={value}
            onValueChange={onValueChange}
            onOpenChange={(open) => onOpenChange(open)}
          >
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder={endOptionsPlaceholder}>
                {selectedLabel}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <List
                rowComponent={RenderItem}
                rowHeight={16}
                rowCount={teams.length}
                listRef={listRef}
                rowProps={{ teams }}
              />
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  )
}

export default EndSeason
