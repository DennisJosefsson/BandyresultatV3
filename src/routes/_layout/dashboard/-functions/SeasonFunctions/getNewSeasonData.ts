import { db } from '@/db'
import {
  competitions,
  metadata,
  playoffseason,
  seasons,
  series,
  teamseasons,
} from '@/db/schema'
import { desc, inArray } from 'drizzle-orm'

export async function getNewSeasonData() {
  const seasonInfo = await db
    .select()
    .from(seasons)
    .orderBy(desc(seasons.seasonId))
    .limit(2)
    .then((res) => {
      const currYear = new Date().getFullYear()
      const currMonth = new Date().getMonth()
      const secondYear = parseInt(res[0].year.split('/')[1])
      if (
        secondYear > currYear ||
        (secondYear === currYear && currMonth < 4)
      ) {
        throw new Error(
          'Du får vänta med att generera ny säsong!',
        )
      }
      const nextYear = `${secondYear}/${secondYear + 1}`
      const currMenSeason = res.find(
        (s) => s.women === false,
      )
      const currWomenSeason = res.find(
        (s) => s.women === true,
      )
      if (!currMenSeason || !currWomenSeason)
        throw new Error('Nuvarande säsonger saknas.')
      return {
        nextYear,
        currMenSeason,
        currWomenSeason,
        secondYear,
        intYear: secondYear + 1,
      }
    })

  const newSeasons = await db
    .insert(seasons)
    .values([
      {
        year: seasonInfo.nextYear,
        women: false,
        intYear: seasonInfo.intYear,
      },
      {
        year: seasonInfo.nextYear,
        women: true,
        intYear: seasonInfo.intYear,
      },
    ])
    .returning()

  const menSeasonId = newSeasons.find(
    (s) => s.women === false,
  )?.seasonId
  const womenSeasonId = newSeasons.find(
    (s) => s.women === true,
  )?.seasonId

  if (!menSeasonId || !womenSeasonId)
    throw new Error('Nya säsonger har inte genererats.')

  const newCompetitions = [
    {
      seasonId: menSeasonId,
      women: false,
      competitionName: 'Högsta divisionen',
      division: 1,
    },
    {
      seasonId: womenSeasonId,
      women: true,
      competitionName: 'Högsta divisionen',
      division: 1,
    },
  ]

  const newCompetitionIds = await db
    .insert(competitions)
    .values(newCompetitions)
    .returning({
      women: competitions.women,
      competitionId: competitions.competitionId,
    })

  const newTeamSeasonsArrays = await db
    .select({
      teamId: teamseasons.teamId,
      women: teamseasons.women,
    })
    .from(teamseasons)
    .where(
      inArray(teamseasons.seasonId, [
        seasonInfo.currMenSeason.seasonId,
        seasonInfo.currWomenSeason.seasonId,
      ]),
    )
    .then((res) => {
      const menTeamSeasons = res
        .filter((i) => i.women !== true)
        .map((team) => {
          return {
            teamId: team.teamId,
            women: team.women,
            seasonId: menSeasonId,
          }
        })
      const wommenTeamSeasons = res
        .filter((i) => i.women === true)
        .map((team) => {
          return {
            teamId: team.teamId,
            women: team.women,
            seasonId: womenSeasonId,
          }
        })

      return [...menTeamSeasons, ...wommenTeamSeasons]
    })

  await db.insert(teamseasons).values(newTeamSeasonsArrays)

  const seasonMetaData = [
    {
      seasonId: menSeasonId,
      name: 'Elitserien',
      year: seasonInfo.nextYear,
      hostCity: '',
      finalDate: '',
      northSouth: false,
      multipleGroupStages: false,
      eight: true,
      quarter: true,
      semi: true,
      final: true,
    },
    {
      seasonId: womenSeasonId,
      name: 'Elitserien',
      year: seasonInfo.nextYear,
      hostCity: '',
      finalDate: '',
      northSouth: false,
      multipleGroupStages: false,
      eight: false,
      quarter: true,
      semi: true,
      final: true,
    },
  ]

  await db.insert(metadata).values(seasonMetaData)

  const menCompetition = newCompetitionIds.find(
    (c) => c.women === false,
  )
  const womenCompetition = newCompetitionIds.find(
    (c) => c.women === true,
  )

  if (!menCompetition) {
    throw new Error('Herrturnering saknas')
  }

  if (!womenCompetition) {
    throw new Error('Damturnering saknas')
  }

  const newSeriesArray = [
    {
      seasonId: womenSeasonId,
      competitionId: womenCompetition.competitionId,
      group: 'final',
      category: 'final',
      serieName: 'Final',
      level: 100,
      division: 1,
    },
    {
      seasonId: menSeasonId,
      competitionId: menCompetition.competitionId,
      group: 'final',
      category: 'final',
      serieName: 'Final',
      level: 100,
      division: 1,
    },
    {
      seasonId: womenSeasonId,
      competitionId: womenCompetition.competitionId,
      group: 'S1',
      category: 'semi',
      serieName: 'Semifinal 1',
      level: 110,
      division: 1,
    },
    {
      seasonId: menSeasonId,
      competitionId: menCompetition.competitionId,
      group: 'S1',
      category: 'semi',
      serieName: 'Semifinal 1',
      level: 110,
      division: 1,
    },
    {
      seasonId: womenSeasonId,
      competitionId: womenCompetition.competitionId,
      group: 'S2',
      category: 'semi',
      serieName: 'Semifinal 2',
      level: 110,
      division: 1,
    },
    {
      seasonId: menSeasonId,
      competitionId: menCompetition.competitionId,
      group: 'S2',
      category: 'semi',
      serieName: 'Semifinal 2',
      level: 110,
      division: 1,
    },
    {
      seasonId: womenSeasonId,
      competitionId: womenCompetition.competitionId,
      group: 'Q1',
      category: 'quarter',
      serieName: 'Kvartsfinal 1',
      level: 120,
      division: 1,
    },
    {
      seasonId: menSeasonId,
      competitionId: menCompetition.competitionId,
      group: 'Q1',
      category: 'quarter',
      serieName: 'Kvartsfinal 1',
      level: 120,
      division: 1,
    },
    {
      seasonId: womenSeasonId,
      competitionId: womenCompetition.competitionId,
      group: 'Q2',
      category: 'quarter',
      serieName: 'Kvartsfinal 2',
      level: 120,
      division: 1,
    },
    {
      seasonId: menSeasonId,
      competitionId: menCompetition.competitionId,
      group: 'Q2',
      category: 'quarter',
      serieName: 'Kvartsfinal 2',
      level: 120,
      division: 1,
    },
    {
      seasonId: womenSeasonId,
      competitionId: womenCompetition.competitionId,
      group: 'Q3',
      category: 'quarter',
      serieName: 'Kvartsfinal 3',
      level: 120,
      division: 1,
    },
    {
      seasonId: menSeasonId,
      competitionId: menCompetition.competitionId,
      group: 'Q3',
      category: 'quarter',
      serieName: 'Kvartsfinal 3',
      level: 120,
      division: 1,
    },
    {
      seasonId: womenSeasonId,
      competitionId: womenCompetition.competitionId,
      group: 'Q4',
      category: 'quarter',
      serieName: 'Kvartsfinal 4',
      level: 120,
      division: 1,
    },
    {
      seasonId: menSeasonId,
      competitionId: menCompetition.competitionId,
      group: 'Q4',
      category: 'quarter',
      serieName: 'Kvartsfinal 4',
      level: 120,
      division: 1,
    },
    {
      seasonId: menSeasonId,
      competitionId: menCompetition.competitionId,
      group: 'E1',
      category: 'eight',
      serieName: 'Åttondel 1',
      level: 130,
      division: 1,
    },
    {
      seasonId: menSeasonId,
      competitionId: menCompetition.competitionId,
      group: 'E2',
      category: 'eight',
      serieName: 'Åttondel 2',
      level: 130,
      division: 1,
    },
    {
      seasonId: womenSeasonId,
      competitionId: womenCompetition.competitionId,
      group: 'elitserien',
      category: 'regular',
      serieName: 'Elitserien',
      level: 200,
      division: 1,
    },
    {
      seasonId: menSeasonId,
      competitionId: menCompetition.competitionId,
      group: 'elitserien',
      category: 'regular',
      serieName: 'Elitserien',
      level: 200,
      division: 1,
    },
  ]

  await db.insert(series).values(newSeriesArray)

  const playoffSeasonArray: Array<
    typeof playoffseason.$inferInsert
  > = [
    {
      seasonId: menSeasonId,
      women: false,
      playoffAsSeries: false,
      hasEight: true,
      hasQuarter: true,
      uefaSorting: false,
    },
    {
      seasonId: womenSeasonId,
      women: true,
      playoffAsSeries: false,
      hasEight: true,
      hasQuarter: true,
      uefaSorting: false,
    },
  ]

  await db.insert(playoffseason).values(playoffSeasonArray)

  return seasonInfo.nextYear
}
