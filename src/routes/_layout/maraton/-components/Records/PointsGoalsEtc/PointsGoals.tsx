import type { RecordDataArrays } from '@/lib/types/records'
import { H2, H3 } from '../Headers'
import RenderPointsGoalsCard from './RenderPointsGoalsCard'

type PointsGoalsProps = {
  data: RecordDataArrays
  stat: string
}

const PointsGoals = ({ data, stat }: PointsGoalsProps) => {
  return (
    <div>
      <H2>Högsta</H2>
      <div className="grid grid-cols-1 gap-y-4 @3xl:grid-cols-2 @3xl:gap-4 @7xl:grid-cols-3 @7xl:gap-10">
        <div>
          <H3>Genomsnitt</H3>
          <div>
            <RenderPointsGoalsCard
              array={data.averageMax}
              stat={`averageMax${stat}sAll`}
            />
          </div>
        </div>
        <div>
          <H3>Genomsnitt Hemma</H3>
          <div>
            <RenderPointsGoalsCard
              array={data.averageMaxHome}
              stat={`averageMax${stat}sHome`}
            />
          </div>
        </div>
        <div>
          <H3>Genomsnitt Borta</H3>
          <div>
            <RenderPointsGoalsCard
              array={data.averageMaxAway}
              stat={`averageMax${stat}sAway`}
            />
          </div>
        </div>
      </div>
      <H2>Lägsta</H2>
      <div className="grid grid-cols-1 gap-y-4 @3xl:grid-cols-2 @3xl:gap-4 @7xl:grid-cols-3 @7xl:gap-10">
        <div>
          <H3>Genomsnitt</H3>
          <div>
            <RenderPointsGoalsCard
              array={data.averageMin}
              stat={`averageMin${stat}All`}
            />
          </div>
        </div>
        <div>
          <H3>Genomsnitt Hemma</H3>
          <div>
            <RenderPointsGoalsCard
              array={data.averageMinHome}
              stat={`averageMin${stat}Home`}
            />
          </div>
        </div>
        <div>
          <H3>Genomsnitt Borta</H3>
          <div>
            <RenderPointsGoalsCard
              array={data.averageMinAway}
              stat={`averageMin${stat}Away`}
            />
          </div>
        </div>
      </div>
      <H2>Högsta</H2>
      <div className="grid grid-cols-1 gap-y-4 @3xl:grid-cols-2 @3xl:gap-4 @7xl:grid-cols-3 @7xl:gap-10">
        <div>
          <H3>Totalt</H3>
          <div>
            <RenderPointsGoalsCard
              array={data.sumMax}
              stat={`sumMax${stat}sAll`}
            />
          </div>
        </div>
        <div>
          <H3>Totalt Hemma</H3>
          <div>
            <RenderPointsGoalsCard
              array={data.sumMaxHome}
              stat={`sumMax${stat}sHome`}
            />
          </div>
        </div>
        <div>
          <H3>Totalt Borta</H3>
          <div>
            <RenderPointsGoalsCard
              array={data.sumMaxAway}
              stat={`sumMax${stat}sAway`}
            />
          </div>
        </div>
      </div>
      <H2>Lägsta</H2>
      <div className="grid grid-cols-1 gap-y-4 @3xl:grid-cols-2 @3xl:gap-4 @7xl:grid-cols-3 @7xl:gap-10">
        <div>
          <H3>Totalt</H3>
          <div>
            <RenderPointsGoalsCard
              array={data.sumMin}
              stat={`sumMin${stat}All`}
            />
          </div>
        </div>
        <div>
          <H3>Totalt Hemma</H3>
          <div>
            <RenderPointsGoalsCard
              array={data.sumMinHome}
              stat={`sumMin${stat}Home`}
            />
          </div>
        </div>
        <div>
          <H3>Totalt Borta</H3>
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
