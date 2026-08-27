import { Button } from '@/components/base/ui/button'
import { Checkbox } from '@/components/base/ui/checkbox'
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/base/ui/input-group'
import { getRouteApi } from '@tanstack/react-router'
import { useInlineEditGameArrayForm } from '../../-hooks/useInlineEditGameArrayForm'

const route = getRouteApi('/_layout/dashboard/games/$today')

const currDate = new Date().toLocaleDateString('se-SV', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

const GamesList = () => {
  const games = route.useLoaderData()
  const form = useInlineEditGameArrayForm()

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-end gap-2">
        <Button
          type="submit"
          form="edit-game-result"
        >
          Skicka
        </Button>
      </div>
      <div>
        <form
          id="edit-game-result"
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
                  <FieldSet className="gap-5">
                    <FieldLegend
                      variant="label"
                      className="w-full"
                    >
                      <div className="grid grid-cols-8 gap-6 items-center w-full">
                        <span className="w-70">Match</span>
                        <span>Resultat</span>
                        <span>Halvtidsresultat</span>
                        <span>Datum</span>
                        <span>Övertid</span>
                        <span>Straffar</span>
                        <span>Övertidsresultat</span>
                        <span className="invisible">
                          Fält
                        </span>
                      </div>
                    </FieldLegend>
                    <FieldGroup className="gap-4">
                      {field.state.value.map(
                        (game, index) => {
                          const gameObject = games.find(
                            (g) => g.gameId === game.gameId,
                          )
                          return (
                            <div
                              key={`div-${index}`}
                              className="grid grid-cols-8 gap-6 items-center"
                            >
                              <span className="text-xs w-70">
                                {`${game.date}: ${gameObject?.home.casualName} - ${gameObject?.away.casualName}`}
                              </span>
                              <form.Field
                                name={`gameArray[${index}].result`}
                                children={(subField) => {
                                  const isSubFieldInvalid =
                                    subField.state.meta
                                      .isTouched &&
                                    !subField.state.meta
                                      .isValid
                                  return (
                                    <Field
                                      orientation="horizontal"
                                      data-invalid={
                                        isSubFieldInvalid
                                      }
                                      className="flex flex-col"
                                    >
                                      <FieldContent>
                                        <Input
                                          id={subField.name}
                                          name={
                                            subField.name
                                          }
                                          value={
                                            subField.state
                                              .value
                                          }
                                          onBlur={
                                            subField.handleBlur
                                          }
                                          onChange={(e) =>
                                            subField.handleChange(
                                              e.target
                                                .value,
                                            )
                                          }
                                          aria-invalid={
                                            isInvalid
                                          }
                                          placeholder="Slutresultat"
                                          autoComplete="off"
                                        />
                                      </FieldContent>
                                      {isSubFieldInvalid && (
                                        <FieldError
                                          errors={
                                            subField.state
                                              .meta.errors
                                          }
                                        />
                                      )}
                                    </Field>
                                  )
                                }}
                              />
                              <form.Field
                                name={`gameArray[${index}].halftimeResult`}
                                children={(subField) => {
                                  const isSubFieldInvalid =
                                    subField.state.meta
                                      .isTouched &&
                                    !subField.state.meta
                                      .isValid
                                  return (
                                    <Field
                                      orientation="horizontal"
                                      data-invalid={
                                        isSubFieldInvalid
                                      }
                                      className="flex flex-col"
                                    >
                                      <FieldContent>
                                        <Input
                                          id={subField.name}
                                          name={
                                            subField.name
                                          }
                                          value={
                                            subField.state
                                              .value
                                          }
                                          onBlur={
                                            subField.handleBlur
                                          }
                                          onChange={(e) =>
                                            subField.handleChange(
                                              e.target
                                                .value,
                                            )
                                          }
                                          aria-invalid={
                                            isInvalid
                                          }
                                          placeholder="Halvtidsresultat"
                                          autoComplete="off"
                                        />
                                      </FieldContent>
                                      {isSubFieldInvalid && (
                                        <FieldError
                                          errors={
                                            subField.state
                                              .meta.errors
                                          }
                                        />
                                      )}
                                    </Field>
                                  )
                                }}
                              />
                              <form.Field
                                name={`gameArray[${index}].date`}
                                children={(subField) => {
                                  const isSubFieldInvalid =
                                    subField.state.meta
                                      .isTouched &&
                                    !subField.state.meta
                                      .isValid
                                  return (
                                    <Field
                                      orientation="horizontal"
                                      data-invalid={
                                        isSubFieldInvalid
                                      }
                                      className="flex flex-col"
                                    >
                                      <FieldContent>
                                        <InputGroup>
                                          <InputGroupInput
                                            id={
                                              subField.name
                                            }
                                            name={
                                              subField.name
                                            }
                                            value={
                                              subField.state
                                                .value
                                            }
                                            onBlur={
                                              subField.handleBlur
                                            }
                                            onChange={(e) =>
                                              subField.handleChange(
                                                e.target
                                                  .value,
                                              )
                                            }
                                            placeholder="Datum"
                                            aria-invalid={
                                              isInvalid
                                            }
                                          />
                                          <InputGroupAddon align="inline-end">
                                            <InputGroupButton
                                              variant="secondary"
                                              onClick={() =>
                                                subField.setValue(
                                                  currDate,
                                                )
                                              }
                                            >
                                              Idag
                                            </InputGroupButton>
                                          </InputGroupAddon>
                                        </InputGroup>
                                      </FieldContent>
                                      {isSubFieldInvalid && (
                                        <FieldError
                                          errors={
                                            subField.state
                                              .meta.errors
                                          }
                                        />
                                      )}
                                    </Field>
                                  )
                                }}
                              />
                              <form.Field
                                name={`gameArray[${index}].extraTime`}
                                children={(subField) => {
                                  const isSubFieldInvalid =
                                    subField.state.meta
                                      .isTouched &&
                                    !subField.state.meta
                                      .isValid
                                  return (
                                    <Field
                                      orientation="horizontal"
                                      data-invalid={
                                        isSubFieldInvalid
                                      }
                                      className="flex flex-col"
                                    >
                                      <FieldContent>
                                        <FieldSet>
                                          <FieldGroup data-slot="checkbox-group">
                                            <Field
                                              orientation="horizontal"
                                              data-invalid={
                                                isSubFieldInvalid
                                              }
                                            >
                                              <FieldLabel
                                                htmlFor={
                                                  subField.name
                                                }
                                                className="font-normal"
                                              >
                                                Övertid
                                              </FieldLabel>
                                              <Checkbox
                                                id={
                                                  subField.name
                                                }
                                                name={
                                                  subField.name
                                                }
                                                checked={
                                                  subField
                                                    .state
                                                    .value
                                                }
                                                onCheckedChange={(
                                                  checked,
                                                ) =>
                                                  subField.handleChange(
                                                    checked ===
                                                      true,
                                                  )
                                                }
                                              />
                                            </Field>
                                          </FieldGroup>
                                        </FieldSet>
                                      </FieldContent>
                                      {isSubFieldInvalid && (
                                        <FieldError
                                          errors={
                                            subField.state
                                              .meta.errors
                                          }
                                        />
                                      )}
                                    </Field>
                                  )
                                }}
                              />
                              <form.Field
                                name={`gameArray[${index}].penalties`}
                                children={(subField) => {
                                  const isSubFieldInvalid =
                                    subField.state.meta
                                      .isTouched &&
                                    !subField.state.meta
                                      .isValid
                                  return (
                                    <Field
                                      orientation="horizontal"
                                      data-invalid={
                                        isSubFieldInvalid
                                      }
                                      className="flex flex-col"
                                    >
                                      <FieldContent>
                                        <FieldSet>
                                          <FieldGroup data-slot="checkbox-group">
                                            <Field
                                              orientation="horizontal"
                                              data-invalid={
                                                isSubFieldInvalid
                                              }
                                            >
                                              <FieldLabel
                                                htmlFor={
                                                  subField.name
                                                }
                                                className="font-normal"
                                              >
                                                Straffar
                                              </FieldLabel>
                                              <Checkbox
                                                id={
                                                  subField.name
                                                }
                                                name={
                                                  subField.name
                                                }
                                                checked={
                                                  subField
                                                    .state
                                                    .value
                                                }
                                                onCheckedChange={(
                                                  checked,
                                                ) =>
                                                  subField.handleChange(
                                                    checked ===
                                                      true,
                                                  )
                                                }
                                              />
                                            </Field>
                                          </FieldGroup>
                                        </FieldSet>
                                      </FieldContent>
                                      {isSubFieldInvalid && (
                                        <FieldError
                                          errors={
                                            subField.state
                                              .meta.errors
                                          }
                                        />
                                      )}
                                    </Field>
                                  )
                                }}
                              />
                              <form.Field
                                name={`gameArray[${index}].otResult`}
                                children={(subField) => {
                                  const isSubFieldInvalid =
                                    subField.state.meta
                                      .isTouched &&
                                    !subField.state.meta
                                      .isValid
                                  return (
                                    <Field
                                      orientation="horizontal"
                                      data-invalid={
                                        isSubFieldInvalid
                                      }
                                      className="flex flex-col"
                                    >
                                      <FieldContent>
                                        <Input
                                          id={subField.name}
                                          name={
                                            subField.name
                                          }
                                          value={
                                            subField.state
                                              .value
                                          }
                                          onBlur={
                                            subField.handleBlur
                                          }
                                          onChange={(e) =>
                                            subField.handleChange(
                                              e.target
                                                .value,
                                            )
                                          }
                                          aria-invalid={
                                            isInvalid
                                          }
                                          placeholder="Övertidsresultat"
                                          autoComplete="off"
                                        />
                                      </FieldContent>
                                      {isSubFieldInvalid && (
                                        <FieldError
                                          errors={
                                            subField.state
                                              .meta.errors
                                          }
                                        />
                                      )}
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
                        },
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
    </div>
  )
}

export default GamesList
