import CompareSkeleton from './Skeletons/CompareSkeleton'
import GeneralStatsSkeleton from './Skeletons/GeneralStatsSkeleton'
import IntervalSkeleton from './Skeletons/IntervalSkeleton'
import MaratonSkeleton from './Skeletons/MaratonSkeleton'
import PointsGoalsSkeleton from './Skeletons/PointsGoalsSkeleton'
import SearchSelectionSkeleton from './Skeletons/SearchSelectionSkeleton'
import SearchSkeleton from './Skeletons/SearchSkeleton'
import SeasonDevelopmentSkeleton from './Skeletons/SeasonDevelopmentSkeleton'
import SeasonGameListSkeleton from './Skeletons/SeasonGameListSkeleton'
import SeasonListSkeleton from './Skeletons/SeasonListSkeleton'
import SeasonMapSkeleton from './Skeletons/SeasonMapSkeleton'
import SeasonPlayoffSkeleton from './Skeletons/SeasonPlayoffSkeleton'
import SeasonStatsSkeleton from './Skeletons/SeasonStatsSkeleton'
import SeasonTableSkeleton from './Skeletons/SeasonTableSkeleton'
import SingleSeasonSkeleton from './Skeletons/SingleSeasonSkeleton'
import SingleTeamSkeleton from './Skeletons/SingleTeamSkeleton'
import SingleTeamTablesSkeleton from './Skeletons/SingleTeamTablesSkeleton'
import StreaksSkeleton from './Skeletons/StreaksSkeleton'
import SubSeasonTableSkeleton from './Skeletons/SubSeasonTableSkeleton'
import TeamListSkeleton from './Skeletons/TeamListSkeleton'
import Spinner from './Spinner'

type SkeletonType =
  | 'singleSeason'
  | 'seasonList'
  | 'seasonMap'
  | 'seasonGamesList'
  | 'seasonTable'
  | 'subseasonTable'
  | 'seasonPlayoff'
  | 'seasonDevelopment'
  | 'seasonStats'
  | 'searchSelection'
  | 'teamsList'
  | 'compare'
  | 'singleTeam'
  | 'maraton'
  | 'generalStats'
  | 'pointsgoals'
  | 'streaks'
  | 'search'
  | 'singleTeamTable'
  | 'interval'

type LoadingProps = {
  page?: SkeletonType
}

const Loading = ({ page }: LoadingProps) => {
  let content
  switch (page) {
    case 'singleSeason':
      content = <SingleSeasonSkeleton />
      break
    case 'seasonList':
      content = <SeasonListSkeleton />
      break
    case 'seasonGamesList':
      content = <SeasonGameListSkeleton />
      break
    case 'seasonTable':
      content = <SeasonTableSkeleton />
      break
    case 'subseasonTable':
      content = <SubSeasonTableSkeleton />
      break
    case 'seasonPlayoff':
      content = <SeasonPlayoffSkeleton />
      break
    case 'seasonDevelopment':
      content = <SeasonDevelopmentSkeleton />
      break
    case 'seasonStats':
      content = <SeasonStatsSkeleton />
      break
    case 'seasonMap':
      content = <SeasonMapSkeleton />
      break
    case 'singleTeam':
      content = <SingleTeamSkeleton />
      break
    case 'teamsList':
      content = <TeamListSkeleton />
      break
    case 'searchSelection':
      content = <SearchSelectionSkeleton />
      break
    case 'compare':
      content = <CompareSkeleton />
      break
    case 'maraton':
      content = <MaratonSkeleton />
      break
    case 'generalStats':
      content = <GeneralStatsSkeleton />
      break
    case 'pointsgoals':
      content = <PointsGoalsSkeleton />
      break
    case 'streaks':
      content = <StreaksSkeleton />
      break
    case 'search':
      content = <SearchSkeleton />
      break
    case 'singleTeamTable':
      content = <SingleTeamTablesSkeleton />
      break
    case 'interval':
      content = <IntervalSkeleton />
      break
    default:
      content = <Spinner />
  }
  return <div>{content}</div>
}

export default Loading
