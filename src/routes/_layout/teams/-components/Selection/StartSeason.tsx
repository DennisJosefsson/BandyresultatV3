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

const StartSeason = () => {
  const listRef = useListRef(null)
  const { women, startSeason } = useSearch({
    from: '/_layout/teams/selection',
  })
  const navigate = useNavigate({ from: '/teams/selection' })
  const { startOptions: teams } = useCompareSeasons()
  const [value, setValue] = useState<string>(
    startSeason
      ? startSeason.toString()
      : teams.slice(0, 1)[0].value.toString(),
  )

  const onValueChange = (value: string): void => {
    navigate({
      resetScroll: false,
      search: (prev) => ({ ...prev, startSeason: parseInt(value) }),
    })
    setValue(value)
  }

  const onOpenChange = (open: boolean): void => {
    if (open && listRef && listRef.current) {
      listRef.current.scrollToRow({
        index: teams.findIndex((val) => val.value === parseInt(value)),
        align: 'center',
        behavior: 'smooth',
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
          <CardTitle>Första säsong</CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={value}
            onValueChange={onValueChange}
            onOpenChange={(open) => onOpenChange(open)}
          >
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder={women ? '1972/73' : '1907'}>
                {selectedLabel}
              </SelectValue>
            </SelectTrigger>
            <SelectContent onCloseAutoFocus={(e) => e.preventDefault()}>
              <List
                rowComponent={RenderItem}
                rowHeight={250}
                rowCount={12}
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

export default StartSeason
