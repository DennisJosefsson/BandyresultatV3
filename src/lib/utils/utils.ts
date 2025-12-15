import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { zd } from './zod'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const seasonIdCheck = zd.coerce
  .string('Fel format, säsongsId')
  .regex(/^[0-9]{4}$/, { message: 'Fel säsongsId' })
  .transform((value) => {
    const seasonId = Number(value)
    if (!isNaN(seasonId)) {
      if (seasonId > 1906 && seasonId < 1964) {
        return String(seasonId)
      } else if (seasonId > 1963) {
        return `${seasonId - 1}/${seasonId}`
      }
    }
  })

export const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://bandyresultat.se'
