import RadioComponent from './RadioComponent'
import CategoryArray from './CategoryArray'
import { gameResultArray, homeGameArray, selectedGenderArray } from './arrays/arrays'

const PreferenceFormComponent = () => {
  return (
    <div className="mb-2 flex flex-col">
      <div className="grid grid-cols-1 gap-y-2">
        <CategoryArray />
        <RadioComponent
          array={gameResultArray}
          label="Matchresultat"
          field="gameResult"
          defaultValue="all"
          className="msm:grid-cols-2 grid-cols-1 gap-2 xl:grid-cols-4"
        />
        <RadioComponent
          array={homeGameArray}
          label="Hemma/Borta"
          field="homeGame"
          defaultValue="all"
          className="msm:grid-cols-3 grid-cols-1 gap-2"
        />
        <RadioComponent
          array={selectedGenderArray}
          label="Dam/Herr"
          field="selectedGender"
          defaultValue="all"
          className="msm:grid-cols-3 grid-cols-1 gap-2"
        />
      </div>
    </div>
  )
}

export default PreferenceFormComponent
