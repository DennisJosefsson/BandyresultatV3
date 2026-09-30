import { db } from '@/db'
import { games, series, teamgames } from '@/db/schema'
import { homeTeamRecordData } from '@/db/views/teamRecordsViews'
import { coalesce } from '@/lib/drizzleHelpers/coalesce'
import {
  jsonAggBuildObject,
  jsonBuildObject,
} from '@/lib/drizzleHelpers/jsonAggjsonBuildObject'
import type {
  TeamBaseWithLogo,
  TeamStatsGameArrayObject,
} from '@/lib/types/team'
import {
  away,
  awayLogo,
  awayTeamName,
  awayTeamSeason,
  awayTeamSeasonLogo,
  awayTeamSeasonName,
  home,
  homeLogo,
  homeTeamName,
  homeTeamSeason,
  homeTeamSeasonLogo,
  homeTeamSeasonName,
} from '@/routes/_layout/seasons/$year/-functions/libs/aliases'
import type { SQL } from 'drizzle-orm'
import { and, desc, eq, sql } from 'drizzle-orm'

const homeData = db.$with('home_data').as(
  db
    .select({
      teamId: homeTeamRecordData.teamId,
      maxScored: homeTeamRecordData.maxScored,
      maxConceded: homeTeamRecordData.maxConceded,
      maxGoalDifference:
        homeTeamRecordData.maxGoalDifference,
      minGoalDifference:
        homeTeamRecordData.minGoalDifference,
      maxTotalGoals: homeTeamRecordData.maxTotalGoals,
      minTotalGoals: homeTeamRecordData.minTotalGoals,
    })
    .from(homeTeamRecordData)
    .where(
      eq(
        homeTeamRecordData.teamId,
        sql.placeholder('teamId'),
      ),
    ),
)

export const maxScoredHomeArrayTEST = db
  .$with('max_scored_home_array')
  .as(
    db
      .with(homeData)
      .select({
        teamId: teamgames.teamId,
        gamesArray: jsonAggBuildObject<
          Array<TeamStatsGameArrayObject>
        >(
          {
            gameId: games.gameId,
            result: games.result,
            otResult: games.otResult,
            date: games.date,
            serieName: series.serieName,
            home: jsonBuildObject<TeamBaseWithLogo>({
              teamId: home.teamId,
              name: coalesce(
                homeTeamName.name,
                homeTeamSeasonName.name,
              ),
              casualName: coalesce(
                homeTeamName.casualName,
                homeTeamSeasonName.casualName,
              ),
              shortName: coalesce(
                homeTeamName.shortName,
                homeTeamSeasonName.shortName,
              ),
              logo: jsonBuildObject({
                logoId: coalesce(
                  homeTeamSeasonLogo.logoId,
                  homeLogo.logoId,
                ),
                hasDark: coalesce(
                  homeTeamSeasonLogo.hasDark,
                  homeLogo.hasDark,
                ),
              }),
            }) as unknown as SQL<TeamBaseWithLogo>,
            away: jsonBuildObject<TeamBaseWithLogo>({
              teamId: away.teamId,
              name: coalesce(
                awayTeamName.name,
                awayTeamSeasonName.name,
              ),
              casualName: coalesce(
                awayTeamName.casualName,
                awayTeamSeasonName.casualName,
              ),
              shortName: coalesce(
                awayTeamName.shortName,
                awayTeamSeasonName.shortName,
              ),
              logo: jsonBuildObject({
                logoId: coalesce(
                  awayTeamSeasonLogo.logoId,
                  awayLogo.logoId,
                ),
                hasDark: coalesce(
                  awayTeamSeasonLogo.hasDark,
                  awayLogo.hasDark,
                ),
              }),
            }) as unknown as SQL<TeamBaseWithLogo>,
          },
          { orderBy: [desc(games.date)] },
        ).as('max_scored_home_gamearray'),
      })
      .from(teamgames)
      .innerJoin(
        homeData,
        eq(homeData.teamId, teamgames.teamId),
      )
      .innerJoin(games, eq(games.gameId, teamgames.gameId))
      .innerJoin(home, eq(games.homeTeamId, home.teamId))
      .innerJoin(away, eq(games.awayTeamId, away.teamId))
      .innerJoin(series, eq(series.serieId, games.serieId))
      .innerJoin(
        homeTeamSeason,
        and(
          eq(homeTeamSeason.seasonId, games.seasonId),
          eq(homeTeamSeason.teamId, games.homeTeamId),
        ),
      )
      .innerJoin(
        awayTeamSeason,
        and(
          eq(awayTeamSeason.seasonId, games.seasonId),
          eq(awayTeamSeason.teamId, games.awayTeamId),
        ),
      )
      .innerJoin(
        homeTeamName,
        eq(home.teamnameId, homeTeamName.teamnameId),
      )
      .innerJoin(
        awayTeamName,
        eq(away.teamnameId, awayTeamName.teamnameId),
      )
      .leftJoin(
        homeTeamSeasonName,
        eq(home.teamnameId, homeTeamSeasonName.teamnameId),
      )
      .leftJoin(
        awayTeamSeasonName,
        eq(away.teamnameId, awayTeamSeasonName.teamnameId),
      )
      .leftJoin(
        homeLogo,
        eq(homeTeamName.logoId, homeLogo.logoId),
      )
      .leftJoin(
        awayLogo,
        eq(awayTeamName.logoId, awayLogo.logoId),
      )
      .leftJoin(
        homeTeamSeasonLogo,
        eq(homeTeamName.logoId, homeTeamSeasonLogo.logoId),
      )
      .leftJoin(
        awayTeamSeasonLogo,
        eq(awayTeamName.logoId, awayTeamSeasonLogo.logoId),
      )
      .where(
        and(
          eq(teamgames.teamId, sql.placeholder('teamId')),
          eq(teamgames.homeGame, true),
          eq(teamgames.goalsScored, homeData.maxScored),
          eq(teamgames.played, true),
        ),
      )
      .groupBy(teamgames.teamId),
  )

