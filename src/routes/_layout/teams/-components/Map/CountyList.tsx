import { Checkbox, CheckedState } from '@/components/ui/checkbox'
import { MapRef } from '@/components/ui/map'
import { LngLatLike } from 'maplibre-gl'
import { Dispatch, RefObject, SetStateAction } from 'react'

type County = {
  county: string
}

type CountyArray = {
  county: string
  center: LngLatLike
}

type CountyListProp = {
  countyArray: CountyArray[]
  counties: County[]
  setCounties: Dispatch<SetStateAction<County[]>>
  mapRef: RefObject<MapRef | null>
}

const CountyList = ({
  countyArray,
  counties,
  setCounties,
  mapRef,
}: CountyListProp) => {
  if (!mapRef) return null
  const onCheckedChange = (checked: CheckedState, county: County) => {
    if (checked) {
      setCounties((prev) => [...prev, county])
    } else {
      setCounties((prev) =>
        prev.filter((name) => name.county !== county.county),
      )
    }
  }

  const onCheckedAllChange = (checked: CheckedState) => {
    if (checked) {
      setCounties(
        countyArray.map((item) => {
          return { county: item.county }
        }),
      )
    } else {
      setCounties([])
    }
  }

  const isChecked = (county: string) => {
    const countyObject = counties.find((item) => item.county === county)

    if (!countyObject) return false
    return true
  }

  const onClick = (center: LngLatLike, zoom: number = 7.5) => {
    mapRef.current?.easeTo({ center, zoom })
  }

  return (
    <div className="grid grid-cols-2 gap-2 md:flex md:flex-col md:gap-0">
      <div className="xs:max-w-48 text-primary mb-2 flex flex-row items-center justify-between text-[10px] md:max-w-96 md:text-sm xl:text-base 2xl:text-lg">
        <span
          className="cursor-pointer truncate"
          onClick={() => onClick([15, 62] as LngLatLike, 4)}
        >
          Alla
        </span>
        <Checkbox
          name="all"
          checked={counties.length === countyArray.length}
          onCheckedChange={onCheckedAllChange}
        />
      </div>
      {countyArray.map((county) => {
        return (
          <div
            key={county.county}
            className="xs:max-w-48 text-primary mb-2 flex flex-row items-center justify-between text-[10px] md:max-w-96 md:text-sm xl:text-base 2xl:text-lg"
          >
            <span
              className="cursor-pointer truncate"
              onClick={() => onClick(county.center)}
            >
              {county.county}
            </span>
            <Checkbox
              name={county.county}
              checked={isChecked(county.county)}
              onCheckedChange={(checked) => onCheckedChange(checked, county)}
            />
          </div>
        )
      })}
    </div>
  )
}

export default CountyList
