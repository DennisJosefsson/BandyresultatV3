import { operatorSelection } from './arrays/arrays'
import NumberInput from './NumberInput'
import OperatorSelector from './OperatorSelector'
import StringInput from './StringInput'

const ResultFormComponent = () => {
  return (
    <div className="bg-background mb-2 flex w-[18rem] flex-col rounded lg:w-full">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="flex max-w-[16rem] flex-col lg:col-span-2">
          <StringInput
            field="result"
            label="Resultat"
            placeholder="T.ex. 5-3"
          />
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <NumberInput
            field="goalDiff"
            label="Målskillnad"
            placeholder="Siffra större än 0."
          />
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <OperatorSelector
            array={operatorSelection}
            field="goalDiffOperator"
            defaultValue="gte"
            label="Sortering"
          />
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <NumberInput
            field="goalsScored"
            label="Gjorda mål"
            placeholder="Siffra större än 0."
          />
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <OperatorSelector
            array={operatorSelection}
            field="goalsScoredOperator"
            defaultValue="gte"
            label="Sortering"
          />
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <NumberInput
            field="goalsConceded"
            label="Insläppta mål"
            placeholder="Siffra större än 0."
          />
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <OperatorSelector
            array={operatorSelection}
            field="goalsConcededOperator"
            defaultValue="lte"
            label="Sortering"
          />
        </div>
      </div>
    </div>
  )
}

export default ResultFormComponent