export const maxConcededHomeArrayTEST = db
  .$with('max_conceded_home_array')
  .as(
    db
      .with(homeData)
      .select({
        teamId: teamgames.teamId,
        gamesArray: jsonAggBuildObject<
          Array<TeamStatsGameArrayObject>
        >(
          {
            gameId: games.gameId,
            result: games.result,
            otResult: games.otResult,
            date: games.date,
            serieName: series.serieName,
            home: jsonBuildObject<TeamBaseWithLogo>({
              teamId: home.teamId,
              name: coalesce(
                homeTeamName.name,
                homeTeamSeasonName.name,
              ),
              casualName: coalesce(
                homeTeamName.casualName,
                homeTeamSeasonName.casualName,
              ),
              shortName: coalesce(
                homeTeamName.shortName,
                homeTeamSeasonName.shortName,
              ),
              logo: jsonBuildObject({
                logoId: coalesce(
                  homeTeamSeasonLogo.logoId,
                  homeLogo.logoId,
                ),
                hasDark: coalesce(
                  homeTeamSeasonLogo.hasDark,
                  homeLogo.hasDark,
                ),
              }),
            }) as unknown as SQL<TeamBaseWithLogo>,
            away: jsonBuildObject<TeamBaseWithLogo>({
              teamId: away.teamId,
              name: coalesce(
                awayTeamName.name,
                awayTeamSeasonName.name,
              ),
              casualName: coalesce(
                awayTeamName.casualName,
                awayTeamSeasonName.casualName,
              ),
              shortName: coalesce(
                awayTeamName.shortName,
                awayTeamSeasonName.shortName,
              ),
              logo: jsonBuildObject({
                logoId: coalesce(
                  awayTeamSeasonLogo.logoId,
                  awayLogo.logoId,
                ),
                hasDark: coalesce(
                  awayTeamSeasonLogo.hasDark,
                  awayLogo.hasDark,
                ),
              }),
            }) as unknown as SQL<TeamBaseWithLogo>,
          },
          { orderBy: [desc(games.date)] },
        ).as('max_conceded_home_gamearray'),
      })
      .from(teamgames)
      .innerJoin(
        homeData,
        eq(homeData.teamId, teamgames.teamId),
      )
      .innerJoin(games, eq(games.gameId, teamgames.gameId))
      .innerJoin(home, eq(games.homeTeamId, home.teamId))
      .innerJoin(away, eq(games.awayTeamId, away.teamId))
      .innerJoin(series, eq(series.serieId, games.serieId))
      .innerJoin(
        homeTeamSeason,
        and(
          eq(homeTeamSeason.seasonId, games.seasonId),
          eq(homeTeamSeason.teamId, games.homeTeamId),
        ),
      )
      .innerJoin(
        awayTeamSeason,
        and(
          eq(awayTeamSeason.seasonId, games.seasonId),
          eq(awayTeamSeason.teamId, games.awayTeamId),
        ),
      )
      .innerJoin(
        homeTeamName,
        eq(home.teamnameId, homeTeamName.teamnameId),
      )
      .innerJoin(
        awayTeamName,
        eq(away.teamnameId, awayTeamName.teamnameId),
      )
      .leftJoin(
        homeTeamSeasonName,
        eq(home.teamnameId, homeTeamSeasonName.teamnameId),
      )
      .leftJoin(
        awayTeamSeasonName,
        eq(away.teamnameId, awayTeamSeasonName.teamnameId),
      )
      .leftJoin(
        homeLogo,
        eq(homeTeamName.logoId, homeLogo.logoId),
      )
      .leftJoin(
        awayLogo,
        eq(awayTeamName.logoId, awayLogo.logoId),
      )
      .leftJoin(
        homeTeamSeasonLogo,
        eq(homeTeamName.logoId, homeTeamSeasonLogo.logoId),
      )
      .leftJoin(
        awayTeamSeasonLogo,
        eq(awayTeamName.logoId, awayTeamSeasonLogo.logoId),
      )
      .where(
        and(
          eq(teamgames.teamId, sql.placeholder('teamId')),
          eq(teamgames.homeGame, true),
          eq(teamgames.goalsConceded, homeData.maxConceded),
          eq(teamgames.played, true),
        ),
      )
      .groupBy(teamgames.teamId),
  )

