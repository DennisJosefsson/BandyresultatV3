import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/base/ui/card'
import TeamLogo from '@/components/Common/TeamLogo'
import { useCookies } from '@/lib/contexts/cookieContext'
import type { CompareStatsV2 } from '@/lib/types/compare'
import { StarIcon } from 'lucide-react'
import DataCard from './DataCard'

type StatsProps = {
  stats: CompareStatsV2
}

const Stats = ({ stats }: StatsProps) => {
  const { favTeams } = useCookies()
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row gap-0.5 @sm:gap-1 @lg:gap-2 items-center justify-start">
            <TeamLogo
              size={32}
              logoId={stats.team.logo.logoId}
              hasDark={stats.team.logo.hasDark}
              className="size-[1lh] object-scale-down"
              aria-label={stats.team.casualName}
              title={stats.team.casualName}
            />
            <span className="@md:block hidden truncate @xs:tracking-wide font-semibold">
              {stats.team.name}
            </span>
            <span className="block @md:hidden">
              {stats.team.shortName}
            </span>
            <StarIcon
              data-favteam={
                favTeams.includes(stats.teamId)
                  ? true
                  : false
              }
              className="size-2.5 @xs:size-3 data-[favteam=false]:hidden"
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col w-full h-fit justify-self-start gap-1">
          <DataCard
            label="Säsonger i högsta serien"
            count={stats.firstDivisionSeasons}
            boldedLabel={true}
          />

          {stats.firstDivisionSeasons &&
          stats.firstDivisionSeasons > 1 ? (
            <DataCard
              label="Första"
              count={stats.firstAndLatestSeason?.first}
              boldedLabel={false}
            />
          ) : null}
          {stats.firstDivisionSeasons &&
          stats.firstDivisionSeasons > 1 ? (
            <DataCard
              label="Senaste"
              count={stats.firstAndLatestSeason?.latest}
              boldedLabel={false}
            />
          ) : null}
          {stats.firstDivisionSeasons &&
          stats.firstDivisionSeasons === 1 ? (
            <DataCard
              label="Säsong"
              count={stats.firstAndLatestSeason?.first}
              boldedLabel={false}
            />
          ) : null}

          <DataCard
            label="Antal slutspel"
            count={stats.playoffCount.count}
            boldedLabel={true}
          />
          {stats.playoffCount.count &&
          stats.playoffCount.count > 0 ? (
            <DataCard
              label="Senaste"
              count={stats.playoffCount.latest}
              boldedLabel={false}
            />
          ) : null}
          <DataCard
            label="Antal finaler"
            count={stats.finalCount.count}
            boldedLabel={true}
          />
          {stats.finalCount.count &&
          stats.finalCount.count > 0 ? (
            <DataCard
              label="Senaste"
              count={stats.finalCount.latest}
              boldedLabel={false}
            />
          ) : null}
          <DataCard
            label="Antal finalvinster"
            count={stats.finalWinCount.count}
            boldedLabel={true}
          />
          {stats.finalWinCount.count &&
          stats.finalWinCount.count > 0 ? (
            <DataCard
              label="Senaste"
              count={stats.finalWinCount.latest}
              boldedLabel={false}
            />
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}

export default Stats
