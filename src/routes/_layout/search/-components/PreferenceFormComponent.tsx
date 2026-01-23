import {
  gameResultArray,
  homeGameArray,
  selectedGenderArray,
} from './arrays/arrays'
import CategoryArray from './CategoryArray'
import RadioComponent from './RadioComponent'

const PreferenceFormComponent = () => {
  return (
    <div className="bg-background mb-2 flex w-[18rem] flex-col rounded lg:w-full">
      <div className="grid grid-cols-1 gap-y-2">
        <CategoryArray />
        <RadioComponent
          array={gameResultArray}
          label="Matchresultat"
          field="gameResult"
        />
        <RadioComponent
          array={homeGameArray}
          label="Hemma/Borta"
          field="homeGame"
        />
        <RadioComponent
          array={selectedGenderArray}
          label="Dam/Herr"
          field="selectedGender"
        />
      </div>
    </div>
  )
}

export default PreferenceFormComponent
