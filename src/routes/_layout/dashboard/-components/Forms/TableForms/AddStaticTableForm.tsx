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

import CustomNumberInput from '@/components/Common/CustomNumberInput'
import { addStaticTableForm } from '../../../-hooks/addStaticTableForm'

const AddStaticTableForm = () => {
  const form = addStaticTableForm()

  return (
    <div className="flex min-h-100 flex-col gap-2 p-2">
      <div className="flex flex-row justify-end gap-2">
        <Button
          type="submit"
          form="staticTableForm"
        >
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
          <form.Field
            name="tableArray"
            mode="array"
          >
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                !field.state.meta.isValid
              return (
                <FieldSet className="gap-5">
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
                    {field.state.value.map(
                      (team, index) => (
                        <div
                          key={`div-${index}`}
                          className="grid grid-cols-10 gap-2"
                        >
                          <FieldLabel
                            htmlFor={`tableArray[${index}].position`}
                            className="max-w-40 text-base"
                          >
                            {team.teamName}
                          </FieldLabel>
                          <form.Field
                            key={`tablearray-position-${index}`}
                            name={`tableArray[${index}].position`}
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
                                    <div className="w-24">
                                      <CustomNumberInput
                                        id={`tablearray-position-${index}`}
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
                                            e.target
                                              .valueAsNumber,
                                          )
                                        }
                                        aria-invalid={
                                          isSubFieldInvalid
                                        }
                                        placeholder="Position"
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
                                    <div className="w-24">
                                      <CustomNumberInput
                                        id={`tablearray-games-${index}`}
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
                                            e.target
                                              .valueAsNumber,
                                          )
                                        }
                                        aria-invalid={
                                          isSubFieldInvalid
                                        }
                                        placeholder="Matcher"
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
                                    <div className="w-24">
                                      <CustomNumberInput
                                        id={`tablearray-won-${index}`}
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
                                            e.target
                                              .valueAsNumber,
                                          )
                                        }
                                        aria-invalid={
                                          isSubFieldInvalid
                                        }
                                        placeholder="Vinster"
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
                                    <div className="w-24">
                                      <CustomNumberInput
                                        id={`tablearray-draw-${index}`}
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
                                            e.target
                                              .valueAsNumber,
                                          )
                                        }
                                        aria-invalid={
                                          isSubFieldInvalid
                                        }
                                        placeholder="Oavgjort"
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
                                    <div className="w-24">
                                      <CustomNumberInput
                                        id={`tablearray-lost-${index}`}
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
                                            e.target
                                              .valueAsNumber,
                                          )
                                        }
                                        aria-invalid={
                                          isSubFieldInvalid
                                        }
                                        placeholder="Förluster"
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
                                    <div className="w-24">
                                      <CustomNumberInput
                                        id={`tablearray-scoredGoals-${index}`}
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
                                            e.target
                                              .valueAsNumber,
                                          )
                                        }
                                        aria-invalid={
                                          isSubFieldInvalid
                                        }
                                        placeholder="Gjorda mål"
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
                                    <div className="w-24">
                                      <CustomNumberInput
                                        id={`tablearray-concededGoals-${index}`}
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
                                            e.target
                                              .valueAsNumber,
                                          )
                                        }
                                        aria-invalid={
                                          isSubFieldInvalid
                                        }
                                        placeholder="Insläppta mål"
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
                                    <div className="w-24">
                                      <CustomNumberInput
                                        id={`tablearray-goalDifference-${index}`}
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
                                            e.target
                                              .valueAsNumber,
                                          )
                                        }
                                        aria-invalid={
                                          isSubFieldInvalid
                                        }
                                        placeholder="Målskillnad"
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
                                    <div className="w-24">
                                      <CustomNumberInput
                                        id={`tablearray-points-${index}`}
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
                                            e.target
                                              .valueAsNumber,
                                          )
                                        }
                                        aria-invalid={
                                          isSubFieldInvalid
                                        }
                                        placeholder="Poäng"
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
                                    </div>
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

export default AddStaticTableForm
