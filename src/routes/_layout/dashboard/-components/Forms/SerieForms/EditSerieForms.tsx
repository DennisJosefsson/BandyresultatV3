import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getRouteApi, Outlet } from '@tanstack/react-router'
import AddParentSerie from './AddParentSerie'
import AddTeamToSerie from './AddTeamToSerie'
import EditParentSerie from './EditParentSerie'
import EditSerie from './EditSerie'
import EditTeamSerie from './EditTeamserie'

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/info_/$serieId/edit',
)

const EditSerieForms = () => {
  return (
    <div className="flex flex-col gap-4">
      <EditSerie />
      <AddParentSerie />
      <EditParentSerie />
      <div className="grid grid-cols-2 gap-8">
        <AddTeamToSerie />
        <EditTeamSerie />
      </div>
      <Card>
        <div className="mb-4 flex flex-row justify-center gap-6">
          <Button asChild>
            <route.Link
              to="/dashboard/season/$seasonId/info/$serieId/edit/generateschedule"
              search={(prev) => ({ women: prev.women })}
            >
              Generera spelschema
            </route.Link>
          </Button>
          <Button asChild>
            <route.Link
              to="/dashboard/season/$seasonId/info/$serieId/edit/singlegame"
              search={(prev) => ({ women: prev.women })}
            >
              Lägg till match
            </route.Link>
          </Button>
          <Button asChild>
            <route.Link to="." search={(prev) => ({ women: prev.women })}>
              Tillbaka
            </route.Link>
          </Button>
        </div>
        <Outlet />
      </Card>
    </div>
  )
}

export default EditSerieForms
