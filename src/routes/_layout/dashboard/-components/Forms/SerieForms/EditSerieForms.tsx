import { Button } from '@/components/base/ui/button'
import { Card } from '@/components/base/ui/card'
import { Outlet, getRouteApi } from '@tanstack/react-router'
import AddTeamToSerie from './AddTeamToSerie'
import EditSerie from './EditSerie'
import EditTeamSerie from './EditTeamserie'

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/info_/serie/$serieId/edit',
)

const EditSerieForms = () => {
  return (
    <div className="flex flex-col gap-4">
      <EditSerie />

      <div className="grid grid-cols-2 gap-8">
        <AddTeamToSerie />
        <EditTeamSerie />
      </div>
      <Card>
        <div className="mb-4 flex flex-row justify-center gap-6">
          <Button
            render={
              <route.Link
                to="/dashboard/season/$seasonId/info/serie/$serieId/edit/newParentId"
                search={(prev) => ({ women: prev.women })}
                resetScroll={false}
              >
                Redigera ParentId
              </route.Link>
            }
            nativeButton={false}
          />

          <Button
            render={
              <route.Link
                to="/dashboard/season/$seasonId/info/serie/$serieId/edit/games"
                search={(prev) => ({ women: prev.women })}
                resetScroll={false}
              >
                Matcher
              </route.Link>
            }
            nativeButton={false}
          />

          <Button
            render={
              <route.Link
                to="/dashboard/season/$seasonId/info/serie/$serieId/edit/generateschedule"
                search={(prev) => ({ women: prev.women })}
                resetScroll={false}
              >
                Generera spelschema
              </route.Link>
            }
            nativeButton={false}
          />

          <Button
            render={
              <route.Link
                to="/dashboard/season/$seasonId/info/serie/$serieId/edit/singlegame"
                search={(prev) => ({ women: prev.women })}
                resetScroll={false}
              >
                Lägg till match
              </route.Link>
            }
            nativeButton={false}
          />

          <Button
            render={
              <route.Link
                to="/dashboard/season/$seasonId/info/serie/$serieId/edit/addGames"
                search={(prev) => ({ women: prev.women })}
                resetScroll={false}
              >
                Lägg till matcher
              </route.Link>
            }
            nativeButton={false}
          />

          <Button
            render={
              <route.Link
                to="/dashboard/season/$seasonId/info/serie/$serieId/edit/addTable"
                search={(prev) => ({ women: prev.women })}
                resetScroll={false}
              >
                Lägg till tabell
              </route.Link>
            }
            nativeButton={false}
          />

          <Button
            render={
              <route.Link
                to="/dashboard/season/$seasonId/info/serie/$serieId/edit/editTable"
                search={(prev) => ({ women: prev.women })}
                resetScroll={false}
              >
                Ändra tabell
              </route.Link>
            }
            nativeButton={false}
          />

          <Button
            render={
              <route.Link
                to="."
                search={(prev) => ({ women: prev.women })}
                resetScroll={false}
              >
                Tillbaka
              </route.Link>
            }
            nativeButton={false}
          />
        </div>
        <Outlet />
      </Card>
    </div>
  )
}

export default EditSerieForms
