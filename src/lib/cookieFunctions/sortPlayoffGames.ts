import { createServerFn } from '@tanstack/react-start'
import {
  getCookie,
  setCookie,
} from '@tanstack/react-start/server'
import type * as z from 'zod'
import { zd } from '../utils/zod'

const sortPlayoffGamesValidator = zd
  .union([zd.literal('played'), zd.literal('unplayed')])
  .catch('unplayed')
export type T = z.infer<typeof sortPlayoffGamesValidator>
const storageKey = 'sortPlayoffGames'

export const getSortPlayoffGamesServerFn =
  createServerFn().handler(async () => {
    const sortPlayoffGames = getCookie(storageKey)
    if (!sortPlayoffGames) return 'unplayed'
    return sortPlayoffGamesValidator.parse(sortPlayoffGames)
  })

export const setSortPlayoffGamesServerFn = createServerFn({
  method: 'POST',
})
  .validator(sortPlayoffGamesValidator)
  .handler(async ({ data }) => setCookie(storageKey, data))
