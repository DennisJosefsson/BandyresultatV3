import { getRouteApi } from '@tanstack/react-router'

import { TabsContent } from '@/components/base/ui/tabs'

import FirstGames from './CompareStatsSubComponents/FirstGames'
import Golds from './CompareStatsSubComponents/Golds'
import LatestGames from './CompareStatsSubComponents/LatestGames'
import LatestWins from './CompareStatsSubComponents/LatestWins'
import Playoffs from './CompareStatsSubComponents/Playoffs'
import Seasons from './CompareStatsSubComponents/Seasons'

const route = getRouteApi('/_layout/teams/compare')

const CompareStats = () => {
  const data = route.useLoaderData()

  if (data.status === 400 || data.status === 404)
    return null

  return (
    <>
      <TabsContent value="games">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <LatestWins
            latestWins={data.latestHomeWin}
            title="Senaste hemmavinsten"
          />
          <LatestWins
            latestWins={data.latestAwayWin}
            title="Senaste bortavinsten"
          />
          <FirstGames />
          <LatestGames />
        </div>
      </TabsContent>
      <TabsContent value="stats">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Seasons />
          <Playoffs />
          <Golds />
        </div>
      </TabsContent>
    </>
  )
}

export default CompareStats
