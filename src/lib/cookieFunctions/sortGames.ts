import { createServerFn } from '@tanstack/react-start'
import {
  getCookie,
  setCookie,
} from '@tanstack/react-start/server'
import type * as z from 'zod'
import { zd } from '../utils/zod'

const sortGamesValidator = zd
  .union([zd.literal('played'), zd.literal('unplayed')])
  .catch('unplayed')
export type T = z.infer<typeof sortGamesValidator>
const storageKey = 'sortGames'

export const getSortGamesServerFn =
  createServerFn().handler(async () => {
    const sortGames = getCookie(storageKey)
    if (!sortGames) return 'unplayed'
    return sortGamesValidator.parse(sortGames)
  })

export const setSortGamesServerFn = createServerFn({
  method: 'POST',
})
  .validator(sortGamesValidator)
  .handler(async ({ data }) => setCookie(storageKey, data))
