import { Outlet, getRouteApi } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

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
          <Button asChild>
            <route.Link
              to="/dashboard/season/$seasonId/info/$serieId/edit/newParentId"
              search={(prev) => ({ women: prev.women })}
            >
              Lägg till ParentId
            </route.Link>
          </Button>
          <Button asChild>
            <route.Link
              to="/dashboard/season/$seasonId/info/$serieId/edit/editParentId"
              search={(prev) => ({ women: prev.women })}
            >
              Redigera ParentId
            </route.Link>
          </Button>
          <Button asChild disabled={disabled}>
            <route.Link
              to="/dashboard/season/$seasonId/info/$serieId/edit/games"
              search={(prev) => ({ women: prev.women })}
              disabled={disabled}
            >
              Matcher
            </route.Link>
          </Button>
          <Button asChild disabled={disabled}>
            <route.Link
              to="/dashboard/season/$seasonId/info/$serieId/edit/generateschedule"
              search={(prev) => ({ women: prev.women })}
              disabled={disabled}
            >
              Generera spelschema
            </route.Link>
          </Button>
          <Button asChild disabled={disabled}>
            <route.Link
              to="/dashboard/season/$seasonId/info/$serieId/edit/singlegame"
              search={(prev) => ({ women: prev.women })}
              disabled={disabled}
            >
              Lägg till match
            </route.Link>
          </Button>
          <Button asChild disabled={disabled}>
            <route.Link
              to="/dashboard/season/$seasonId/info/$serieId/edit/addGames"
              search={(prev) => ({ women: prev.women })}
              disabled={disabled}
            >
              Lägg till matcher
            </route.Link>
          </Button>
          <Button asChild disabled={disabled}>
            <route.Link
              to="/dashboard/season/$seasonId/info/$serieId/edit/addTable"
              search={(prev) => ({ women: prev.women })}
              disabled={disabled}
            >
              Lägg till tabell
            </route.Link>
          </Button>
          <Button asChild disabled={disabled}>
            <route.Link
              to="/dashboard/season/$seasonId/info/$serieId/edit/editTable"
              search={(prev) => ({ women: prev.women })}
              disabled={disabled}
            >
              Ändra tabell
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
