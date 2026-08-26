import { Button } from '@/components/base/ui/button'
import { Card } from '@/components/base/ui/card'
import { Outlet, getRouteApi } from '@tanstack/react-router'
import AddTeamToSerie from './AddTeamToSerie'
import EditCupSerie from './EditCupSerie'
import EditSerie from './EditSerie'
import EditTeamSerie from './EditTeamserie'

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/info_/serie/$serieId/edit',
)

const EditSerieForms = () => {
  const form = route.useSearch({ select: (s) => s.form })
  return (
    <div className="flex flex-col gap-4">
      {form === 'serie' ? <EditSerie /> : <EditCupSerie />}

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
                search={(prev) => ({ ...prev })}
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
                search={(prev) => ({ ...prev })}
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
                search={(prev) => ({ ...prev })}
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
                search={(prev) => ({ ...prev })}
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
                search={(prev) => ({ ...prev })}
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
                search={(prev) => ({ ...prev })}
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
                search={(prev) => ({ ...prev })}
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
                search={(prev) => ({ ...prev })}
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
