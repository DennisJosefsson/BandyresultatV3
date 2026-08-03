import type { CheckedState } from '@/components/base/ui/checkbox'
import type { MapRef } from '@/components/base/ui/map'
import CheckboxBadge from '@/components/Common/CheckboxBadge'
import type { LngLatLike } from 'maplibre-gl'
import type {
  Dispatch,
  RefObject,
  SetStateAction,
} from 'react'

type County = {
  county: string
}

type CountyArray = {
  county: string
  center: LngLatLike
}

type CountyListProp = {
  countyArray: Array<CountyArray>
  counties: Array<County>
  setCounties: Dispatch<SetStateAction<Array<County>>>
  mapRef: RefObject<MapRef | null>
}

const CountyList = ({
  countyArray,
  counties,
  setCounties,
  mapRef,
}: CountyListProp) => {
  if (!mapRef) return null
  const onCheckedChange = (
    checked: CheckedState,
    county: County,
  ) => {
    if (checked) {
      setCounties((prev) => [...prev, county])
    } else {
      setCounties((prev) =>
        prev.filter(
          (name) => name.county !== county.county,
        ),
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
    const countyObject = counties.find(
      (item) => item.county === county,
    )

    if (!countyObject) return false
    return true
  }

  return (
    <div className="grid w-full grid-cols-2 gap-4">
      <CheckboxBadge
        name="all"
        title="Alla"
        checked={counties.length === countyArray.length}
        onCheckedChange={onCheckedAllChange}
        orientation="horizontal"
        className="xl:max-w-60"
      />

      {countyArray.map((county) => {
        return (
          <CheckboxBadge
            key={county.county}
            title={county.county}
            name={county.county}
            checked={isChecked(county.county)}
            onCheckedChange={(checked) =>
              onCheckedChange(checked, county)
            }
            orientation="horizontal"
            className="xl:max-w-60"
          />
        )
      })}
    </div>
  )
}

export default CountyList