export const maxTotalHomeArrayTEST = db
  .$with('max_total_home_array')
  .as(
    db
      .with(homeData)
      .select({
        teamId: teamgames.teamId,
        gamesArray: jsonAggBuildObject<
          Array<TeamStatsGameArrayObject>
        >(
          {
            gameId: games.gameId,
            result: games.result,
            otResult: games.otResult,
            date: games.date,
            serieName: series.serieName,
            home: jsonBuildObject<TeamBaseWithLogo>({
              teamId: home.teamId,
              name: coalesce(
                homeTeamName.name,
                homeTeamSeasonName.name,
              ),
              casualName: coalesce(
                homeTeamName.casualName,
                homeTeamSeasonName.casualName,
              ),
              shortName: coalesce(
                homeTeamName.shortName,
                homeTeamSeasonName.shortName,
              ),
              logo: jsonBuildObject({
                logoId: coalesce(
                  homeTeamSeasonLogo.logoId,
                  homeLogo.logoId,
                ),
                hasDark: coalesce(
                  homeTeamSeasonLogo.hasDark,
                  homeLogo.hasDark,
                ),
              }),
            }) as unknown as SQL<TeamBaseWithLogo>,
            away: jsonBuildObject<TeamBaseWithLogo>({
              teamId: away.teamId,
              name: coalesce(
                awayTeamName.name,
                awayTeamSeasonName.name,
              ),
              casualName: coalesce(
                awayTeamName.casualName,
                awayTeamSeasonName.casualName,
              ),
              shortName: coalesce(
                awayTeamName.shortName,
                awayTeamSeasonName.shortName,
              ),
              logo: jsonBuildObject({
                logoId: coalesce(
                  awayTeamSeasonLogo.logoId,
                  awayLogo.logoId,
                ),
                hasDark: coalesce(
                  awayTeamSeasonLogo.hasDark,
                  awayLogo.hasDark,
                ),
              }),
            }) as unknown as SQL<TeamBaseWithLogo>,
          },
          { orderBy: [desc(games.date)] },
        ).as('max_total_home_gamearray'),
      })
      .from(teamgames)
      .innerJoin(
        homeData,
        eq(homeData.teamId, teamgames.teamId),
      )
      .innerJoin(games, eq(games.gameId, teamgames.gameId))
      .innerJoin(home, eq(games.homeTeamId, home.teamId))
      .innerJoin(away, eq(games.awayTeamId, away.teamId))
      .innerJoin(series, eq(series.serieId, games.serieId))
      .innerJoin(
        homeTeamSeason,
        and(
          eq(homeTeamSeason.seasonId, games.seasonId),
          eq(homeTeamSeason.teamId, games.homeTeamId),
        ),
      )
      .innerJoin(
        awayTeamSeason,
        and(
          eq(awayTeamSeason.seasonId, games.seasonId),
          eq(awayTeamSeason.teamId, games.awayTeamId),
        ),
      )
      .innerJoin(
        homeTeamName,
        eq(home.teamnameId, homeTeamName.teamnameId),
      )
      .innerJoin(
        awayTeamName,
        eq(away.teamnameId, awayTeamName.teamnameId),
      )
      .leftJoin(
        homeTeamSeasonName,
        eq(home.teamnameId, homeTeamSeasonName.teamnameId),
      )
      .leftJoin(
        awayTeamSeasonName,
        eq(away.teamnameId, awayTeamSeasonName.teamnameId),
      )
      .leftJoin(
        homeLogo,
        eq(homeTeamName.logoId, homeLogo.logoId),
      )
      .leftJoin(
        awayLogo,
        eq(awayTeamName.logoId, awayLogo.logoId),
      )
      .leftJoin(
        homeTeamSeasonLogo,
        eq(homeTeamName.logoId, homeTeamSeasonLogo.logoId),
      )
      .leftJoin(
        awayTeamSeasonLogo,
        eq(awayTeamName.logoId, awayTeamSeasonLogo.logoId),
      )
      .where(
        and(
          eq(teamgames.teamId, sql.placeholder('teamId')),
          eq(teamgames.homeGame, true),
          eq(teamgames.totalGoals, homeData.maxTotalGoals),
          eq(teamgames.played, true),
        ),
      )
      .groupBy(teamgames.teamId),
  )

