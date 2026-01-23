import { orderSelection, orderVariableSelection } from "./arrays/arrays"
import LimitSelection from "./LimitSelection"
import OperatorSelector from "./OperatorSelector"

const OrderFormComponent = () => {
  return (
    <div className="mb-2 flex w-[18rem] flex-col rounded bg-background lg:w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="flex max-w-[16rem] flex-col">
          <LimitSelection />
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <OperatorSelector
            array={orderSelection}
            defaultValue="asc"
            label="Stigande/Fallande"
            field="order"
          />
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <OperatorSelector
            array={orderVariableSelection}
            defaultValue="date"
            label="Sorteringsvariabel"
            field="orderVar"
          />
        </div>
      </div>
    </div>
  )
}

export default OrderFormComponent
