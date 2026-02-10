import { db } from '@/db'
import {
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
      if (secondYear > currYear || (secondYear === currYear && currMonth < 4)) {
        throw new Error('Du får vänta med att generera ny säsong!')
      }
      const nextYear = `${secondYear}/${secondYear + 1}`
      const currMenSeason = res.find((s) => s.women === false)
      const currWomenSeason = res.find((s) => s.women === true)
      if (!currMenSeason || !currWomenSeason)
        throw new Error('Nuvarande säsonger saknas.')
      return {
        nextYear,
        currMenSeason,
        currWomenSeason,
        secondYear,
      }
    })

  const newSeasons = await db
    .insert(seasons)
    .values([
      { year: seasonInfo.nextYear, women: false },
      { year: seasonInfo.nextYear, women: true },
    ])
    .returning()

  const menSeasonId = newSeasons.find((s) => s.women === false)?.seasonId
  const womenSeasonId = newSeasons.find((s) => s.women === true)?.seasonId

  if (!menSeasonId || !womenSeasonId)
    throw new Error('Nya säsonger har inte genererats.')

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

  const newSeriesArray = [
    {
      seasonId: womenSeasonId,
      group: 'final',
      category: 'final',
      serieName: 'Final',
      level: 1,
    },
    {
      seasonId: menSeasonId,
      group: 'final',
      category: 'final',
      serieName: 'Final',
      level: 1,
    },
    {
      seasonId: womenSeasonId,
      group: 'S1',
      category: 'semi',
      serieName: 'Semifinal 1',
      level: 1,
    },
    {
      seasonId: menSeasonId,
      group: 'S1',
      category: 'semi',
      serieName: 'Semifinal 1',
      level: 1,
    },
    {
      seasonId: womenSeasonId,
      group: 'S2',
      category: 'semi',
      serieName: 'Semifinal 2',
      level: 1,
    },
    {
      seasonId: menSeasonId,
      group: 'S2',
      category: 'semi',
      serieName: 'Semifinal 2',
      level: 1,
    },
    {
      seasonId: womenSeasonId,
      group: 'Q1',
      category: 'quarter',
      serieName: 'Kvartsfinal 1',
      level: 1,
    },
    {
      seasonId: menSeasonId,
      group: 'Q1',
      category: 'quarter',
      serieName: 'Kvartsfinal 1',
      level: 1,
    },
    {
      seasonId: womenSeasonId,
      group: 'Q2',
      category: 'quarter',
      serieName: 'Kvartsfinal 2',
      level: 1,
    },
    {
      seasonId: menSeasonId,
      group: 'Q2',
      category: 'quarter',
      serieName: 'Kvartsfinal 2',
      level: 1,
    },
    {
      seasonId: womenSeasonId,
      group: 'Q3',
      category: 'quarter',
      serieName: 'Kvartsfinal 3',
      level: 1,
    },
    {
      seasonId: menSeasonId,
      group: 'Q3',
      category: 'quarter',
      serieName: 'Kvartsfinal 3',
      level: 1,
    },
    {
      seasonId: womenSeasonId,
      group: 'Q4',
      category: 'quarter',
      serieName: 'Kvartsfinal 4',
      level: 1,
    },
    {
      seasonId: menSeasonId,
      group: 'Q4',
      category: 'quarter',
      serieName: 'Kvartsfinal 4',
      level: 1,
    },
    {
      seasonId: menSeasonId,
      group: 'E1',
      category: 'eight',
      serieName: 'Åttondel 1',
      level: 1,
    },
    {
      seasonId: menSeasonId,
      group: 'E2',
      category: 'eight',
      serieName: 'Åttondel 2',
      level: 1,
    },
    {
      seasonId: womenSeasonId,
      group: 'elitserien',
      category: 'regular',
      serieName: 'Elitserien',
      level: 1,
    },
    {
      seasonId: menSeasonId,
      group: 'elitserien',
      category: 'regular',
      serieName: 'Elitserien',
      level: 1,
    },

    {
      seasonId: menSeasonId,
      group: 'allsvenskan',
      category: 'qualification',
      serieName: 'Bandyallsvenskan',
      level: 2,
    },
  ]

  await db.insert(series).values(newSeriesArray)

  const playoffSeasonArray: (typeof playoffseason.$inferInsert)[] = [
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
