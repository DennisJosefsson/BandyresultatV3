import { Link, getRouteApi } from '@tanstack/react-router'

import { Button } from '@/components/base/ui/button'
import { useFavTeam } from '@/lib/contexts/favTeamsContext'

const route = getRouteApi('/_layout/teams/$teamId')

const TeamHeader = () => {
  const data = route.useLoaderData()

  const teamId = route.useParams({
    select: (params) => params.teamId,
  })
  const women = route.useSearch({ select: (s) => s.women })

  const { favTeams, setFavTeams } = useFavTeam()
  if (data.status === 404) return null
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
    setFavTeams([...favTeams.filter((id) => id !== teamId)])
  }

  return (
    <div className="mb-4">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row flex-wrap gap-2 text-xs sm:text-sm md:text-base xl:text-lg">
          <span>{data.team.name}</span>
          <div className="flex flex-row gap-2">
            <span>[ </span>
            <Link
              to="/teams/$teamId"
              params={{ teamId: data.team.teamId }}
              search={{ women }}
              activeOptions={{ exact: true }}
              className="font-normal"
            >
              Statistik
            </Link>
            <span> | </span>
            <Link
              to="/teams/$teamId/seasons"
              params={{ teamId: data.team.teamId }}
              search={{ women }}
              className="font-normal"
            >
              Säsonger
            </Link>
            <span> ]</span>
          </div>
        </div>

        <div className="flex flex-row items-center gap-1">
          {/* {origin ? (
            <Button onClick={goBack} size='responsive'>
              Tillbaka
            </Button>
          ) : null} */}

          {favTeams.includes(teamId) && (
            <Button
              onClick={remove}
              size="responsive"
            >
              Ta bort favorit
            </Button>
          )}
          {!favTeams.includes(teamId) && (
            <Button
              onClick={add}
              size="responsive"
            >
              Favoritlag
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default TeamHeader
