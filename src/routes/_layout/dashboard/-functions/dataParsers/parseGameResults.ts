import { zd } from '@/lib/utils/zod'

export const parseGameResult = zd
  .object({
    gameId: zd.number().int().positive(),
    homeTeamId: zd.number().int().positive(),
    awayTeamId: zd.number().int().positive(),
    result: zd
      .string()
      .regex(/^\d{1,2}-\d{1,2}$/, { message: 'Fel resultatformat.' }),
    halftimeResult: zd
      .string()
      .regex(/^\d{1,2}-\d{1,2}$/, { message: 'Fel resultatformat.' })
      .or(zd.literal('')),
    date: zd.iso.date({ message: 'Fel datumformat.' }),
    women: zd.boolean(),
    penalties: zd.boolean(),
    extraTime: zd.boolean(),
    otResult: zd
      .string()
      .regex(/^\d{1,2}-\d{1,2}$/, { message: 'Fel resultatformat.' })
      .or(zd.literal('')),
    homeTeamGameId: zd.number().int().positive(),
    awayTeamGameId: zd.number().int().positive(),
  })
  .transform((obj) => {
    const resultArray = obj.result
      .split('-')
      .map((item) => zd.coerce.number().parse(item))
    const halftimeResultArray =
      obj.halftimeResult === ''
        ? null
        : obj.halftimeResult
            .split('-')
            .map((item) => zd.coerce.number().parse(item))
    const otResultArray =
      obj.otResult === ''
        ? null
        : obj.otResult.split('-').map((item) => zd.coerce.number().parse(item))

    const otHomeGoal = otResultArray ? otResultArray[0] : null
    const otAwayGoal = otResultArray ? otResultArray[1] : null
    const otHomeWin = otHomeGoal && otAwayGoal ? otHomeGoal > otAwayGoal : null
    const otAwayWin = otHomeGoal && otAwayGoal ? otAwayGoal > otHomeGoal : null
    const homeGoal = resultArray[0]
    const awayGoal = resultArray[1]
    const halftimeHomeGoal = halftimeResultArray ? halftimeResultArray[0] : null
    const halftimeAwayGoal = halftimeResultArray ? halftimeResultArray[1] : null
    const goalsScoredByHomeTeam = homeGoal
    const goalsScoredByAwayTeam = awayGoal
    const goalsConcededByHomeTeam = awayGoal
    const goalsConcededByAwayTeam = homeGoal
    const goalDifferenceHomeTeam =
      goalsScoredByHomeTeam - goalsConcededByHomeTeam
    const goalDifferenceAwayTeam =
      goalsScoredByAwayTeam - goalsConcededByAwayTeam
    const homeWin = homeGoal > awayGoal
    const draw = homeGoal === awayGoal
    const awayWin = awayGoal > homeGoal
    const pointsHomeTeam = homeWin ? 2 : draw ? 1 : 0
    const pointsAwayTeam = awayWin ? 2 : draw ? 1 : 0
    const firstHalfGoalsScoredByHomeTeam = halftimeHomeGoal
    const firstHalfGoalsScoredByAwayTeam = halftimeAwayGoal
    const firstHalfGoalsConcededByHomeTeam = halftimeAwayGoal
    const firstHalfGoalsConcededByAwayTeam = halftimeHomeGoal
    const firstHalfGoalDifferenceHomeTeam =
      firstHalfGoalsScoredByHomeTeam && firstHalfGoalsConcededByHomeTeam
        ? firstHalfGoalsScoredByHomeTeam - firstHalfGoalsConcededByHomeTeam
        : null
    const firstHalfGoalDifferenceAwayTeam =
      firstHalfGoalsScoredByAwayTeam && firstHalfGoalsConcededByAwayTeam
        ? firstHalfGoalsScoredByAwayTeam - firstHalfGoalsConcededByAwayTeam
        : null
    const secondHalfGoalsScoredByHomeTeam = firstHalfGoalsScoredByHomeTeam
      ? goalsScoredByHomeTeam - firstHalfGoalsScoredByHomeTeam
      : null
    const secondHalfGoalsScoredByAwayTeam = firstHalfGoalsScoredByAwayTeam
      ? goalsScoredByAwayTeam - firstHalfGoalsScoredByAwayTeam
      : null
    const secondHalfGoalsConcededByHomeTeam = firstHalfGoalsConcededByHomeTeam
      ? goalsConcededByHomeTeam - firstHalfGoalsConcededByHomeTeam
      : null
    const secondHalfGoalsConcededByAwayTeam = firstHalfGoalsConcededByAwayTeam
      ? goalsConcededByAwayTeam - firstHalfGoalsConcededByAwayTeam
      : null
    const secondHalfGoalDifferenceHomeTeam =
      secondHalfGoalsScoredByHomeTeam && secondHalfGoalsConcededByHomeTeam
        ? secondHalfGoalsScoredByHomeTeam - secondHalfGoalsConcededByHomeTeam
        : null
    const secondHalfGoalDifferenceAwayTeam =
      secondHalfGoalsScoredByAwayTeam && secondHalfGoalsConcededByAwayTeam
        ? secondHalfGoalsScoredByAwayTeam - secondHalfGoalsConcededByAwayTeam
        : null
    const firstHalfHomeWin =
      firstHalfGoalsScoredByHomeTeam && firstHalfGoalsConcededByHomeTeam
        ? firstHalfGoalsScoredByHomeTeam > firstHalfGoalsConcededByHomeTeam
        : null
    const firstHalfDraw =
      firstHalfGoalsScoredByHomeTeam && firstHalfGoalsConcededByHomeTeam
        ? firstHalfGoalsScoredByHomeTeam === firstHalfGoalsConcededByHomeTeam
        : null
    const firstHalfAwayWin =
      firstHalfGoalsScoredByAwayTeam && firstHalfGoalsConcededByAwayTeam
        ? firstHalfGoalsScoredByAwayTeam > firstHalfGoalsConcededByAwayTeam
        : null
    const secondHalfHomeWin =
      secondHalfGoalsScoredByHomeTeam && secondHalfGoalsConcededByHomeTeam
        ? secondHalfGoalsScoredByHomeTeam > secondHalfGoalsConcededByHomeTeam
        : null
    const secondHalfDraw =
      secondHalfGoalsScoredByHomeTeam && secondHalfGoalsConcededByHomeTeam
        ? secondHalfGoalsScoredByHomeTeam === secondHalfGoalsConcededByHomeTeam
        : null
    const secondHalfAwayWin =
      secondHalfGoalsScoredByAwayTeam && secondHalfGoalsConcededByAwayTeam
        ? secondHalfGoalsScoredByAwayTeam > secondHalfGoalsConcededByAwayTeam
        : null
    const firstHalfPointsHomeTeam = firstHalfHomeWin
      ? 2
      : firstHalfDraw
        ? 1
        : firstHalfAwayWin
          ? 0
          : null

    const firstHalfPointsAwayTeam = firstHalfAwayWin
      ? 2
      : firstHalfDraw
        ? 1
        : firstHalfHomeWin
          ? 0
          : null

    const secondHalfPointsHomeTeam = secondHalfHomeWin
      ? 2
      : secondHalfDraw
        ? 1
        : secondHalfAwayWin
          ? 0
          : null

    const secondHalfPointsAwayTeam = secondHalfAwayWin
      ? 2
      : secondHalfDraw
        ? 1
        : secondHalfHomeWin
          ? 0
          : null

    const homeTeamTeamGame = {
      date: obj.date,
      played: true,
      goalsScored: goalsScoredByHomeTeam,
      goalsConceded: goalsConcededByHomeTeam,
      goalDifference: goalDifferenceHomeTeam,
      win: homeWin,
      otWin: otHomeWin,
      otLost: otAwayWin,
      draw,
      lost: awayWin,
      points: pointsHomeTeam,
      firstHalfGoalsScored: firstHalfGoalsScoredByHomeTeam,
      firstHalfGoalsConceded: firstHalfGoalsConcededByHomeTeam,
      firstHalfGoalDifference: firstHalfGoalDifferenceHomeTeam,
      secondHalfGoalsScored: secondHalfGoalsScoredByHomeTeam,
      secondHalfGoalsConceded: secondHalfGoalsConcededByHomeTeam,
      secondHalfGoalDifference: secondHalfGoalDifferenceHomeTeam,
      firstHalfPoints: firstHalfPointsHomeTeam,
      secondHalfPoints: secondHalfPointsHomeTeam,
      firstHalfWin: firstHalfHomeWin,
      secondHalfWin: secondHalfHomeWin,
      firstHalfLost: firstHalfAwayWin,
      secondHalfLost: secondHalfAwayWin,
      firstHalfDraw: firstHalfDraw,
      secondHalfDraw: secondHalfDraw,
    }

    const awayTeamTeamGame = {
      date: obj.date,
      played: true,
      goalsScored: goalsScoredByAwayTeam,
      goalsConceded: goalsConcededByAwayTeam,
      goalDifference: goalDifferenceAwayTeam,
      win: awayWin,
      otWin: otAwayWin,
      otLost: otHomeWin,
      draw,
      lost: homeWin,
      points: pointsAwayTeam,
      firstHalfGoalsScored: firstHalfGoalsScoredByAwayTeam,
      firstHalfGoalsConceded: firstHalfGoalsConcededByAwayTeam,
      firstHalfGoalDifference: firstHalfGoalDifferenceAwayTeam,
      secondHalfGoalsScored: secondHalfGoalsScoredByAwayTeam,
      secondHalfGoalsConceded: secondHalfGoalsConcededByAwayTeam,
      secondHalfGoalDifference: secondHalfGoalDifferenceAwayTeam,
      firstHalfPoints: firstHalfPointsAwayTeam,
      secondHalfPoints: secondHalfPointsAwayTeam,
      firstHalfWin: firstHalfAwayWin,
      secondHalfWin: secondHalfAwayWin,
      firstHalfLost: firstHalfHomeWin,
      secondHalfLost: secondHalfHomeWin,
      firstHalfDraw: firstHalfDraw,
      secondHalfDraw: secondHalfDraw,
    }

    return {
      gameId: obj.gameId,
      result: obj.result,
      otResult: obj.otResult,
      halftimeResult: obj.halftimeResult,
      date: obj.date,
      women: obj.women,
      homeTeamId: obj.homeTeamId,
      awayTeamId: obj.awayTeamId,
      homeGoal,
      awayGoal,
      halftimeHomeGoal,
      halftimeAwayGoal,
      penalties: obj.penalties,
      extraTime: obj.extraTime,
      homeTeamTeamGame,
      awayTeamTeamGame,
      homeTeamGameId: obj.homeTeamGameId,
      awayTeamGameId: obj.awayTeamGameId,
    }
  })

