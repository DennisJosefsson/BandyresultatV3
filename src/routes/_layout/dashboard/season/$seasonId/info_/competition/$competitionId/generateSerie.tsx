import { Button } from '@/components/base/ui/button'
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from '@/components/base/ui/field'
import { Input } from '@/components/base/ui/input'
import CustomNumberInput from '@/components/Common/CustomNumberInput'
import type { categoryEnum } from '@/lib/types/serie'
import type { zd } from '@/lib/utils/zod'
import { getCompetition } from '@/routes/_layout/dashboard/-functions/CompetitionFunctions/getCompetition'
import { generateSeriesForm } from '@/routes/_layout/dashboard/-hooks/generateSeriesForm'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/info_/competition/$competitionId/generateSerie',
)({
  loader: async ({ params }) => {
    const data = await getCompetition({
      data: { competitionId: params.competitionId },
    })

    if (!data) throw new Error('Missing competition data')

    return data
  },
  component: RouteComponent,
})

function RouteComponent() {
  const data = Route.useLoaderData()

  if (data.status === 200) {
    return <Selection competition={data.competition} />
  }

  return (
    <div className="flex flex-row mt-4">
      <span>Ingen data</span>
    </div>
  )
}

type SelectionProps = {
  competition: {
    women: boolean
    seasonId: number
    division: number
    competitionId: number
    competitionName: string
    isCup: boolean | null
  }
}

