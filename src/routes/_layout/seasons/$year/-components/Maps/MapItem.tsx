import { ExternalLinkIcon } from 'lucide-react'
import { getRouteApi } from '@tanstack/react-router'
import type { Team } from '@/lib/types/team'
import type { Municipality } from '@/lib/types/municipality'
import type { County } from '@/lib/types/county'
import { MapMarker, MarkerContent, MarkerPopup, MarkerTooltip } from '@/components/base/ui/map'
import { Button } from '@/components/base/ui/button'

type MapItemProps = {
  team: {
    team: Team
    county: County
    municipality: Municipality
  }
  latitude: number
  longitude: number
}

const route = getRouteApi('/_layout/seasons/$year/playoff/map')

function MapItem({ team, latitude, longitude }: MapItemProps) {
  return (
    <MapMarker latitude={latitude} longitude={longitude} anchor="center">
      <MarkerContent>
        <div className="size-4 rounded-full border-2 border-orange-500 bg-orange-500 opacity-75 shadow-lg" />
      </MarkerContent>
      <MarkerTooltip>{team.team.name}</MarkerTooltip>
      <MarkerPopup className="w-35 sm:w-85 md:w-100">
        <div className="flex w-full flex-col gap-2 sm:gap-4">
          <div className="xs:flex-row xs:justify-between xsitems-center flex flex-col">
            <span className="text-[8px] font-bold sm:text-sm md:text-base lg:text-lg">
              {team.team.name}
            </span>
            <span className="text-[8px] sm:text-sm md:text-base lg:text-lg">{team.team.city}</span>
          </div>
          <div className="flex flex-row items-center justify-between">
            <span className="text-foreground text-[8px] font-medium sm:text-sm md:text-base lg:text-lg">
              {team.county.name}
            </span>

            <Button
              render={
                <route.Link
                  to="/teams/$teamId"
                  params={{ teamId: team.team.teamId }}
                  search={(prev) => ({ women: prev.women })}
                >
                  <span>
                    <ExternalLinkIcon className="size-2 sm:size-4" />
                  </span>
                  <span className="sr-only">Lagsidan</span>
                </route.Link>
              }
              nativeButton={false}
              variant="ghost"
            />
          </div>
        </div>
      </MarkerPopup>
    </MapMarker>
  )
}

export default MapItem
