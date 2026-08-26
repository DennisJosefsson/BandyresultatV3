import { Button } from '@/components/base/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/base/ui/card'
import { Checkbox } from '@/components/base/ui/checkbox'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/base/ui/field'
import { Input } from '@/components/base/ui/input'
import { Textarea } from '@/components/base/ui/textarea'
import RadioBadges from '@/components/Common/RadioBadge'
import type { newCupSeriesObject } from '@/lib/types/serie'
import type { zd } from '@/lib/utils/zod'
import { getRouteApi } from '@tanstack/react-router'
import { useEditCupSerieForm } from '../../../-hooks/useEditCupSerie'

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/info_/serie/$serieId/edit',
)

const serieStructureArray = Array.from(
  { length: 16 },
  (_, index) => index + 1,
).map((_, index) => {
  return { value: index + 1, label: `${index + 1}` }
})

type CupCategoryArray = {
  value: zd.infer<typeof newCupSeriesObject>['category']
  label: string
}

const categoryArray: Array<CupCategoryArray> = [
  { value: 'cup-qualification', label: 'Kval' },
  { value: 'cup-regular', label: 'Grundserie' },
  { value: 'cup-playoffseries', label: 'Slutspelsserie' },
  { value: 'cup-eight', label: 'Åttondelsfinal' },
  { value: 'cup-quarter', label: 'Kvartsfinal' },
  { value: 'cup-semi', label: 'Semifinal' },
  { value: 'cup-bronze', label: 'Bronsmatch' },
  { value: 'cup-final', label: 'Final' },
]

type CategoryValues = Record<string, number>

const categoryValues: CategoryValues = {
  'cup-qualification': 1090,
  'cup-regular': 1050,
  'cup-playoffseries': 1040,
  'cup-eight': 1030,
  'cup-quarter': 1020,
  'cup-semi': 1010,
  'cup-bronze': 1005,
  'cup-final': 1000,
}