export const minTotalHomeArrayTEST = db
  .$with('min_total_home_array')
  .as(
    db
      .with(homeData)
      .select({
        teamId: teamgames.teamId,
        gamesArray: jsonAggBuildObject<
          Array<TeamStatsGameArrayObject>
        >(
          {
            gameId: games.gameId,
            result: games.result,
            otResult: games.otResult,
            date: games.date,
            serieName: series.serieName,
            home: jsonBuildObject<TeamBaseWithLogo>({
              teamId: home.teamId,
              name: coalesce(
                homeTeamName.name,
                homeTeamSeasonName.name,
              ),
              casualName: coalesce(
                homeTeamName.casualName,
                homeTeamSeasonName.casualName,
              ),
              shortName: coalesce(
                homeTeamName.shortName,
                homeTeamSeasonName.shortName,
              ),
              logo: jsonBuildObject({
                logoId: coalesce(
                  homeTeamSeasonLogo.logoId,
                  homeLogo.logoId,
                ),
                hasDark: coalesce(
                  homeTeamSeasonLogo.hasDark,
                  homeLogo.hasDark,
                ),
              }),
            }) as unknown as SQL<TeamBaseWithLogo>,
            away: jsonBuildObject<TeamBaseWithLogo>({
              teamId: away.teamId,
              name: coalesce(
                awayTeamName.name,
                awayTeamSeasonName.name,
              ),
              casualName: coalesce(
                awayTeamName.casualName,
                awayTeamSeasonName.casualName,
              ),
              shortName: coalesce(
                awayTeamName.shortName,
                awayTeamSeasonName.shortName,
              ),
              logo: jsonBuildObject({
                logoId: coalesce(
                  awayTeamSeasonLogo.logoId,
                  awayLogo.logoId,
                ),
                hasDark: coalesce(
                  awayTeamSeasonLogo.hasDark,
                  awayLogo.hasDark,
                ),
              }),
            }) as unknown as SQL<TeamBaseWithLogo>,
          },
          { orderBy: [desc(games.date)] },
        ).as('min_total_home_gamearray'),
      })
      .from(teamgames)
      .innerJoin(
        homeData,
        eq(homeData.teamId, teamgames.teamId),
      )
      .innerJoin(games, eq(games.gameId, teamgames.gameId))
      .innerJoin(home, eq(games.homeTeamId, home.teamId))
      .innerJoin(away, eq(games.awayTeamId, away.teamId))
      .innerJoin(series, eq(series.serieId, games.serieId))
      .innerJoin(
        homeTeamSeason,
        and(
          eq(homeTeamSeason.seasonId, games.seasonId),
          eq(homeTeamSeason.teamId, games.homeTeamId),
        ),
      )
      .innerJoin(
        awayTeamSeason,
        and(
          eq(awayTeamSeason.seasonId, games.seasonId),
          eq(awayTeamSeason.teamId, games.awayTeamId),
        ),
      )
      .innerJoin(
        homeTeamName,
        eq(home.teamnameId, homeTeamName.teamnameId),
      )
      .innerJoin(
        awayTeamName,
        eq(away.teamnameId, awayTeamName.teamnameId),
      )
      .leftJoin(
        homeTeamSeasonName,
        eq(home.teamnameId, homeTeamSeasonName.teamnameId),
      )
      .leftJoin(
        awayTeamSeasonName,
        eq(away.teamnameId, awayTeamSeasonName.teamnameId),
      )
      .leftJoin(
        homeLogo,
        eq(homeTeamName.logoId, homeLogo.logoId),
      )
      .leftJoin(
        awayLogo,
        eq(awayTeamName.logoId, awayLogo.logoId),
      )
      .leftJoin(
        homeTeamSeasonLogo,
        eq(homeTeamName.logoId, homeTeamSeasonLogo.logoId),
      )
      .leftJoin(
        awayTeamSeasonLogo,
        eq(awayTeamName.logoId, awayTeamSeasonLogo.logoId),
      )
      .where(
        and(
          eq(teamgames.teamId, sql.placeholder('teamId')),
          eq(teamgames.homeGame, true),
          eq(teamgames.totalGoals, homeData.minTotalGoals),
          eq(teamgames.played, true),
        ),
      )
      .groupBy(teamgames.teamId),
  )

