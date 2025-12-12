import { createServerFn } from '@tanstack/react-start'
import { getCookie, setCookie } from '@tanstack/react-start/server'
import * as z from 'zod'

const favTeamsValidator = z.array(z.coerce.number()).catch([])
export type T = z.infer<typeof favTeamsValidator>
const storageKey = 'favTeams'

export const getFavTeamsServerFn = createServerFn().handler(async () => {
  const favTeams = getCookie(storageKey)
  if (!favTeams) return []
  return favTeamsValidator.parse(JSON.parse(favTeams))
})

export const setFavTeamsServerFn = createServerFn({ method: 'POST' })
  .inputValidator(favTeamsValidator)
  .handler(async ({ data }) => setCookie(storageKey, JSON.stringify(data)))
