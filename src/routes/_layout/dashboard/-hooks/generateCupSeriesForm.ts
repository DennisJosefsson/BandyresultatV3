import type { competitions } from '@/db/schema'
import type { cupCategoryEnum } from '@/lib/types/serie'
import type { zd } from '@/lib/utils/zod'
import {
  revalidateLogic,
  useForm,
} from '@tanstack/react-form'
import { generatedCupSeries } from '../-functions/SerieFunctions/addGeneratedCupSeries'
import { useAddGeneratedCupSeriesMutation } from './addGeneratedCupSeriesMutation'

type FormProps = {
  competition: typeof competitions.$inferSelect
}

export const generateCupSeriesForm = ({
  competition,
}: FormProps) => {
  const mutation = useAddGeneratedCupSeriesMutation()

  const defaultValues = [
    {
      seasonId: competition.seasonId,
      group: 'cup-final',
      serieName: 'Final',
      level: competition.division === 10 ? 1000 : 1100,
      category: 'cup-final' as zd.infer<
        typeof cupCategoryEnum
      >,
      division: competition.division,
      competitionId: competition.competitionId,
    },
    {
      seasonId: competition.seasonId,
      group: 'cup-S1',
      serieName: 'Semifinal 1',
      level: competition.division === 10 ? 1010 : 1110,
      category: 'cup-semi' as zd.infer<
        typeof cupCategoryEnum
      >,
      division: competition.division,
      competitionId: competition.competitionId,
    },
    {
      seasonId: competition.seasonId,
      group: 'cup-S2',
      serieName: 'Semifinal 2',
      level: competition.division === 10 ? 1010 : 1110,
      category: 'cup-semi' as zd.infer<
        typeof cupCategoryEnum
      >,
      division: competition.division,
      competitionId: competition.competitionId,
    },
  ]

  const form = useForm({
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: generatedCupSeries,
    },
    defaultValues: {
      seriesArray: defaultValues,
    },
    onSubmit: ({ value }) =>
      mutation.mutateAsync({ data: value }),
  })

  return form
}