function Selection({ competition }: SelectionProps) {
  const form = generateSeriesForm({ competition })

  const addOneRegularGroup = () => {
    form.pushFieldValue('seriesArray', {
      seasonId: competition.seasonId,
      group: `group${1}`,
      serieName: `Grundserie ${1}`,
      level: competition.division * 100 + 100,
      category: 'regular' as zd.infer<typeof categoryEnum>,
      division: competition.division,
      competitionId: competition.competitionId,
    })
  }

  const addTwoRegularGroups = () => {
    const tworegularSeries = [1, 2].map((grp) => {
      return {
        seasonId: competition.seasonId,
        group: `group${grp}`,
        serieName: `Grundserie ${grp}`,
        level: competition.division * 100 + 100,
        category: 'regular' as zd.infer<
          typeof categoryEnum
        >,
        division: competition.division,
        competitionId: competition.competitionId,
      }
    })
    tworegularSeries.forEach((arr) =>
      form.pushFieldValue('seriesArray', arr),
    )
  }

  const addOneQualificationGroup = () => {
    form.pushFieldValue('seriesArray', {
      seasonId: competition.seasonId,
      group: `group${1}`,
      serieName: `Grundserie ${1}`,
      level: competition.division * 100 + 100,
      category: 'qualification' as zd.infer<
        typeof categoryEnum
      >,
      division: competition.division,
      competitionId: competition.competitionId,
    })
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between items-center">
        <span className="text-sm font-semibold">
          Grupper {competition.competitionName}
        </span>
        <Button
          type="submit"
          form="generateSeries"
        >
          Skicka
        </Button>
      </div>
      <div className="flex flex-row gap-4 items-center">
        <Button onClick={addOneRegularGroup}>
          1 grundseriegrupp
        </Button>
        <Button onClick={addTwoRegularGroups}>
          2 grundseriegrupper
        </Button>
        <Button onClick={addOneQualificationGroup}>
          1 kvalgrupp
        </Button>
      </div>
      <form
        id="generateSeries"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <FieldGroup>
          <form.Field
            name="seriesArray"
            mode="array"
          >
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                !field.state.meta.isValid
              return (
                <FieldSet className="">
                  <FieldLegend
                    variant="label"
                    className="w-full"
                  >
                    <div className="grid grid-cols-4 gap-2 w-full">
                      <span>Serienamn</span>
                      <span>Gruppkod</span>
                      <span>Level</span>
                      <span className="invisible">
                        Fält
                      </span>
                    </div>
                  </FieldLegend>
                  <FieldGroup className="gap-4">
                    {field.state.value.map((_, index) => {
                      return (
                        <div
                          key={`div-${index}`}
                          className="grid grid-cols-4 gap-2"
                        >
                          <form.Field
                            key={`seriesArray-serieName-${index}`}
                            name={`seriesArray[${index}].serieName`}
                            children={(subField) => {
                              const isSubFieldInvalid =
                                subField.state.meta
                                  .isTouched &&
                                !subField.state.meta.isValid

                              return (
                                <Field
                                  orientation="horizontal"
                                  data-invalid={
                                    isSubFieldInvalid
                                  }
                                  className="flex flex-row items-center justify-start"
                                >
                                  <FieldContent>
                                    <Input
                                      id={`seriesArray-serieName-${index}`}
                                      name={subField.name}
                                      value={
                                        subField.state.value
                                      }
                                      onBlur={
                                        subField.handleBlur
                                      }
                                      onChange={(e) =>
                                        subField.handleChange(
                                          e.target.value,
                                        )
                                      }
                                      aria-invalid={
                                        isSubFieldInvalid
                                      }
                                      placeholder="Serienamn"
                                    />
                                  </FieldContent>
                                </Field>
                              )
                            }}
                          />
                          <form.Field
                            key={`seriesArray-group-${index}`}
                            name={`seriesArray[${index}].group`}
                            children={(subField) => {
                              const isSubFieldInvalid =
                                subField.state.meta
                                  .isTouched &&
                                !subField.state.meta.isValid

                              return (
                                <Field
                                  orientation="horizontal"
                                  data-invalid={
                                    isSubFieldInvalid
                                  }
                                  className="flex flex-row items-center justify-start"
                                >
                                  <FieldContent>
                                    <Input
                                      id={`seriesArray-group-${index}`}
                                      name={subField.name}
                                      value={
                                        subField.state.value
                                      }
                                      onBlur={
                                        subField.handleBlur
                                      }
                                      onChange={(e) =>
                                        subField.handleChange(
                                          e.target.value,
                                        )
                                      }
                                      aria-invalid={
                                        isSubFieldInvalid
                                      }
                                      placeholder="Gruppkod"
                                    />
                                  </FieldContent>
                                </Field>
                              )
                            }}
                          />
                          <form.Field
                            key={`seriesArray-level-${index}`}
                            name={`seriesArray[${index}].level`}
                            children={(subField) => {
                              const isSubFieldInvalid =
                                subField.state.meta
                                  .isTouched &&
                                !subField.state.meta.isValid

                              return (
                                <Field
                                  orientation="horizontal"
                                  data-invalid={
                                    isSubFieldInvalid
                                  }
                                  className="flex flex-row items-center justify-start"
                                >
                                  <FieldContent>
                                    <CustomNumberInput
                                      id={`seriesArray-level-${index}`}
                                      name={subField.name}
                                      value={
                                        subField.state.value
                                      }
                                      onBlur={
                                        subField.handleBlur
                                      }
                                      onChange={(e) =>
                                        subField.handleChange(
                                          e.target
                                            .valueAsNumber,
                                        )
                                      }
                                      aria-invalid={
                                        isSubFieldInvalid
                                      }
                                      placeholder="Level"
                                      incrementer={() =>
                                        subField.setValue(
                                          subField.state
                                            .value + 1,
                                        )
                                      }
                                      decrementer={() =>
                                        subField.setValue(
                                          subField.state
                                            .value - 1,
                                        )
                                      }
                                      error={{
                                        hasErrorField: true,
                                        errorBoolean:
                                          isSubFieldInvalid,
                                        errors:
                                          subField.state
                                            .meta.errors,
                                      }}
                                    />
                                  </FieldContent>
                                </Field>
                              )
                            }}
                          />
                          <Button
                            className="w-40"
                            variant="outline"
                            onClick={() =>
                              field.removeValue(index)
                            }
                          >
                            Ta bort
                          </Button>
                        </div>
                      )
                    })}
                  </FieldGroup>
                  {isInvalid && (
                    <FieldError
                      errors={field.state.meta.errors}
                    />
                  )}
                </FieldSet>
              )
            }}
          </form.Field>
        </FieldGroup>
      </form>
    </div>
  )
}
