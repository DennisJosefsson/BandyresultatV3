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

type HostName = 'localhost' | 'dev.bandyresultat.se' | 'bandyresultat.se'

export const getBaseUrl = () => {
  let baseUrl: string

  const hostname = location.hostname as HostName

  switch (hostname) {
    case 'localhost':
      baseUrl = import.meta.env.VITE_SITE_LOCALHOST_URL
      break
    case 'dev.bandyresultat.se':
      baseUrl = import.meta.env.VITE_SITE_DEV_URL
      break
    case 'bandyresultat.se':
      baseUrl = import.meta.env.VITE_SITE_PROD_URL
      break
    default:
      baseUrl = import.meta.env.VITE_SITE_LOCALHOST_URL
  }

  return baseUrl
}
