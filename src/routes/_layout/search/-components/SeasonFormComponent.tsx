import NumberInput from './NumberInput'
import StringInput from './StringInput'

const SeasonFormComponent = () => {
  return (
    <div className="bg-background mb-2 flex w-[18rem] flex-col rounded lg:w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="flex max-w-[16rem] flex-col">
          <NumberInput
            field="startSeason"
            label="Första säsong"
            placeholder="T.ex. 1907"
          />
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <NumberInput
            field="endSeason"
            label="Sista säsong"
            placeholder="T.ex. 2019"
          />
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <StringInput
            field="inputDate"
            label="Matchdatum"
            placeholder="T.ex. 26/12"
          />
        </div>
      </div>
    </div>
  )
}

export default SeasonFormComponent
