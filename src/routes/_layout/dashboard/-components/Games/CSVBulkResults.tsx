import { Button } from '@/components/base/ui/button'
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/base/ui/field'
import { Input } from '@/components/base/ui/input'
import type { BulkResultFileParser } from '@/lib/types/game'
import { getRouteApi } from '@tanstack/react-router'
import { useCSVBulkResultForm } from '../../-hooks/games/useCSVBulkResultForm'

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/info_/serie/$serieId/edit',
)

type CSVBulkResultsProps = {
  games: BulkResultFileParser
}

const CSVBulkResults = ({ games }: CSVBulkResultsProps) => {
  const teams = route.useLoaderData({
    select: (s) => s.teamsInSerie,
  })

  const teamIds = teams.map((t) => t.teamId)

  const form = useCSVBulkResultForm({ gameData: games })

  return (
    <div
      className="flex min-h-100 flex-col gap-2 px-20 py-2"
      id="section"
    >
      <div className="flex flex-row justify-end gap-2">
        <Button
          type="submit"
          form="bulkResultsForm"
        >
          Skicka
        </Button>
      </div>
      <form
        id="bulkResultsForm"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <FieldGroup>
          <form.Field
            name="gameObjectsArray"
            mode="array"
          >
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                !field.state.meta.isValid
              return (
                <FieldSet className="w-full gap-4">
                  <FieldLegend
                    variant="label"
                    className="w-full"
                  >
                    <div className="grid grid-cols-7 gap-4 w-full font-semibold">
                      <span>Hemma</span>
                      <span>Borta</span>
                      <span>Datum</span>
                      <span>Resultat</span>
                      <span>Halvtid</span>
                      <span>Övertid</span>
                      <span>Ta bort</span>
                    </div>
                  </FieldLegend>
                  <FieldGroup className="gap-4 w-full">
                    {field.state.value.map(
                      (game, index) => (
                        <div
                          className="grid grid-cols-7 gap-4 items-center"
                          key={`gamobjectsArray-fields-${index}`}
                        >
                          <form.Field
                            key={`gameObjectsArray[${index}].homeTeamId`}
                            name={`gameObjectsArray[${index}].homeTeamId`}
                            validators={{
                              onDynamic: ({ value }) => {
                                if (
                                  !teamIds.includes(value)
                                ) {
                                  return 'Hemmalaget finns inte i serien.'
                                }

                                return undefined
                              },
                            }}
                            children={(subField) => {
                              const isSubFieldInvalid =
                                subField.state.meta
                                  .isTouched &&
                                !subField.state.meta.isValid

                              const homeTeamName =
                                teams.find(
                                  (team) =>
                                    team.teamId ===
                                    game.homeTeamId,
                                )?.team.name

                              return (
                                <Field
                                  orientation="horizontal"
                                  data-invalid={
                                    isSubFieldInvalid
                                  }
                                  className="flex flex-row items-center justify-start"
                                >
                                  <FieldContent>
                                    <FieldLabel
                                      htmlFor={`gameObjectsArray-date-${index}`}
                                      className="w-20"
                                    >
                                      {homeTeamName ??
                                        'Hemmnamn saknas'}
                                    </FieldLabel>
                                    <Input
                                      className="hidden"
                                      id={`gameObjectsArray[${index}].homeTeamId`}
                                      name={subField.name}
                                    />
                                  </FieldContent>
                                </Field>
                              )
                            }}
                          />
                          <form.Field
                            key={`gameObjectsArray[${index}].awayTeamId`}
                            name={`gameObjectsArray[${index}].awayTeamId`}
                            validators={{
                              onDynamic: ({ value }) => {
                                if (
                                  !teamIds.includes(value)
                                ) {
                                  return 'Bortalaget finns inte i serien.'
                                }

                                return undefined
                              },
                            }}
                            children={(subField) => {
                              const isSubFieldInvalid =
                                subField.state.meta
                                  .isTouched &&
                                !subField.state.meta.isValid

                              const awayTeamName =
                                teams.find(
                                  (team) =>
                                    team.teamId ===
                                    game.awayTeamId,
                                )?.team.name

                              return (
                                <Field
                                  orientation="horizontal"
                                  data-invalid={
                                    isSubFieldInvalid
                                  }
                                  className="flex flex-row items-center justify-start"
                                >
                                  <FieldContent>
                                    <FieldLabel
                                      htmlFor={`gameObjectsArray-date-${index}`}
                                      className="w-20"
                                    >
                                      {awayTeamName ??
                                        'Bortanamn saknas'}
                                    </FieldLabel>
                                    <Input
                                      className="hidden"
                                      id={`gameObjectsArray[${index}].awayTeamId`}
                                      name={subField.name}
                                    />
                                  </FieldContent>
                                </Field>
                              )
                            }}
                          />
                          <form.Field
                            key={`gameObjectsArray[${index}].date`}
                            name={`gameObjectsArray[${index}].date`}
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
                                      id={`gameObjectsArray-date-${index}`}
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
                                      placeholder="T.ex. 2025-12-26"
                                      type="text"
                                    />
                                    {isSubFieldInvalid && (
                                      <FieldError
                                        errors={
                                          subField.state
                                            .meta.errors
                                        }
                                      />
                                    )}
                                  </FieldContent>
                                </Field>
                              )
                            }}
                          />
                          <form.Field
                            key={`gameObjectsArray[${index}].result`}
                            name={`gameObjectsArray[${index}].result`}
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
                                      id={`gameObjectsArray-result-${index}`}
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
                                      placeholder="T.ex. 1-0"
                                      type="text"
                                    />
                                    {isSubFieldInvalid && (
                                      <FieldError
                                        errors={
                                          subField.state
                                            .meta.errors
                                        }
                                      />
                                    )}
                                  </FieldContent>
                                </Field>
                              )
                            }}
                          />
                          <form.Field
                            key={`gameObjectsArray[${index}].halftimeResult`}
                            name={`gameObjectsArray[${index}].halftimeResult`}
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
                                      id={`gameObjectsArray-halftimeResult-${index}`}
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
                                      placeholder="T.ex. 1-0"
                                      type="text"
                                    />
                                    {isSubFieldInvalid && (
                                      <FieldError
                                        errors={
                                          subField.state
                                            .meta.errors
                                        }
                                      />
                                    )}
                                  </FieldContent>
                                </Field>
                              )
                            }}
                          />
                          <form.Field
                            key={`gameObjectsArray[${index}].otResult`}
                            name={`gameObjectsArray[${index}].otResult`}
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
                                      id={`gameObjectsArray-otResult-${index}`}
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
                                      placeholder="T.ex. 1-0"
                                      type="text"
                                    />
                                    {isSubFieldInvalid && (
                                      <FieldError
                                        errors={
                                          subField.state
                                            .meta.errors
                                        }
                                      />
                                    )}
                                  </FieldContent>
                                </Field>
                              )
                            }}
                          />
                          <Button
                            variant="outline"
                            onClick={() =>
                              field.removeValue(index)
                            }
                          >
                            Ta bort
                          </Button>
                        </div>
                      ),
                    )}
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

export default CSVBulkResults
