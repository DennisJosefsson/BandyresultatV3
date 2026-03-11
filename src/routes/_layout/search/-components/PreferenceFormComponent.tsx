import {
  gameResultArray,
  homeGameArray,
  selectedGenderArray,
} from './arrays/arrays'
import CategoryArray from './CategoryArray'
import RadioComponent from './RadioComponent'

const PreferenceFormComponent = () => {
  return (
    <div className="mb-2 flex w-[18rem] flex-col lg:w-full">
      <div className="grid grid-cols-1 gap-y-2">
        <CategoryArray />
        <RadioComponent
          array={gameResultArray}
          label="Matchresultat"
          field="gameResult"
          defaultValue='all'
        />
        <RadioComponent
          array={homeGameArray}
          label="Hemma/Borta"
          field="homeGame"
          defaultValue='all'
        />
        <RadioComponent
          array={selectedGenderArray}
          label="Dam/Herr"
          field="selectedGender"
          defaultValue='all'
        />
      </div>
    </div>
  )
}

export default PreferenceFormComponent
