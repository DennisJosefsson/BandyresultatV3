import { zd } from '@/lib/utils/zod'

export const parseUpdateDate = zd.object({
  gameId: zd.number().int().positive(),
  date: zd.iso.date({ message: 'Fel datumformat.' }),
  homeTeamGameId: zd.number().int().positive(),
  awayTeamGameId: zd.number().int().positive(),
})
