import type { competitions } from '@/db/schema'
import type { categoryEnum } from '@/lib/types/serie'
import type { zd } from '@/lib/utils/zod'
import {
  revalidateLogic,
  useForm,
} from '@tanstack/react-form'
import { generatedSeries } from '../-functions/SerieFunctions/addGeneratedSeries'
import { useAddGeneratedSeriesMutation } from './addGeneratedSeriesMutation'

type FormProps = {
  competition: typeof competitions.$inferSelect
}

export const generateSeriesForm = ({
  competition,
}: FormProps) => {
  const mutation = useAddGeneratedSeriesMutation()

  const defaultValues = [
    {
      seasonId: competition.seasonId,
      group: 'group',
      serieName: 'Serienamn',
      level: competition.division * 100 + 100,
      category: 'regular' as zd.infer<typeof categoryEnum>,
      competitionId: competition.competitionId,
    },
  ]

  const form = useForm({
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: generatedSeries,
    },
    defaultValues: {
      seriesArray: defaultValues,
    },
    onSubmit: ({ value }) =>
      mutation.mutateAsync({ data: value }),
  })

  return form
}
