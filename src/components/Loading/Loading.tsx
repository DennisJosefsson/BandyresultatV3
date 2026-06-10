import Spinner from './Spinner'
import TeamListSkeleton from './Skeletons/TeamListSkeleton'
import SubSeasonTableSkeleton from './Skeletons/SubSeasonTableSkeleton'
import StreaksSkeleton from './Skeletons/StreaksSkeleton'
import SingleTeamTablesSkeleton from './Skeletons/SingleTeamTablesSkeleton'
import SingleTeamSkeleton from './Skeletons/SingleTeamSkeleton'
import SingleSeasonSkeleton from './Skeletons/SingleSeasonSkeleton'
import SeasonTableSkeleton from './Skeletons/SeasonTableSkeleton'
import SeasonStatsSkeleton from './Skeletons/SeasonStatsSkeleton'
import SeasonPlayoffSkeleton from './Skeletons/SeasonPlayoffSkeleton'
import SeasonMapSkeleton from './Skeletons/SeasonMapSkeleton'
import SeasonListSkeleton from './Skeletons/SeasonListSkeleton'
import SeasonGameListSkeleton from './Skeletons/SeasonGameListSkeleton'
import SeasonDevelopmentSkeleton from './Skeletons/SeasonDevelopmentSkeleton'
import SearchSkeleton from './Skeletons/SearchSkeleton'
import SearchSelectionSkeleton from './Skeletons/SearchSelectionSkeleton'
import PointsGoalsSkeleton from './Skeletons/PointsGoalsSkeleton'
import MaratonSkeleton from './Skeletons/MaratonSkeleton'
import IntervalSkeleton from './Skeletons/IntervalSkeleton'
import GeneralStatsSkeleton from './Skeletons/GeneralStatsSkeleton'
import CompareSkeleton from './Skeletons/CompareSkeleton'

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
  | 'default'

type LoadingProps = {
  page: SkeletonType
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
    case 'default':
      content = <Spinner />
      break
    default:
      content = <Spinner />
  }
  return <div>{content}</div>
}

export default Loading
