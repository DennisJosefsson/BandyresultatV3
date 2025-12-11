import { CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import TeamCuriosities from './TeamCuriosities'
import TeamFiveSeasonsTables from './TeamFiveSeasons'
import TeamTable from './TeamTable'

const Team = () => {
  return (
    <CardContent className="p-1 md:p-6">
      <Tabs defaultValue="tables">
        <TabsList>
          <TabsTrigger
            className="truncate text-[10px] md:text-sm"
            value="tables"
          >
            Tabeller
          </TabsTrigger>
          <TabsTrigger
            className="truncate text-[10px] md:text-sm"
            value="fiveSeasons"
          >
            Senaste säsongerna
          </TabsTrigger>
          <TabsTrigger
            className="truncate text-[10px] md:text-sm"
            value="stats"
          >
            Statistik
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tables">
          <TeamTable />
        </TabsContent>
        <TabsContent value="fiveSeasons">
          <TeamFiveSeasonsTables />
        </TabsContent>
        <TabsContent value="stats">
          <TeamCuriosities />
        </TabsContent>
      </Tabs>
    </CardContent>
  )
}

export default Team
