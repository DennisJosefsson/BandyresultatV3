import { Checkbox, CheckedState } from '@/components/ui/checkbox'
import { LatLng, LatLngTuple, Map as MapType } from 'leaflet'
import { Dispatch, SetStateAction } from 'react'

type County = {
  county: string
}

type CountyArray = {
  county: string
  center: LatLng
}

type CountyListProp = {
  countyArray: CountyArray[]
  counties: County[]
  setCounties: Dispatch<SetStateAction<County[]>>
  map: MapType | null
}

const CountyList = ({
  countyArray,
  counties,
  setCounties,
  map,
}: CountyListProp) => {
  if (!map) return null
  const onCheckedChange = (checked: CheckedState, county: County) => {
    if (checked) {
      setCounties((prev) => [...prev, county])
    } else {
      setCounties((prev) =>
        prev.filter((name) => name.county !== county.county)
      )
    }
  }

  const onCheckedAllChange = (checked: CheckedState) => {
    if (checked) {
      setCounties(
        countyArray.map((item) => {
          return { county: item.county }
        })
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

  const onClick = (center: LatLng | LatLngTuple, zoom: number = 7.5) => {
    map?.setView(center, zoom)
  }

  return (
    <div className="grid grid-cols-2 gap-2 md:gap-0 md:flex md:flex-col">
      <div className="xs:max-w-48 md:max-w-96 flex flex-row justify-between mb-2 text-[10px] md:text-sm xl:text-base 2xl:text-lg text-primary items-center">
        <span
          className="truncate cursor-pointer"
          onClick={() => onClick([62, 15] as LatLngTuple, 4)}
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
            className="xs:max-w-48 md:max-w-96 flex flex-row justify-between mb-2 text-primary items-center text-[10px] md:text-sm xl:text-base 2xl:text-lg"
          >
            <span
              className="truncate cursor-pointer"
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
