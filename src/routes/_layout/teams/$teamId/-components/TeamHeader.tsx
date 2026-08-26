import TeamLogo from '@/components/Common/TeamLogo'
import { Button } from '@/components/base/ui/button'
import { useCookies } from '@/lib/contexts/cookieContext'
import { getRouteApi } from '@tanstack/react-router'

const route = getRouteApi('/_layout/teams/$teamId')

const TeamHeader = () => {
  const data = route.useLoaderData()

  const teamId = route.useParams({
    select: (params) => params.teamId,
  })

  const { favTeams, setFavTeams } = useCookies()
  if (data.status === 404) return null

  const add = () => {
    if (!favTeams.includes(teamId)) {
      setFavTeams([...favTeams.concat(teamId)])
    }
  }

  const remove = () => {
    setFavTeams([...favTeams.filter((id) => id !== teamId)])
  }

  return (
    <div className="mb-4 border-b">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <span className="sm:text-md xs:tracking-widest text-sm tracking-wide md:text-lg xl:text-2xl">
              {data.team.name}
            </span>
            <span className="text-xs md:text-sm xl:text-base">
              {data.team.city}
            </span>
          </div>

          <div>
            {favTeams.includes(teamId) ? (
              <Button
                onClick={remove}
                size="responsive"
              >
                Ta bort favorit
              </Button>
            ) : (
              <Button
                onClick={add}
                size="responsive"
              >
                Favoritlag
              </Button>
            )}
          </div>
        </div>

        <div>
          <TeamLogo
            className="xs:w-16 w-8 object-scale-down md:w-24 lg:w-32"
            size={128}
            teamId={teamId}
            aria-label={data.team.name}
            title={data.team.name}
          ></TeamLogo>
        </div>
      </div>
    </div>
  )
}

export default TeamHeader
