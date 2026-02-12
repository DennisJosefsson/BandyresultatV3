import { semiColStarts } from '@/lib/utils/constants'
import { getRouteApi } from '@tanstack/react-router'

import DefaultComponent from './DefaultComponent'

const route = getRouteApi('/_layout/seasons/$year/playoff/table')

const SemiFinal = () => {
  const semiFinals = route.useLoaderData({ select: (s) => s.semiTables })
  if (!semiFinals) return null

  return (
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-5">
      {semiFinals.map((group, index) => (
        <DefaultComponent
          key={`${group.group}-${index}`}
          group={group}
          colStarts={semiColStarts}
        />
      ))}
    </div>
  )
}

export default SemiFinal
