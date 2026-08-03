import StringInput from './StringInput'
import NumberInput from './NumberInput'
import { useGetFirstAndLastSeason } from '../../seasons/$year/-hooks/useGetFirstAndLastSeason'

const SeasonFormComponent = () => {
  const seasons = useGetFirstAndLastSeason()
  return (
    <div className="mb-2 flex w-[18rem] flex-col rounded lg:w-full">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="flex max-w-[16rem] flex-col">
          <NumberInput
            field="startSeason"
            label="Första säsong"
            placeholder="T.ex. 1907"
            min={seasons.firstSeason}
            max={seasons.lastSeason}
          />
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <NumberInput
            field="endSeason"
            label="Sista säsong"
            placeholder="T.ex. 2019 för 2018/2019"
            min={seasons.firstSeason}
            max={seasons.lastSeason}
          />
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <StringInput field="inputDate" label="Matchdatum" placeholder="T.ex. 26/12" />
        </div>
      </div>
    </div>
  )
}

export default SeasonFormComponent
