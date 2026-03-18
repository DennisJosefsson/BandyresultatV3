import type { LngLatLike } from 'maplibre-gl'
import type {
  Dispatch,
  RefObject,
  SetStateAction,
} from 'react'
import { useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'

import { Button } from '@/components/base/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from '@/components/base/ui/drawer'

import type { MapRef } from '@/components/base/ui/map'

import CountyList from './CountyList'

type County = {
  county: string
}

type CountyArray = {
  county: string
  center: LngLatLike
}

type CountyListContainerProp = {
  countyArray: Array<CountyArray>
  counties: Array<County>
  setCounties: Dispatch<SetStateAction<Array<County>>>
  mapRef: RefObject<MapRef | null>
}

const CountyListContainer = ({
  countyArray,
  counties,
  setCounties,
  mapRef,
}: CountyListContainerProp) => {
  const matches = useMediaQuery('(min-width: 1280px)')
  const matchesSmall = useMediaQuery('(min-width: 430px)')
  const [open, setOpen] = useState(false)
  return (
    <div>
      {matches ? (
        <div className="p-2">
          <CountyList
            countyArray={countyArray}
            setCounties={setCounties}
            counties={counties}
            mapRef={mapRef}
          />
        </div>
      ) : (
        <div>
          <Drawer
            open={open}
            onOpenChange={setOpen}
          >
            <DrawerTrigger asChild>
              <Button
                variant="outline"
                size={matchesSmall ? 'sm' : 'textxxs'}
              >
                Välj län
              </Button>
            </DrawerTrigger>

            <DrawerContent>
              <div className="m-2 max-h-[2/3] px-2 xs:px-4 sm:px-10">
                <CountyList
                  countyArray={countyArray}
                  setCounties={setCounties}
                  counties={counties}
                  mapRef={mapRef}
                />
              </div>

              <DrawerFooter className="pt-2">
                <DrawerClose asChild>
                  <Button variant="outline">Stäng</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      )}
    </div>
  )
}

export default CountyListContainer