export const parseNewGameWithResult = zd
  .object({
    homeTeamId: zd.number().int().positive(),
    awayTeamId: zd.number().int().positive(),
    result: zd
      .string()
      .regex(/^\d{1,2}-\d{1,2}$/, { message: 'Fel resultatformat.' }),
    halftimeResult: zd
      .string()
      .regex(/^\d{1,2}-\d{1,2}$/, { message: 'Fel resultatformat.' })
      .or(zd.literal('')),
    date: zd.iso.date({ message: 'Fel datumformat.' }),
    group: zd.string(),
    category: zd.string(),
    seasonId: zd.number().int().positive(),
    serieId: zd.number().int().positive(),
    women: zd.boolean(),
    penalties: zd.boolean(),
    extraTime: zd.boolean(),
    playoff:zd.boolean(),
    otResult: zd
      .string()
      .regex(/^\d{1,2}-\d{1,2}$/, { message: 'Fel resultatformat.' })
      .or(zd.literal('')),
  })
  .transform((obj) => {
    const resultArray = obj.result
      .split('-')
      .map((item) => zd.coerce.number().parse(item))
    const halftimeResultArray =
      obj.halftimeResult === ''
        ? null
        : obj.halftimeResult
            .split('-')
            .map((item) => zd.coerce.number().parse(item))
    const otResultArray =
      obj.otResult === ''
        ? null
        : obj.otResult.split('-').map((item) => zd.coerce.number().parse(item))

    const otHomeGoal = otResultArray ? otResultArray[0] : null
    const otAwayGoal = otResultArray ? otResultArray[1] : null
    const otHomeWin = otHomeGoal && otAwayGoal ? otHomeGoal > otAwayGoal : null
    const otAwayWin = otHomeGoal && otAwayGoal ? otAwayGoal > otHomeGoal : null
    const homeGoal = resultArray[0]
    const awayGoal = resultArray[1]
    const halftimeHomeGoal = halftimeResultArray ? halftimeResultArray[0] : null
    const halftimeAwayGoal = halftimeResultArray ? halftimeResultArray[1] : null
    const goalsScoredByHomeTeam = homeGoal
    const goalsScoredByAwayTeam = awayGoal
    const goalsConcededByHomeTeam = awayGoal
    const goalsConcededByAwayTeam = homeGoal
    const goalDifferenceHomeTeam =
      goalsScoredByHomeTeam - goalsConcededByHomeTeam
    const goalDifferenceAwayTeam =
      goalsScoredByAwayTeam - goalsConcededByAwayTeam
    const homeWin = homeGoal > awayGoal
    const draw = homeGoal === awayGoal
    const awayWin = awayGoal > homeGoal
    const pointsHomeTeam = homeWin ? 2 : draw ? 1 : 0
    const pointsAwayTeam = awayWin ? 2 : draw ? 1 : 0
    const firstHalfGoalsScoredByHomeTeam = halftimeHomeGoal
    const firstHalfGoalsScoredByAwayTeam = halftimeAwayGoal
    const firstHalfGoalsConcededByHomeTeam = halftimeAwayGoal
    const firstHalfGoalsConcededByAwayTeam = halftimeHomeGoal
    const firstHalfGoalDifferenceHomeTeam =
      firstHalfGoalsScoredByHomeTeam && firstHalfGoalsConcededByHomeTeam
        ? firstHalfGoalsScoredByHomeTeam - firstHalfGoalsConcededByHomeTeam
        : null
    const firstHalfGoalDifferenceAwayTeam =
      firstHalfGoalsScoredByAwayTeam && firstHalfGoalsConcededByAwayTeam
        ? firstHalfGoalsScoredByAwayTeam - firstHalfGoalsConcededByAwayTeam
        : null
    const secondHalfGoalsScoredByHomeTeam = firstHalfGoalsScoredByHomeTeam
      ? goalsScoredByHomeTeam - firstHalfGoalsScoredByHomeTeam
      : null
    const secondHalfGoalsScoredByAwayTeam = firstHalfGoalsScoredByAwayTeam
      ? goalsScoredByAwayTeam - firstHalfGoalsScoredByAwayTeam
      : null
    const secondHalfGoalsConcededByHomeTeam = firstHalfGoalsConcededByHomeTeam
      ? goalsConcededByHomeTeam - firstHalfGoalsConcededByHomeTeam
      : null
    const secondHalfGoalsConcededByAwayTeam = firstHalfGoalsConcededByAwayTeam
      ? goalsConcededByAwayTeam - firstHalfGoalsConcededByAwayTeam
      : null
    const secondHalfGoalDifferenceHomeTeam =
      secondHalfGoalsScoredByHomeTeam && secondHalfGoalsConcededByHomeTeam
        ? secondHalfGoalsScoredByHomeTeam - secondHalfGoalsConcededByHomeTeam
        : null
    const secondHalfGoalDifferenceAwayTeam =
      secondHalfGoalsScoredByAwayTeam && secondHalfGoalsConcededByAwayTeam
        ? secondHalfGoalsScoredByAwayTeam - secondHalfGoalsConcededByAwayTeam
        : null
    const firstHalfHomeWin =
      firstHalfGoalsScoredByHomeTeam && firstHalfGoalsConcededByHomeTeam
        ? firstHalfGoalsScoredByHomeTeam > firstHalfGoalsConcededByHomeTeam
        : null
    const firstHalfDraw =
      firstHalfGoalsScoredByHomeTeam && firstHalfGoalsConcededByHomeTeam
        ? firstHalfGoalsScoredByHomeTeam === firstHalfGoalsConcededByHomeTeam
        : null
    const firstHalfAwayWin =
      firstHalfGoalsScoredByAwayTeam && firstHalfGoalsConcededByAwayTeam
        ? firstHalfGoalsScoredByAwayTeam > firstHalfGoalsConcededByAwayTeam
        : null
    const secondHalfHomeWin =
      secondHalfGoalsScoredByHomeTeam && secondHalfGoalsConcededByHomeTeam
        ? secondHalfGoalsScoredByHomeTeam > secondHalfGoalsConcededByHomeTeam
        : null
    const secondHalfDraw =
      secondHalfGoalsScoredByHomeTeam && secondHalfGoalsConcededByHomeTeam
        ? secondHalfGoalsScoredByHomeTeam === secondHalfGoalsConcededByHomeTeam
        : null
    const secondHalfAwayWin =
      secondHalfGoalsScoredByAwayTeam && secondHalfGoalsConcededByAwayTeam
        ? secondHalfGoalsScoredByAwayTeam > secondHalfGoalsConcededByAwayTeam
        : null
    const firstHalfPointsHomeTeam = firstHalfHomeWin
      ? 2
      : firstHalfDraw
        ? 1
        : firstHalfAwayWin
          ? 0
          : null

    const firstHalfPointsAwayTeam = firstHalfAwayWin
      ? 2
      : firstHalfDraw
        ? 1
        : firstHalfHomeWin
          ? 0
          : null

    const secondHalfPointsHomeTeam = secondHalfHomeWin
      ? 2
      : secondHalfDraw
        ? 1
        : secondHalfAwayWin
          ? 0
          : null

    const secondHalfPointsAwayTeam = secondHalfAwayWin
      ? 2
      : secondHalfDraw
        ? 1
        : secondHalfHomeWin
          ? 0
          : null

    const homeTeamTeamGame = {
      date: obj.date,
      played: true,
      goalsScored: goalsScoredByHomeTeam,
      goalsConceded: goalsConcededByHomeTeam,
      goalDifference: goalDifferenceHomeTeam,
      win: homeWin,
      otWin: otHomeWin,
      otLost: otAwayWin,
      draw,
      lost: awayWin,
      points: pointsHomeTeam,
      firstHalfGoalsScored: firstHalfGoalsScoredByHomeTeam,
      firstHalfGoalsConceded: firstHalfGoalsConcededByHomeTeam,
      firstHalfGoalDifference: firstHalfGoalDifferenceHomeTeam,
      secondHalfGoalsScored: secondHalfGoalsScoredByHomeTeam,
      secondHalfGoalsConceded: secondHalfGoalsConcededByHomeTeam,
      secondHalfGoalDifference: secondHalfGoalDifferenceHomeTeam,
      firstHalfPoints: firstHalfPointsHomeTeam,
      secondHalfPoints: secondHalfPointsHomeTeam,
      firstHalfWin: firstHalfHomeWin,
      secondHalfWin: secondHalfHomeWin,
      firstHalfLost: firstHalfAwayWin,
      secondHalfLost: secondHalfAwayWin,
      firstHalfDraw: firstHalfDraw,
      secondHalfDraw: secondHalfDraw,
    }

    const awayTeamTeamGame = {
      date: obj.date,
      played: true,
      goalsScored: goalsScoredByAwayTeam,
      goalsConceded: goalsConcededByAwayTeam,
      goalDifference: goalDifferenceAwayTeam,
      win: awayWin,
      otWin: otAwayWin,
      otLost: otHomeWin,
      draw,
      lost: homeWin,
      points: pointsAwayTeam,
      firstHalfGoalsScored: firstHalfGoalsScoredByAwayTeam,
      firstHalfGoalsConceded: firstHalfGoalsConcededByAwayTeam,
      firstHalfGoalDifference: firstHalfGoalDifferenceAwayTeam,
      secondHalfGoalsScored: secondHalfGoalsScoredByAwayTeam,
      secondHalfGoalsConceded: secondHalfGoalsConcededByAwayTeam,
      secondHalfGoalDifference: secondHalfGoalDifferenceAwayTeam,
      firstHalfPoints: firstHalfPointsAwayTeam,
      secondHalfPoints: secondHalfPointsAwayTeam,
      firstHalfWin: firstHalfAwayWin,
      secondHalfWin: secondHalfAwayWin,
      firstHalfLost: firstHalfHomeWin,
      secondHalfLost: secondHalfHomeWin,
      firstHalfDraw: firstHalfDraw,
      secondHalfDraw: secondHalfDraw,
    }

    return {
      ...obj,
      homeGoal,
      awayGoal,
      halftimeHomeGoal,
      halftimeAwayGoal,
      homeTeamTeamGame,
      awayTeamTeamGame,
    }
  })
