import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/base/ui/tabs'
import TeamTable from './TeamTable'
import TeamFiveSeasonsTables from './TeamFiveSeasons'
import TeamCuriosities from './TeamCuriosities'

const Team = () => {
  return (
    <div>
      <Tabs defaultValue="tables" className="flex flex-col">
        <TabsList>
          <TabsTrigger className="text-[10px] md:text-sm" value="tables">
            Tabeller
          </TabsTrigger>
          <TabsTrigger className="text-[10px] md:text-sm" value="fiveSeasons">
            Senaste säsongerna
          </TabsTrigger>
          <TabsTrigger className="text-[10px] md:text-sm" value="stats">
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
    </div>
  )
}

export default Team
