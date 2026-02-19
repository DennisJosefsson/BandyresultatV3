import { Button } from '@/components/ui/button'
import { CardHeader, CardTitle } from '@/components/ui/card'
import { useFavTeam } from '@/lib/contexts/favTeamsContext'

import { getRouteApi, Link } from '@tanstack/react-router'
import { useMediaQuery } from 'usehooks-ts'

const route = getRouteApi('/_layout/teams/$teamId')

const TeamHeader = () => {
  const team = route.useLoaderData({ select: (data) => data.team })
  const teamId = route.useParams({ select: (params) => params.teamId })
  const women = route.useSearch({ select: (s) => s.women })
  const matches = useMediaQuery('(min-width: 430px)')
  const { favTeams, setFavTeams } = useFavTeam()

  //   const { origin } = getOrigin()
  //   const navigate = useNavigate()

  //   const goBack = () => {
  //     origin && navigate({ to: origin })
  //     resetOrigin()
  //   }

  const add = () => {
    if (!favTeams.includes(teamId)) {
      setFavTeams([...favTeams.concat(teamId)])
    }
  }

  const remove = () => {
    setFavTeams([...favTeams.filter((team) => team !== teamId)])
  }

  return (
    <CardHeader className="p-1 md:p-6">
      <div className="flex flex-row items-center justify-between">
        <CardTitle className="flex flex-row flex-wrap gap-2 text-xs sm:text-sm md:text-base xl:text-lg">
          <span>{team.name}</span>
          <div className="flex flex-row gap-2">
            <span>[ </span>
            <Link
              to="/teams/$teamId"
              params={{ teamId: team.teamId }}
              search={{ women }}
              activeOptions={{ exact: true }}
              className="font-normal"
            >
              Statistik
            </Link>
            <span> | </span>
            <Link
              to="/teams/$teamId/seasons"
              params={{ teamId: team.teamId }}
              search={{ women }}
              className="font-normal"
            >
              Säsonger
            </Link>
            <span> ]</span>
          </div>
        </CardTitle>

        <div className="flex flex-row items-center gap-1">
          {/* {origin ? (
            <Button onClick={goBack} size={matches ? 'sm' : 'xxs'}>
              Tillbaka
            </Button>
          ) : null} */}

          {favTeams.includes(teamId) && (
            <Button onClick={remove} size={matches ? 'sm' : 'xxs'}>
              Ta bort favorit
            </Button>
          )}
          {!favTeams.includes(teamId) && (
            <Button onClick={add} size={matches ? 'sm' : 'xxs'}>
              Favoritlag
            </Button>
          )}
        </div>
      </div>
    </CardHeader>
  )
}

export default TeamHeader
