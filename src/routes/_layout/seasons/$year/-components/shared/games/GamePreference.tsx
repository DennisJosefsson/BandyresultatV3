import RadioBadges from '@/components/Common/RadioBadge'
import { useCookies } from '@/lib/contexts/cookieContext'

const sortPreferenceOrder = [
  { value: 'played', label: 'Spelade först' },
  { value: 'unplayed', label: 'Kommande först' },
]

const playedOrder = [
  { value: 'asc', label: 'Nyast först' },
  { value: 'desc', label: 'Äldst först' },
]

const GamePreference = () => {
  const {
    sortGames: sortPreference,
    setSortGames,
    setSortPlayedGames,
    setSortUnplayedGames,
    sortPlayedGames,
    sortUnplayedGames,
  } = useCookies()

  const handleSortPreference = (
    value: 'played' | 'unplayed',
  ) => {
    setSortGames(
      value,
      '/_layout/seasons/$year/$group/games',
    )
  }

  const handleSortPlayedGames = (value: 'asc' | 'desc') => {
    setSortPlayedGames(
      value,
      '/_layout/seasons/$year/$group/games',
    )
  }

  const handleSortUnplayedGames = (
    value: 'asc' | 'desc',
  ) => {
    setSortUnplayedGames(
      value,
      '/_layout/seasons/$year/$group/games',
    )
  }

  return (
    <div className="flex flex-col gap-4 mt-1 px-4">
      <div className="grid grid-cols-1 gap-y-2">
        <div className="max-w-sm flex flex-col gap-y-1">
          <div>
            <span className="text-[10] xs:text-xs md:text-sm">
              Sortera spelade/ospelade
            </span>
          </div>
          <RadioBadges
            array={sortPreferenceOrder}
            orientation="horizontal"
            name="sort"
            onValueChange={handleSortPreference}
            defaultValue="unplayed"
            value={sortPreference ?? 'unplayed'}
            className="flex flex-col gap-1"
          />
        </div>
        <div className="max-w-sm flex flex-col gap-y-1">
          <div>
            <span className="text-[10] xs:text-xs md:text-sm">
              Sortera spelade matcher
            </span>
          </div>
          <RadioBadges
            array={playedOrder}
            orientation="horizontal"
            name="playedGames"
            onValueChange={handleSortPlayedGames}
            defaultValue="desc"
            value={sortPlayedGames ?? 'desc'}
            className="flex flex-col gap-1"
          />
        </div>
        <div className="max-w-sm flex flex-col gap-y-1">
          <div>
            <span className="text-[10] xs:text-xs md:text-sm">
              Sortera kommande matcher
            </span>
          </div>
          <RadioBadges
            array={playedOrder}
            orientation="horizontal"
            name="unplayedGames"
            onValueChange={handleSortUnplayedGames}
            defaultValue="desc"
            value={sortUnplayedGames ?? 'desc'}
            className="flex flex-col gap-1"
          />
        </div>
      </div>
    </div>
  )
}

export default GamePreference
