import RadioBadges from '@/components/Common/RadioBadge'
import { useCookies } from '@/lib/contexts/cookieContext'

const sortPreferenceOrder = [
  { value: 'played', label: 'Spelade först' },
  { value: 'unplayed', label: 'Kommande först' },
]

const PlayoffGamesPreference = () => {
  const {
    sortPlayoffGames: sortPreference,
    setSortPlayoffGames,
  } = useCookies()

  const handleSortPreference = (
    value: 'played' | 'unplayed',
  ) => {
    setSortPlayoffGames(
      value,
      '/_layout/seasons/$year/playoff/games',
    )
  }

  return (
    <div className="grid grid-cols-1 gap-y-2">
      <div className="max-w-sm flex flex-col gap-y-1">
        <div className="mb-1">
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
          className="flex flex-col gap-1 max-w-70 xxs:max-w-none"
        />
      </div>
    </div>
  )
}

export default PlayoffGamesPreference
