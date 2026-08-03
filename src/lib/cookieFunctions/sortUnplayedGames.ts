import { createServerFn } from '@tanstack/react-start'
import {
  getCookie,
  setCookie,
} from '@tanstack/react-start/server'
import type * as z from 'zod'
import { zd } from '../utils/zod'

const sortUnplayedGamesValidator = zd
  .union([zd.literal('asc'), zd.literal('desc')])
  .catch('desc')
export type T = z.infer<typeof sortUnplayedGamesValidator>
const storageKey = 'sortUnplayedGames'

export const getSortUnplayedGamesServerFn =
  createServerFn().handler(async () => {
    const sortUnplayedGames = getCookie(storageKey)
    if (!sortUnplayedGames) return 'desc'
    return sortUnplayedGamesValidator.parse(
      sortUnplayedGames,
    )
  })

export const setSortUnplayedGamesServerFn = createServerFn({
  method: 'POST',
})
  .validator(sortUnplayedGamesValidator)
  .handler(async ({ data }) => setCookie(storageKey, data))