export const minGoalDifferenceHomeArrayTEST = db
  .$with('min_goalDifference_home_array')
  .as(
    db
      .with(homeData)
      .select({
        teamId: teamgames.teamId,
        gamesArray: jsonAggBuildObject<
          Array<TeamStatsGameArrayObject>
        >(
          {
            gameId: games.gameId,
            result: games.result,
            otResult: games.otResult,
            date: games.date,
            serieName: series.serieName,
            home: jsonBuildObject<TeamBaseWithLogo>({
              teamId: home.teamId,
              name: coalesce(
                homeTeamName.name,
                homeTeamSeasonName.name,
              ),
              casualName: coalesce(
                homeTeamName.casualName,
                homeTeamSeasonName.casualName,
              ),
              shortName: coalesce(
                homeTeamName.shortName,
                homeTeamSeasonName.shortName,
              ),
              logo: jsonBuildObject({
                logoId: coalesce(
                  homeTeamSeasonLogo.logoId,
                  homeLogo.logoId,
                ),
                hasDark: coalesce(
                  homeTeamSeasonLogo.hasDark,
                  homeLogo.hasDark,
                ),
              }),
            }) as unknown as SQL<TeamBaseWithLogo>,
            away: jsonBuildObject<TeamBaseWithLogo>({
              teamId: away.teamId,
              name: coalesce(
                awayTeamName.name,
                awayTeamSeasonName.name,
              ),
              casualName: coalesce(
                awayTeamName.casualName,
                awayTeamSeasonName.casualName,
              ),
              shortName: coalesce(
                awayTeamName.shortName,
                awayTeamSeasonName.shortName,
              ),
              logo: jsonBuildObject({
                logoId: coalesce(
                  awayTeamSeasonLogo.logoId,
                  awayLogo.logoId,
                ),
                hasDark: coalesce(
                  awayTeamSeasonLogo.hasDark,
                  awayLogo.hasDark,
                ),
              }),
            }) as unknown as SQL<TeamBaseWithLogo>,
          },
          { orderBy: [desc(games.date)] },
        ).as('min_goalDifference_home_gamearray'),
      })
      .from(teamgames)
      .innerJoin(
        homeData,
        eq(homeData.teamId, teamgames.teamId),
      )
      .innerJoin(games, eq(games.gameId, teamgames.gameId))
      .innerJoin(home, eq(games.homeTeamId, home.teamId))
      .innerJoin(away, eq(games.awayTeamId, away.teamId))
      .innerJoin(series, eq(series.serieId, games.serieId))
      .innerJoin(
        homeTeamSeason,
        and(
          eq(homeTeamSeason.seasonId, games.seasonId),
          eq(homeTeamSeason.teamId, games.homeTeamId),
        ),
      )
      .innerJoin(
        awayTeamSeason,
        and(
          eq(awayTeamSeason.seasonId, games.seasonId),
          eq(awayTeamSeason.teamId, games.awayTeamId),
        ),
      )
      .innerJoin(
        homeTeamName,
        eq(home.teamnameId, homeTeamName.teamnameId),
      )
      .innerJoin(
        awayTeamName,
        eq(away.teamnameId, awayTeamName.teamnameId),
      )
      .leftJoin(
        homeTeamSeasonName,
        eq(home.teamnameId, homeTeamSeasonName.teamnameId),
      )
      .leftJoin(
        awayTeamSeasonName,
        eq(away.teamnameId, awayTeamSeasonName.teamnameId),
      )
      .leftJoin(
        homeLogo,
        eq(homeTeamName.logoId, homeLogo.logoId),
      )
      .leftJoin(
        awayLogo,
        eq(awayTeamName.logoId, awayLogo.logoId),
      )
      .leftJoin(
        homeTeamSeasonLogo,
        eq(homeTeamName.logoId, homeTeamSeasonLogo.logoId),
      )
      .leftJoin(
        awayTeamSeasonLogo,
        eq(awayTeamName.logoId, awayTeamSeasonLogo.logoId),
      )
      .where(
        and(
          eq(teamgames.teamId, sql.placeholder('teamId')),
          eq(teamgames.homeGame, true),
          eq(
            teamgames.goalDifference,
            homeData.minGoalDifference,
          ),
          eq(teamgames.played, true),
        ),
      )
      .groupBy(teamgames.teamId),
  )

