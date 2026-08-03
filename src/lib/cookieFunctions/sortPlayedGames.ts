import { createServerFn } from '@tanstack/react-start'
import {
  getCookie,
  setCookie,
} from '@tanstack/react-start/server'
import type * as z from 'zod'
import { zd } from '../utils/zod'

const sortPlayedGamesValidator = zd
  .union([zd.literal('asc'), zd.literal('desc')])
  .catch('desc')
export type T = z.infer<typeof sortPlayedGamesValidator>
const storageKey = 'sortPlayedGames'

export const getSortPlayedGamesServerFn =
  createServerFn().handler(async () => {
    const sortPlayedGames = getCookie(storageKey)
    if (!sortPlayedGames) return 'desc'
    return sortPlayedGamesValidator.parse(sortPlayedGames)
  })

export const setSortPlayedGamesServerFn = createServerFn({
  method: 'POST',
})
  .validator(sortPlayedGamesValidator)
  .handler(async ({ data }) => setCookie(storageKey, data))
