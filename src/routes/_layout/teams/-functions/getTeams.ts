import { catchError } from '@/lib/middlewares/errors/catchError'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { z } from 'zod'
import { preparedTeamsList } from './preparedQueries/preparedTeamsList'

const women = z.boolean()

export const getTeams = createServerFn({ method: 'GET' })
  .validator(zodValidator(women))
  .handler(async ({ data }) => {
    try {
      const teamArray = await preparedTeamsList.execute({
        women: data,
      })

      return teamArray
    } catch (error) {
      catchError(error)
    }
  })
