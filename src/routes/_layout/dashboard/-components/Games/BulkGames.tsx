import { Button } from '@/components/ui/button'
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import { getRouteApi } from '@tanstack/react-router'

import { BulkGameFileParser } from '@/lib/types/game'
import { XIcon } from 'lucide-react'
import { useBulkGameForm } from '../../-hooks/useBulkGameForm'

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/info_/$serieId/edit',
)

const currDate = new Date().toLocaleDateString('se-SV', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

const BulkGames = ({ gameData }: { gameData: BulkGameFileParser }) => {
  const teams = route.useLoaderData({ select: (s) => s.teamsInSerie })

  const form = useBulkGameForm({ gameData })

  return (
    <div className="flex min-h-100 flex-col gap-2 p-2">
      <div className="flex flex-row justify-end gap-2">
        <Button type="submit" form="bulkGameForm">
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
          <form.Field name="gameArray" mode="array">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <FieldSet className="w-240 gap-4">
                  <FieldLegend variant="label">Matcher</FieldLegend>
                  <FieldGroup className="gap-4">
                    {field.state.value.map((game, index) => (
                      <form.Field
                        key={index}
                        name={`gameArray[${index}].date`}
                        children={(subField) => {
                          const isSubFieldInvalid =
                            subField.state.meta.isTouched &&
                            !subField.state.meta.isValid

                          const homeTeamName = teams.find(
                            (team) => team.teamId === game.homeTeamId,
                          )?.team.name
                          const awayTeamName = teams.find(
                            (team) => team.teamId === game.awayTeamId,
                          )?.team.name
                          return (
                            <Field
                              orientation="horizontal"
                              data-invalid={isSubFieldInvalid}
                              className="flex flex-row items-center justify-start"
                            >
                              <FieldLabel
                                htmlFor={`gamearray-date-${index}`}
                                className="w-20"
                              >
                                {homeTeamName ?? 'Namn saknas'} -{' '}
                                {awayTeamName ?? 'Namn saknas'}
                              </FieldLabel>
                              <FieldContent>
                                <InputGroup className="w-60">
                                  <InputGroupInput
                                    id={`gamearray-date-${index}`}
                                    name={subField.name}
                                    value={subField.state.value}
                                    onBlur={subField.handleBlur}
                                    onChange={(e) =>
                                      subField.handleChange(e.target.value)
                                    }
                                    aria-invalid={isSubFieldInvalid}
                                    placeholder="T.ex. 2025-12-26"
                                    type="text"
                                  />

                                  <InputGroupAddon align="inline-end">
                                    <InputGroupButton
                                      type="button"
                                      variant="ghost"
                                      onClick={() =>
                                        subField.setValue(currDate)
                                      }
                                      aria-label="Lägg till dagens datum"
                                    >
                                      Idag
                                    </InputGroupButton>
                                    <InputGroupButton
                                      type="button"
                                      variant="ghost"
                                      onClick={() => field.removeValue(index)}
                                      aria-label={`Ta bort ${index}`}
                                    >
                                      <XIcon />
                                    </InputGroupButton>
                                  </InputGroupAddon>
                                </InputGroup>
                                {isSubFieldInvalid && (
                                  <FieldError
                                    errors={subField.state.meta.errors}
                                  />
                                )}
                              </FieldContent>
                            </Field>
                          )
                        }}
                      />
                    ))}
                  </FieldGroup>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
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
