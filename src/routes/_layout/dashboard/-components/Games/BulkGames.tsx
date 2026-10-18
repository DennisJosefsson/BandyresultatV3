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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/base/ui/input-group'
import type { BulkGameFileParser } from '@/lib/types/game'
import { getRouteApi } from '@tanstack/react-router'
import { XIcon } from 'lucide-react'
import { useBulkGameForm } from '../../-hooks/games/useBulkGameForm'

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/info_/serie/$serieId/edit',
)

const currDate = new Date().toLocaleDateString('se-SV', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

const BulkGames = ({
  gameData,
}: {
  gameData: BulkGameFileParser
}) => {
  const teams = route.useLoaderData({
    select: (s) => s.teamsInSerie,
  })

  const teamIds = teams.map((t) => t.teamId)

  const form = useBulkGameForm({ gameData })

  return (
    <div className="flex min-h-100 flex-col gap-2 px-20 py-2">
      <div className="flex flex-row justify-end gap-2">
        <Button
          type="submit"
          form="bulkGameForm"
        >
          Skicka
        </Button>
      </div>
      <form
        id="bulkGameForm"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <FieldGroup>
          <form.Field
            name="gameArray"
            mode="array"
          >
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                !field.state.meta.isValid
              return (
                <FieldSet className="w-240 gap-4">
                  <FieldLegend variant="label">
                    Matcher
                  </FieldLegend>
                  <FieldGroup className="gap-4 w-150">
                    {field.state.value.map(
                      (game, index) => (
                        <div className="grid grid-cols-3 gap-4 items-center">
                          <form.Field
                            key={`gameArray[${index}].homeTeamId`}
                            name={`gameArray[${index}].homeTeamId`}
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
                                  <FieldLabel
                                    htmlFor={`gamearray-date-${index}`}
                                    className="w-20"
                                  >
                                    {homeTeamName ??
                                      'Hemmnamn saknas'}
                                  </FieldLabel>
                                </Field>
                              )
                            }}
                          />
                          <form.Field
                            key={`gameArray[${index}].awayTeamId`}
                            name={`gameArray[${index}].awayTeamId`}
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
                                  <FieldLabel
                                    htmlFor={`gamearray-date-${index}`}
                                    className="w-20"
                                  >
                                    {awayTeamName ??
                                      'Bortanamn saknas'}
                                  </FieldLabel>
                                </Field>
                              )
                            }}
                          />
                          <form.Field
                            key={`gameArray[${index}].date`}
                            name={`gameArray[${index}].date`}
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
                                    <InputGroup className="w-60">
                                      <InputGroupInput
                                        id={`gamearray-date-${index}`}
                                        name={subField.name}
                                        value={
                                          subField.state
                                            .value
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

                                      <InputGroupAddon align="inline-end">
                                        <InputGroupButton
                                          type="button"
                                          variant="ghost"
                                          onClick={() =>
                                            subField.setValue(
                                              currDate,
                                            )
                                          }
                                          aria-label="Lägg till dagens datum"
                                        >
                                          Idag
                                        </InputGroupButton>
                                        <InputGroupButton
                                          type="button"
                                          variant="ghost"
                                          onClick={() =>
                                            field.removeValue(
                                              index,
                                            )
                                          }
                                          aria-label={`Ta bort ${index}`}
                                        >
                                          <XIcon />
                                        </InputGroupButton>
                                      </InputGroupAddon>
                                    </InputGroup>
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

export default BulkGames
