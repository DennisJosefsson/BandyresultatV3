import { RecordDataArrays } from '@/lib/types/records'
import RenderPointsGoalsCard from './RenderPointsGoalsCard'

type PointsGoalsProps = {
  data: RecordDataArrays
  stat: string
}

const PointsGoals = ({ data, stat }: PointsGoalsProps) => {
  return (
    <div>
      <h2 className="mb-2 text-sm leading-4 font-bold sm:text-lg lg:text-xl">
        Högsta
      </h2>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
        <div>
          <h3 className="mb-2 text-xs leading-4 font-bold sm:text-base lg:text-lg">
            Genomsnitt
          </h3>
          <div>
            <RenderPointsGoalsCard
              array={data.averageMax}
              stat={`averageMax${stat}sAll`}
            />
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-xs leading-4 font-bold sm:text-base lg:text-lg">
            Genomsnitt Hemma
          </h3>
          <div>
            <RenderPointsGoalsCard
              array={data.averageMaxHome}
              stat={`averageMax${stat}sHome`}
            />
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-xs leading-4 font-bold sm:text-base lg:text-lg">
            Genomsnitt Borta
          </h3>
          <div>
            <RenderPointsGoalsCard
              array={data.averageMaxAway}
              stat={`averageMax${stat}sAway`}
            />
          </div>
        </div>
      </div>
      <h2 className="mb-2 text-sm leading-4 font-bold sm:text-lg lg:text-xl">
        Lägsta
      </h2>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
        <div>
          <h3 className="mb-2 text-xs leading-4 font-bold sm:text-base lg:text-lg">
            Genomsnitt
          </h3>
          <div>
            <RenderPointsGoalsCard
              array={data.averageMin}
              stat={`averageMin${stat}All`}
            />
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-xs leading-4 font-bold sm:text-base lg:text-lg">
            Genomsnitt Hemma
          </h3>
          <div>
            <RenderPointsGoalsCard
              array={data.averageMinHome}
              stat={`averageMin${stat}Home`}
            />
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-xs leading-4 font-bold sm:text-base lg:text-lg">
            Genomsnitt Borta
          </h3>
          <div>
            <RenderPointsGoalsCard
              array={data.averageMinAway}
              stat={`averageMin${stat}Away`}
            />
          </div>
        </div>
      </div>
      <h2 className="mb-2 text-sm leading-4 font-bold sm:text-lg lg:text-xl">
        Högsta
      </h2>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
        <div>
          <h3 className="mb-2 text-xs leading-4 font-bold sm:text-base lg:text-lg">
            Totalt
          </h3>
          <div>
            <RenderPointsGoalsCard
              array={data.sumMax}
              stat={`sumMax${stat}sAll`}
            />
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-xs leading-4 font-bold sm:text-base lg:text-lg">
            Totalt Hemma
          </h3>
          <div>
            <RenderPointsGoalsCard
              array={data.sumMaxHome}
              stat={`sumMax${stat}sHome`}
            />
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-xs leading-4 font-bold sm:text-base lg:text-lg">
            Totalt Borta
          </h3>
          <div>
            <RenderPointsGoalsCard
              array={data.sumMaxAway}
              stat={`sumMax${stat}sAway`}
            />
          </div>
        </div>
      </div>
      <h2 className="mb-2 text-sm leading-4 font-bold sm:text-lg lg:text-xl">
        Lägsta
      </h2>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
        <div>
          <h3 className="mb-2 text-xs leading-4 font-bold sm:text-base lg:text-lg">
            Totalt
          </h3>
          <div>
            <RenderPointsGoalsCard
              array={data.sumMin}
              stat={`sumMin${stat}All`}
            />
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-xs leading-4 font-bold sm:text-base lg:text-lg">
            Totalt Hemma
          </h3>
          <div>
            <RenderPointsGoalsCard
              array={data.sumMinHome}
              stat={`sumMin${stat}Home`}
            />
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-xs leading-4 font-bold sm:text-base lg:text-lg">
            Totalt Borta
          </h3>
          <div>
            <RenderPointsGoalsCard
              array={data.sumMinAway}
              stat={`sumMin${stat}Away`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PointsGoals
