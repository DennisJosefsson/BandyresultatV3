import { Outlet, getRouteApi } from '@tanstack/react-router'

import { Button } from '@/components/base/ui/button'
import { Card } from '@/components/base/ui/card'

import AddTeamToSerie from './AddTeamToSerie'
import EditSerie from './EditSerie'
import EditTeamSerie from './EditTeamserie'

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/info_/$serieId/edit',
)

const EditSerieForms = () => {
  const data = route.useLoaderData()

  const disabled = data.teamsInSerie.length === 0
  return (
    <div className="flex flex-col gap-4">
      <EditSerie />

      <div className="grid grid-cols-2 gap-8">
        <AddTeamToSerie />
        <EditTeamSerie />
      </div>
      <Card>
        <div className="mb-4 flex flex-row justify-center gap-6">
          <Button render={<route.Link
              to="/dashboard/season/$seasonId/info/$serieId/edit/newParentId"
              search={(prev) => ({ women: prev.women })}
            >
              Lägg till ParentId
            </route.Link>} nativeButton={false}/>
            
          
          <Button render={<route.Link
              to="/dashboard/season/$seasonId/info/$serieId/edit/editParentId"
              search={(prev) => ({ women: prev.women })}
            >
              Redigera ParentId
            </route.Link>} nativeButton={false}/>
            
          
          <Button render={<route.Link
              to="/dashboard/season/$seasonId/info/$serieId/edit/games"
              search={(prev) => ({ women: prev.women })}
              disabled={disabled}
            >
              Matcher
            </route.Link>} nativeButton={false} disabled={disabled}/>
            
          
          <Button render={<route.Link
              to="/dashboard/season/$seasonId/info/$serieId/edit/generateschedule"
              search={(prev) => ({ women: prev.women })}
              disabled={disabled}
            >
              Generera spelschema
            </route.Link>} nativeButton={false} disabled={disabled}/>
            
          
          <Button render={<route.Link
              to="/dashboard/season/$seasonId/info/$serieId/edit/singlegame"
              search={(prev) => ({ women: prev.women })}
              disabled={disabled}
            >
              Lägg till match
            </route.Link>} nativeButton={false} disabled={disabled}/>
            
          
          <Button render={<route.Link
              to="/dashboard/season/$seasonId/info/$serieId/edit/addGames"
              search={(prev) => ({ women: prev.women })}
              disabled={disabled}
            >
              Lägg till matcher
            </route.Link>} nativeButton={false} disabled={disabled}/>
            
          
          <Button render={<route.Link
              to="/dashboard/season/$seasonId/info/$serieId/edit/addTable"
              search={(prev) => ({ women: prev.women })}
              disabled={disabled}
            >
              Lägg till tabell
            </route.Link>} nativeButton={false} disabled={disabled}/>
            
          
          <Button render={<route.Link
              to="/dashboard/season/$seasonId/info/$serieId/edit/editTable"
              search={(prev) => ({ women: prev.women })}
              disabled={disabled}
            >
              Ändra tabell
            </route.Link>} nativeButton={false} disabled={disabled}/>
            
          
          <Button render={<route.Link to="." search={(prev) => ({ women: prev.women })}>
              Tillbaka
            </route.Link>} nativeButton={false}/>
            
          
        </div>
        <Outlet />
      </Card>
    </div>
  )
}

export default EditSerieForms