const EditCupSerie = () => {
  const seasonId = route.useParams({
    select: (s) => s.seasonId,
  })
  const competitionArray = route
    .useLoaderData({ select: (s) => s.competitions })
    .map((c) => {
      return {
        value: c.competitionId.toString(),
        label: c.competitionName,
      }
    })
  const women = route.useSearch({ select: (s) => s.women })
  const form = useEditCupSerieForm()

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Ändra serie</CardTitle>
          </div>
          <div className="flex flex-row gap-2">
            <Button
              render={
                <route.Link
                  to="/dashboard/season/$seasonId"
                  params={{ seasonId }}
                  search={{ women }}
                >
                  Tillbaka
                </route.Link>
              }
              nativeButton={false}
            />

            <Button
              type="submit"
              form="editSerieForm"
            >
              Skicka
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form
          id="editSerieForm"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <div className="grid grid-cols-3 items-center gap-4">
              <form.Field
                name="serieName"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Serienamn
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(e.target.value)
                        }
                        aria-invalid={isInvalid}
                        placeholder="T.ex. Elitserien"
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors}
                        />
                      )}
                    </Field>
                  )
                }}
              />
              <form.Field
                name="group"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Grupp
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(e.target.value)
                        }
                        aria-invalid={isInvalid}
                        placeholder="T.ex. Div1Norr"
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors}
                        />
                      )}
                    </Field>
                  )
                }}
              />

              <form.Field
                name="level"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Level
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(
                            Number(e.target.value),
                          )
                        }
                        aria-invalid={isInvalid}
                        placeholder="T.ex. 100"
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors}
                        />
                      )}
                    </Field>
                  )
                }}
              />
            </div>
            <div>
              <form.Field
                name="category"
                listeners={{
                  onChange: ({ value }) => {
                    if (
                      categoryValues[value] === undefined
                    ) {
                      form.setFieldValue('level', 1050)
                    } else {
                      form.setFieldValue(
                        'level',
                        categoryValues[value],
                      )
                    }
                    if (value === 'cup-final') {
                      form.setFieldValue(
                        'group',
                        'cup-final',
                      )
                      form.setFieldValue(
                        'serieName',
                        'Final',
                      )
                    }
                  },
                }}
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLegend variant="label">
                        Kategori
                      </FieldLegend>
                      <FieldGroup>
                        <div>
                          <RadioBadges
                            array={categoryArray}
                            orientation="horizontal"
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onValueChange={(value) =>
                              field.setValue(value)
                            }
                            aria-invalid={isInvalid}
                            className="flex flex-row gap-2"
                          />
                        </div>
                      </FieldGroup>
                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors}
                        />
                      )}
                    </Field>
                  )
                }}
              />
            </div>

            <form.Field
              name="serieStructure"
              mode="array"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  !field.state.meta.isValid
                return (
                  <FieldSet>
                    <FieldLegend variant="label">
                      Seriestruktur
                    </FieldLegend>

                    <FieldGroup data-slot="checkbox-group">
                      <div className="grid grid-cols-8 gap-x-2 gap-y-4">
                        {serieStructureArray.map((item) => (
                          <Field
                            key={item.label}
                            orientation="horizontal"
                            data-invalid={isInvalid}
                          >
                            <Checkbox
                              id={`serieStructure-${item.value}`}
                              name={field.name}
                              aria-invalid={isInvalid}
                              checked={
                                field.state.value &&
                                field.state.value.includes(
                                  item.value,
                                )
                              }
                              onCheckedChange={(
                                checked,
                              ) => {
                                if (checked) {
                                  field.pushValue(
                                    item.value,
                                  )
                                } else {
                                  const index =
                                    field.state.value &&
                                    field.state.value.indexOf(
                                      item.value,
                                    )
                                  if (index && index > -1) {
                                    field.removeValue(index)
                                  }
                                }
                              }}
                            />
                            <FieldLabel
                              htmlFor={`serieStructure-${item.value}`}
                              className="font-normal"
                            >
                              {item.label}
                            </FieldLabel>
                          </Field>
                        ))}
                      </div>
                    </FieldGroup>
                    {isInvalid && (
                      <FieldError
                        errors={field.state.meta.errors}
                      />
                    )}
                  </FieldSet>
                )
              }}
            />
            <div className="grid grid-cols-5 gap-2">
              <form.Field
                name="hasMix"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <Field
                        orientation="horizontal"
                        data-invalid={isInvalid}
                      >
                        <Checkbox
                          id={field.name}
                          name={field.name}
                          checked={field.state.value}
                          onCheckedChange={(checked) =>
                            field.handleChange(
                              checked === true,
                            )
                          }
                        />
                        <FieldLabel
                          htmlFor={field.name}
                          className="font-normal"
                        >
                          hasMix
                        </FieldLabel>
                      </Field>
                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors}
                        />
                      )}
                    </Field>
                  )
                }}
              />
              <form.Field
                name="hasStatic"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <Field
                        orientation="horizontal"
                        data-invalid={isInvalid}
                      >
                        <Checkbox
                          id={field.name}
                          name={field.name}
                          checked={field.state.value}
                          onCheckedChange={(checked) =>
                            field.handleChange(
                              checked === true,
                            )
                          }
                        />
                        <FieldLabel
                          htmlFor={field.name}
                          className="font-normal"
                        >
                          hasStatic
                        </FieldLabel>
                      </Field>
                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors}
                        />
                      )}
                    </Field>
                  )
                }}
              />
              <form.Field
                name="hasParent"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <Field
                        orientation="horizontal"
                        data-invalid={isInvalid}
                      >
                        <Checkbox
                          id={field.name}
                          name={field.name}
                          checked={field.state.value}
                          onCheckedChange={(checked) =>
                            field.handleChange(
                              checked === true,
                            )
                          }
                        />
                        <FieldLabel
                          htmlFor={field.name}
                          className="font-normal"
                        >
                          hasParent
                        </FieldLabel>
                      </Field>
                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors}
                        />
                      )}
                    </Field>
                  )
                }}
              />
              <form.Field
                name="allParentGames"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <Field
                        orientation="horizontal"
                        data-invalid={isInvalid}
                      >
                        <Checkbox
                          id={field.name}
                          name={field.name}
                          checked={field.state.value}
                          onCheckedChange={(checked) =>
                            field.handleChange(
                              checked === true,
                            )
                          }
                        />
                        <FieldLabel
                          htmlFor={field.name}
                          className="font-normal"
                        >
                          allParentGames
                        </FieldLabel>
                      </Field>
                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors}
                        />
                      )}
                    </Field>
                  )
                }}
              />
              <form.Field
                name="uefaSorting"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <Field
                        orientation="horizontal"
                        data-invalid={isInvalid}
                      >
                        <Checkbox
                          id={field.name}
                          name={field.name}
                          checked={field.state.value}
                          onCheckedChange={(checked) =>
                            field.handleChange(
                              checked === true,
                            )
                          }
                        />
                        <FieldLabel
                          htmlFor={field.name}
                          className="font-normal"
                        >
                          UEFA-sortering
                        </FieldLabel>
                      </Field>
                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors}
                        />
                      )}
                    </Field>
                  )
                }}
              />
            </div>

            <form.Field
              name="comment"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Kommentar
                    </FieldLabel>

                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(e.target.value)
                      }
                      aria-invalid={isInvalid}
                      placeholder="Kommentar..."
                      className="min-h-30"
                    />

                    {isInvalid && (
                      <FieldError
                        errors={field.state.meta.errors}
                      />
                    )}
                  </Field>
                )
              }}
            />
            <form.Field
              name="competitionId"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  !field.state.meta.isValid
                return (
                  <FieldSet>
                    <FieldLegend variant="label">
                      Byt turnering
                    </FieldLegend>

                    <FieldGroup>
                      <div>
                        <RadioBadges
                          array={competitionArray}
                          orientation="horizontal"
                          id={field.name}
                          name={field.name}
                          value={field.state.value.toString()}
                          onBlur={field.handleBlur}
                          onValueChange={(value) =>
                            field.setValue(Number(value))
                          }
                          aria-invalid={isInvalid}
                          className="flex flex-row gap-2 w-fit"
                        />
                      </div>
                    </FieldGroup>
                    {isInvalid && (
                      <FieldError
                        errors={field.state.meta.errors}
                      />
                    )}
                  </FieldSet>
                )
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}

export default EditCupSerie
