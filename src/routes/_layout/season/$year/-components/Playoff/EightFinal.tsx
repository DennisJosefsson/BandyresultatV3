import { eightColStarts, eightColStartsFourTeams } from '@/lib/utils/constants'
import { getRouteApi } from '@tanstack/react-router'
import DefaultComponent from './DefaultComponent'

const route = getRouteApi('/_layout/season/$year/playoff/table')

const EightFinal = () => {
  const eightFinals = route.useLoaderData({ select: (s) => s.eightTables })
  if (!eightFinals) return null
  if (eightFinals.length === 2) {
    return (
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-5">
        {eightFinals.map((group, index) => {
          return (
            <DefaultComponent
              key={`${group.group}-${index}`}
              group={group}
              colStarts={eightColStarts}
            />
          )
        })}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-4">
      {eightFinals.map((group, index) => {
        return (
          <DefaultComponent
            key={`${group.group}-${index}`}
            group={group}
            colStarts={eightColStartsFourTeams}
          />
        )
      })}
    </div>
  )
}

export default EightFinal
