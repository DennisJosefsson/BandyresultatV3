import { Button } from '@/components/base/ui/button'
import TeamLogo from '@/components/Common/TeamLogo'
import { useFavTeam } from '@/lib/contexts/favTeamsContext'
import { getRouteApi } from '@tanstack/react-router'

const route = getRouteApi('/_layout/teams/$teamId')

const TeamHeader = () => {
  const data = route.useLoaderData()

  const teamId = route.useParams({
    select: (params) => params.teamId,
  })

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
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <span className="text-sm sm:text-md md:text-lg xl:text-2xl tracking-wide xs:tracking-widest">
              {data.team.name}
            </span>
            <span className="text-xs md:text-sm xl:text-base">
              {data.team.city}
            </span>
          </div>

          <div>
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

        <div className="bg-accent rounded-full overflow-hidden w-8 xs:w-16 md:w-24 lg:w-32">
          <TeamLogo
            className="w-8 xs:w-16 md:w-24 lg:w-32 object-scale-down"
            size={128}
            teamId={teamId}
            alt={data.team.name}
            title={data.team.name}
          ></TeamLogo>
        </div>
      </div>
    </div>
  )
}

export default TeamHeader
