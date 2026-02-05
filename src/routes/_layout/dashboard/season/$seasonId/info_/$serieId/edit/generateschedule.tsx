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
import { generateSchedule } from '@/routes/_layout/dashboard/-functions/GameFunctions.ts/generateSchedule'
import { useGeneratedScheduleForm } from '@/routes/_layout/dashboard/-hooks/useGeneratedScheduleForm'
import { createFileRoute } from '@tanstack/react-router'
import { XIcon } from 'lucide-react'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/info_/$serieId/edit/generateschedule',
)({
  loader: async ({ params: { serieId } }) => {
    const games = await generateSchedule({ data: { serieId } })
    if (!games) throw new Error('Missing games')
    return games
  },
  component: RouteComponent,
})

const currDate = new Date().toLocaleDateString('se-SV', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

function RouteComponent() {
  const games = Route.useLoaderData({ select: (s) => s.games })

  const form = useGeneratedScheduleForm()

  if (games.length === 0)
    return (
      <div className="mb-4 flex flex-row justify-center gap-6">
        Inga matcher genererade, kanske finns alla matcher redan inlagda?
      </div>
    )

  return (
    <div className="flex min-h-100 flex-col gap-2 p-2">
      <div className="flex flex-row justify-end gap-2">
        <Button type="submit" form="generatedScheduleForm">
          Skicka
        </Button>
      </div>
      <form
        id="generatedScheduleForm"
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
                                {game.homeName} - {game.awayName}
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
