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
  InputGroupInput,
} from '@/components/ui/input-group'
import { getRouteApi } from '@tanstack/react-router'
import { addStaticTableForm } from '../../../-hooks/addStaticTableForm'
const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/info_/$serieId/edit/addTable',
)

const AddStaticTableForm = () => {
  const data = route.useLoaderData()
  const form = addStaticTableForm()

  if (data.status === 400 || data.status === 404) {
    return (
      <div className="mt-4 flex flex-row justify-center">
        <span className="text-base">{data.message}</span>
      </div>
    )
  }

  return (
    <div className="flex min-h-100 flex-col gap-2 p-2">
      <div className="flex flex-row justify-end gap-2">
        <Button type="submit" form="staticTableForm">
          Skicka
        </Button>
      </div>
      <form
        id="staticTableForm"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <FieldGroup>
          <form.Field name="tableArray" mode="array">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <FieldSet className="gap-4">
                  <FieldLegend variant="label">
                    <div className="grid grid-cols-10">
                      <span className="w-40">Lag</span>
                      <span>Position</span>
                      <span>Matcher</span>
                      <span>Vinst</span>
                      <span>Oavgjort</span>
                      <span>Förlust</span>
                      <span>Gjorda mål</span>
                      <span>Insläppta mål</span>
                      <span>Målskillnad</span>
                      <span>Poäng</span>
                    </div>
                  </FieldLegend>
                  <FieldGroup className="gap-4">
                    {field.state.value.map((team, index) => (
                      <div
                        key={`div-${index}`}
                        className="grid grid-cols-10 gap-2"
                      >
                        <FieldLabel
                          htmlFor={`tablearray-label-${index}`}
                          className="max-w-40"
                        >
                          {team.teamName}
                        </FieldLabel>
                        <form.Field
                          key={`tablearray-position-${index}`}
                          name={`tableArray[${index}].position`}
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
                                <FieldContent>
                                  <div className="w-24">
                                    <InputGroup>
                                      <InputGroupInput
                                        id={`tablearray-position-${index}`}
                                        name={subField.name}
                                        value={subField.state.value}
                                        onBlur={subField.handleBlur}
                                        onChange={(e) =>
                                          subField.handleChange(
                                            e.target.valueAsNumber,
                                          )
                                        }
                                        aria-invalid={isSubFieldInvalid}
                                        placeholder="Position"
                                        type="number"
                                        className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                      />
                                      <InputGroupAddon align="inline-end">
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          onClick={() =>
                                            subField.setValue(
                                              subField.state.value - 1,
                                            )
                                          }
                                        >
                                          -
                                        </Button>
                                      </InputGroupAddon>
                                      <InputGroupAddon align="inline-end">
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          onClick={() =>
                                            subField.setValue(
                                              subField.state.value + 1,
                                            )
                                          }
                                        >
                                          +
                                        </Button>
                                      </InputGroupAddon>
                                      {isSubFieldInvalid && (
                                        <FieldError
                                          errors={subField.state.meta.errors}
                                        />
                                      )}
                                    </InputGroup>
                                  </div>
                                </FieldContent>
                              </Field>
                            )
                          }}
                        />

                        <form.Field
                          key={`tablearray-games-${index}`}
                          name={`tableArray[${index}].games`}
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
                                <FieldContent>
                                  <div className="w-24">
                                    <InputGroup>
                                      <InputGroupInput
                                        id={`tablearray-games-${index}`}
                                        name={subField.name}
                                        value={subField.state.value}
                                        onBlur={subField.handleBlur}
                                        onChange={(e) =>
                                          subField.handleChange(
                                            e.target.valueAsNumber,
                                          )
                                        }
                                        aria-invalid={isSubFieldInvalid}
                                        placeholder="Matcher"
                                        type="number"
                                        className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                      />
                                      <InputGroupAddon align="inline-end">
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          onClick={() =>
                                            subField.setValue(
                                              subField.state.value - 1,
                                            )
                                          }
                                        >
                                          -
                                        </Button>
                                      </InputGroupAddon>
                                      <InputGroupAddon align="inline-end">
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          onClick={() =>
                                            subField.setValue(
                                              subField.state.value + 1,
                                            )
                                          }
                                        >
                                          +
                                        </Button>
                                      </InputGroupAddon>
                                      {isSubFieldInvalid && (
                                        <FieldError
                                          errors={subField.state.meta.errors}
                                        />
                                      )}
                                    </InputGroup>
                                  </div>
                                </FieldContent>
                              </Field>
                            )
                          }}
                        />
                        <form.Field
                          key={`tablearray-won-${index}`}
                          name={`tableArray[${index}].won`}
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
                                <FieldContent>
                                  <div className="w-24">
                                    <InputGroup>
                                      <InputGroupInput
                                        id={`tablearray-won-${index}`}
                                        name={subField.name}
                                        value={subField.state.value}
                                        onBlur={subField.handleBlur}
                                        onChange={(e) =>
                                          subField.handleChange(
                                            e.target.valueAsNumber,
                                          )
                                        }
                                        aria-invalid={isSubFieldInvalid}
                                        placeholder="Vinster"
                                        type="number"
                                        className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                      />
                                      <InputGroupAddon align="inline-end">
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          onClick={() =>
                                            subField.setValue(
                                              subField.state.value - 1,
                                            )
                                          }
                                        >
                                          -
                                        </Button>
                                      </InputGroupAddon>
                                      <InputGroupAddon align="inline-end">
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          onClick={() =>
                                            subField.setValue(
                                              subField.state.value + 1,
                                            )
                                          }
                                        >
                                          +
                                        </Button>
                                      </InputGroupAddon>
                                      {isSubFieldInvalid && (
                                        <FieldError
                                          errors={subField.state.meta.errors}
                                        />
                                      )}
                                    </InputGroup>
                                  </div>
                                </FieldContent>
                              </Field>
                            )
                          }}
                        />
                        <form.Field
                          key={`tablearray-draw-${index}`}
                          name={`tableArray[${index}].draw`}
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
                                <FieldContent>
                                  <div className="w-24">
                                    <InputGroup>
                                      <InputGroupInput
                                        id={`tablearray-draw-${index}`}
                                        name={subField.name}
                                        value={subField.state.value}
                                        onBlur={subField.handleBlur}
                                        onChange={(e) =>
                                          subField.handleChange(
                                            e.target.valueAsNumber,
                                          )
                                        }
                                        aria-invalid={isSubFieldInvalid}
                                        placeholder="Oavgjort"
                                        type="number"
                                        className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                      />
                                      <InputGroupAddon align="inline-end">
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          onClick={() =>
                                            subField.setValue(
                                              subField.state.value - 1,
                                            )
                                          }
                                        >
                                          -
                                        </Button>
                                      </InputGroupAddon>
                                      <InputGroupAddon align="inline-end">
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          onClick={() =>
                                            subField.setValue(
                                              subField.state.value + 1,
                                            )
                                          }
                                        >
                                          +
                                        </Button>
                                      </InputGroupAddon>
                                      {isSubFieldInvalid && (
                                        <FieldError
                                          errors={subField.state.meta.errors}
                                        />
                                      )}
                                    </InputGroup>
                                  </div>
                                </FieldContent>
                              </Field>
                            )
                          }}
                        />
                        <form.Field
                          key={`tablearray-lost-${index}`}
                          name={`tableArray[${index}].lost`}
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
                                <FieldContent>
                                  <div className="w-24">
                                    <InputGroup>
                                      <InputGroupInput
                                        id={`tablearray-lost-${index}`}
                                        name={subField.name}
                                        value={subField.state.value}
                                        onBlur={subField.handleBlur}
                                        onChange={(e) =>
                                          subField.handleChange(
                                            e.target.valueAsNumber,
                                          )
                                        }
                                        aria-invalid={isSubFieldInvalid}
                                        placeholder="Förlust"
                                        type="number"
                                        className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                      />
                                      <InputGroupAddon align="inline-end">
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          onClick={() =>
                                            subField.setValue(
                                              subField.state.value - 1,
                                            )
                                          }
                                        >
                                          -
                                        </Button>
                                      </InputGroupAddon>
                                      <InputGroupAddon align="inline-end">
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          onClick={() =>
                                            subField.setValue(
                                              subField.state.value + 1,
                                            )
                                          }
                                        >
                                          +
                                        </Button>
                                      </InputGroupAddon>
                                      {isSubFieldInvalid && (
                                        <FieldError
                                          errors={subField.state.meta.errors}
                                        />
                                      )}
                                    </InputGroup>
                                  </div>
                                </FieldContent>
                              </Field>
                            )
                          }}
                        />
                        <form.Field
                          key={`tablearray-scoredGoals-${index}`}
                          name={`tableArray[${index}].scoredGoals`}
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
                                <FieldContent>
                                  <div className="w-24">
                                    <InputGroup>
                                      <InputGroupInput
                                        id={`tablearray-scoredGoals-${index}`}
                                        name={subField.name}
                                        value={subField.state.value}
                                        onBlur={subField.handleBlur}
                                        onChange={(e) =>
                                          subField.handleChange(
                                            e.target.valueAsNumber,
                                          )
                                        }
                                        aria-invalid={isSubFieldInvalid}
                                        placeholder="Gjorda mål"
                                        type="number"
                                        className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                      />
                                      <InputGroupAddon align="inline-end">
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          onClick={() =>
                                            subField.setValue(
                                              subField.state.value - 1,
                                            )
                                          }
                                        >
                                          -
                                        </Button>
                                      </InputGroupAddon>
                                      <InputGroupAddon align="inline-end">
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          onClick={() =>
                                            subField.setValue(
                                              subField.state.value + 1,
                                            )
                                          }
                                        >
                                          +
                                        </Button>
                                      </InputGroupAddon>
                                      {isSubFieldInvalid && (
                                        <FieldError
                                          errors={subField.state.meta.errors}
                                        />
                                      )}
                                    </InputGroup>
                                  </div>
                                </FieldContent>
                              </Field>
                            )
                          }}
                        />
                        <form.Field
                          key={`tablearray-concededGoals-${index}`}
                          name={`tableArray[${index}].concededGoals`}
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
                                <FieldContent>
                                  <div className="w-24">
                                    <InputGroup>
                                      <InputGroupInput
                                        id={`tablearray-concededGoals-${index}`}
                                        name={subField.name}
                                        value={subField.state.value}
                                        onBlur={subField.handleBlur}
                                        onChange={(e) =>
                                          subField.handleChange(
                                            e.target.valueAsNumber,
                                          )
                                        }
                                        aria-invalid={isSubFieldInvalid}
                                        placeholder="Insläppta mål"
                                        type="number"
                                        className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                      />
                                      <InputGroupAddon align="inline-end">
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          onClick={() =>
                                            subField.setValue(
                                              subField.state.value - 1,
                                            )
                                          }
                                        >
                                          -
                                        </Button>
                                      </InputGroupAddon>
                                      <InputGroupAddon align="inline-end">
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          onClick={() =>
                                            subField.setValue(
                                              subField.state.value + 1,
                                            )
                                          }
                                        >
                                          +
                                        </Button>
                                      </InputGroupAddon>
                                      {isSubFieldInvalid && (
                                        <FieldError
                                          errors={subField.state.meta.errors}
                                        />
                                      )}
                                    </InputGroup>
                                  </div>
                                </FieldContent>
                              </Field>
                            )
                          }}
                        />
                        <form.Field
                          key={`tablearray-goalDifference-${index}`}
                          name={`tableArray[${index}].goalDifference`}
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
                                <FieldContent>
                                  <div className="w-24">
                                    <InputGroup>
                                      <InputGroupInput
                                        id={`tablearray-goalDifference-${index}`}
                                        name={subField.name}
                                        value={subField.state.value}
                                        onBlur={subField.handleBlur}
                                        onChange={(e) =>
                                          subField.handleChange(
                                            e.target.valueAsNumber,
                                          )
                                        }
                                        aria-invalid={isSubFieldInvalid}
                                        placeholder="Målskillnad"
                                        type="number"
                                        className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                      />
                                      <InputGroupAddon align="inline-end">
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          onClick={() =>
                                            subField.setValue(
                                              subField.state.value - 1,
                                            )
                                          }
                                        >
                                          -
                                        </Button>
                                      </InputGroupAddon>
                                      <InputGroupAddon align="inline-end">
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          onClick={() =>
                                            subField.setValue(
                                              subField.state.value + 1,
                                            )
                                          }
                                        >
                                          +
                                        </Button>
                                      </InputGroupAddon>
                                      {isSubFieldInvalid && (
                                        <FieldError
                                          errors={subField.state.meta.errors}
                                        />
                                      )}
                                    </InputGroup>
                                  </div>
                                </FieldContent>
                              </Field>
                            )
                          }}
                        />
                        <form.Field
                          key={`tablearray-points-${index}`}
                          name={`tableArray[${index}].points`}
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
                                <FieldContent>
                                  <div className="w-24">
                                    <InputGroup>
                                      <InputGroupInput
                                        id={`tablearray-points-${index}`}
                                        name={subField.name}
                                        value={subField.state.value}
                                        onBlur={subField.handleBlur}
                                        onChange={(e) =>
                                          subField.handleChange(
                                            e.target.valueAsNumber,
                                          )
                                        }
                                        aria-invalid={isSubFieldInvalid}
                                        placeholder="Poäng"
                                        type="number"
                                        className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                      />
                                      <InputGroupAddon align="inline-end">
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          onClick={() =>
                                            subField.setValue(
                                              subField.state.value - 1,
                                            )
                                          }
                                        >
                                          -
                                        </Button>
                                      </InputGroupAddon>
                                      <InputGroupAddon align="inline-end">
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          onClick={() =>
                                            subField.setValue(
                                              subField.state.value + 1,
                                            )
                                          }
                                        >
                                          +
                                        </Button>
                                      </InputGroupAddon>
                                      {isSubFieldInvalid && (
                                        <FieldError
                                          errors={subField.state.meta.errors}
                                        />
                                      )}
                                    </InputGroup>
                                  </div>
                                </FieldContent>
                              </Field>
                            )
                          }}
                        />
                      </div>
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

export default AddStaticTableForm