export const maxGoalDifferenceHomeArrayTEST = db
  .$with('max_goalDifference_home_array')
  .as(
    db
      .with(homeData)
      .select({
        teamId: teamgames.teamId,
        gamesArray: jsonAggBuildObject<
          Array<TeamStatsGameArrayObject>
        >(
          {
            gameId: games.gameId,
            result: games.result,
            otResult: games.otResult,
            date: games.date,
            serieName: series.serieName,
            home: jsonBuildObject<TeamBaseWithLogo>({
              teamId: home.teamId,
              name: coalesce(
                homeTeamName.name,
                homeTeamSeasonName.name,
              ),
              casualName: coalesce(
                homeTeamName.casualName,
                homeTeamSeasonName.casualName,
              ),
              shortName: coalesce(
                homeTeamName.shortName,
                homeTeamSeasonName.shortName,
              ),
              logo: jsonBuildObject({
                logoId: coalesce(
                  homeTeamSeasonLogo.logoId,
                  homeLogo.logoId,
                ),
                hasDark: coalesce(
                  homeTeamSeasonLogo.hasDark,
                  homeLogo.hasDark,
                ),
              }),
            }) as unknown as SQL<TeamBaseWithLogo>,
            away: jsonBuildObject<TeamBaseWithLogo>({
              teamId: away.teamId,
              name: coalesce(
                awayTeamName.name,
                awayTeamSeasonName.name,
              ),
              casualName: coalesce(
                awayTeamName.casualName,
                awayTeamSeasonName.casualName,
              ),
              shortName: coalesce(
                awayTeamName.shortName,
                awayTeamSeasonName.shortName,
              ),
              logo: jsonBuildObject({
                logoId: coalesce(
                  awayTeamSeasonLogo.logoId,
                  awayLogo.logoId,
                ),
                hasDark: coalesce(
                  awayTeamSeasonLogo.hasDark,
                  awayLogo.hasDark,
                ),
              }),
            }) as unknown as SQL<TeamBaseWithLogo>,
          },
          { orderBy: [desc(games.date)] },
        ).as('max_goalDifference_home_gamearray'),
      })
      .from(teamgames)
      .innerJoin(
        homeData,
        eq(homeData.teamId, teamgames.teamId),
      )
      .innerJoin(games, eq(games.gameId, teamgames.gameId))
      .innerJoin(home, eq(games.homeTeamId, home.teamId))
      .innerJoin(away, eq(games.awayTeamId, away.teamId))
      .innerJoin(series, eq(series.serieId, games.serieId))
      .innerJoin(
        homeTeamSeason,
        and(
          eq(homeTeamSeason.seasonId, games.seasonId),
          eq(homeTeamSeason.teamId, games.homeTeamId),
        ),
      )
      .innerJoin(
        awayTeamSeason,
        and(
          eq(awayTeamSeason.seasonId, games.seasonId),
          eq(awayTeamSeason.teamId, games.awayTeamId),
        ),
      )
      .innerJoin(
        homeTeamName,
        eq(home.teamnameId, homeTeamName.teamnameId),
      )
      .innerJoin(
        awayTeamName,
        eq(away.teamnameId, awayTeamName.teamnameId),
      )
      .leftJoin(
        homeTeamSeasonName,
        eq(home.teamnameId, homeTeamSeasonName.teamnameId),
      )
      .leftJoin(
        awayTeamSeasonName,
        eq(away.teamnameId, awayTeamSeasonName.teamnameId),
      )
      .leftJoin(
        homeLogo,
        eq(homeTeamName.logoId, homeLogo.logoId),
      )
      .leftJoin(
        awayLogo,
        eq(awayTeamName.logoId, awayLogo.logoId),
      )
      .leftJoin(
        homeTeamSeasonLogo,
        eq(homeTeamName.logoId, homeTeamSeasonLogo.logoId),
      )
      .leftJoin(
        awayTeamSeasonLogo,
        eq(awayTeamName.logoId, awayTeamSeasonLogo.logoId),
      )
      .where(
        and(
          eq(teamgames.teamId, sql.placeholder('teamId')),
          eq(teamgames.homeGame, true),
          eq(
            teamgames.goalDifference,
            homeData.maxGoalDifference,
          ),
          eq(teamgames.played, true),
        ),
      )
      .groupBy(teamgames.teamId),
  )
