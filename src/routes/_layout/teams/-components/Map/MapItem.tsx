import { Checkbox, CheckedState } from '@/components/ui/checkbox'
//import { setOrigin } from '@/lib/zustand/linkOrigin/linkOriginStore'
//import { Link, useLocation, useSearch } from '@tanstack/react-router'
import { Marker, Popup } from 'react-leaflet'

type Team = {
  teamId: number | null
  casualName: string
}

type MapItemProps = {
  team: Team
  selectedTeams: number[]
  position: [number, number]
  onCheckedChange: (checked: CheckedState, teamId: number) => void
}

const MapItem = ({
  team,
  position,
  selectedTeams,
  onCheckedChange,
}: MapItemProps) => {
  // const women = useSearch({
  //   from: '/_layout',
  //   select: (search) => search.women,
  // })
  // const pathName = useLocation().pathname

  if (team.teamId === null) return null

  return (
    <Marker key={team.teamId} position={position}>
      <Popup>
        <div className="flex flex-row items-center justify-between gap-2 p-2 font-semibold">
          {/* <Link
            to="/team/$teamId"
            params={{
              teamId: team.teamId,
            }}
            search={{ women }}
            onClick={() => setOrigin(`${pathName}?women=${women}`)}
          > */}
          {team.casualName}
          {/* </Link> */}

          <Checkbox
            name="teamArray"
            checked={selectedTeams.includes(team.teamId)}
            onCheckedChange={(checked) =>
              team.teamId && onCheckedChange(checked, team.teamId)
            }
          />
        </div>
      </Popup>
    </Marker>
  )
}

export default MapItem
