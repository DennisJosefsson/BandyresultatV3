import { z } from 'zod'
import { createServerFn } from '@tanstack/react-start'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { preparedTeamsList } from './preparedQueries/preparedTeamsList'

const women = z.boolean()

export const getTeams = createServerFn({ method: 'GET' })
  .validator(women)
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
