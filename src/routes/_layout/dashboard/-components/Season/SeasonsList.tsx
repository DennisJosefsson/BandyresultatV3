import { Input } from '@/components/ui/input'
import { getRouteApi } from '@tanstack/react-router'
import { useState } from 'react'

const route = getRouteApi('/_layout/dashboard/seasons/')

const SeasonsList = () => {
  const seasons = route.useLoaderData()
  const [filter, setFilter] = useState<string>('')

  const seasonsList = seasons.filter((s) => s.year.includes(filter))

  return (
    <div className="flex flex-col gap-2">
      <Input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="2025/2026"
      />
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-6">
        {seasonsList.map((season) => {
          return (
            <div key={season.seasonId.toString()} className="bg-muted/50">
              <route.Link
                to="/dashboard/season/$seasonId"
                search={{ women: season.women ? true : false }}
                params={{ seasonId: season.seasonId }}
              >
                <span className="font-semibold">{`${season.year} ${season.women ? 'Damer' : 'Herrar'}`}</span>
              </route.Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SeasonsList
