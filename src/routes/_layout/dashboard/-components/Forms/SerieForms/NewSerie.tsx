import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { categoryEnum, newSeriesObject } from '@/lib/types/serie'
import { zd } from '@/lib/utils/zod'
import { getRouteApi } from '@tanstack/react-router'
import { useNewSerieForm } from '../../../-hooks/useSerieForm'

const route = getRouteApi('/_layout/dashboard/season/$seasonId/info_/newSerie')

const serieStructureArray = Array.from(
  { length: 16 },
  (_, index) => index + 1,
).map((_, index) => {
  return { value: index + 1, label: `${index + 1}` }
})

type CategoryArray = {
  value: zd.infer<typeof newSeriesObject>['category']
  label: string
}

const categoryArray: CategoryArray[] = [
  { value: 'qualification', label: 'Kval' },
  { value: 'regular', label: 'Grundserie' },
  { value: 'playoffseries', label: 'Slutspelsserie' },
  { value: 'eight', label: 'Åttondelsfinal' },
  { value: 'quarter', label: 'Kvartsfinal' },
  { value: 'semi', label: 'Semifinal' },
  { value: 'final', label: 'Final' },
]

const NewSerie = () => {
  const seasonId = route.useParams({ select: (s) => s.seasonId })
  const women = route.useSearch({ select: (s) => s.women })
  const form = useNewSerieForm({ seasonId })

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Ny serie</CardTitle>
          </div>
          <div className="flex flex-row gap-2">
            <Button asChild>
              <route.Link
                to="/dashboard/season/$seasonId"
                params={{ seasonId }}
                search={{ women }}
              >
                Tillbaka
              </route.Link>
            </Button>
            <Button type="submit" form="newSerieForm">
              Skicka
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form
          id="newSerieForm"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <div className="grid grid-cols-2 items-center gap-4">
              <form.Field
                name="serieName"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Serienamn</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="T.ex. Elitserien"
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />
              <form.Field
                name="group"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Grupp</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="T.ex. Div1Norr"
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />
              <form.Field
                name="category"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Kategori</FieldLabel>
                      <Select
                        name={field.name}
                        value={field.state.value}
                        onValueChange={(value) =>
                          field.handleChange(categoryEnum.parse(value))
                        }
                      >
                        <SelectTrigger
                          id={field.name}
                          aria-invalid={isInvalid}
                          className="min-w-[120px]"
                        >
                          <SelectValue placeholder="Välj" />
                        </SelectTrigger>
                        <SelectContent position="item-aligned">
                          <SelectItem value="auto">
                            {field.state.value}
                          </SelectItem>
                          <SelectSeparator />
                          {categoryArray.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />
              <form.Field
                name="level"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Level</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(Number(e.target.value))
                        }
                        aria-invalid={isInvalid}
                        placeholder="T.ex. Västerås"
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
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
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <FieldSet>
                    <FieldLegend variant="label">Seriestruktur</FieldLegend>

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
                                field.state.value.includes(item.value)
                              }
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.pushValue(item.value)
                                } else {
                                  const index =
                                    field.state.value &&
                                    field.state.value.indexOf(item.value)
                                  if (index && index > -1) {
                                    field.removeValue(index)
                                  }
                                }
                              }}
                            />
                            <FieldLabel
                              htmlFor={`form-tanstack-checkbox-${item.value}`}
                              className="font-normal"
                            >
                              {item.label}
                            </FieldLabel>
                          </Field>
                        ))}
                      </div>
                    </FieldGroup>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
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
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <Field orientation="horizontal" data-invalid={isInvalid}>
                        <Checkbox
                          id={field.name}
                          name={field.name}
                          checked={field.state.value}
                          onCheckedChange={(checked) =>
                            field.handleChange(checked === true)
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
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />
              <form.Field
                name="hasStatic"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <Field orientation="horizontal" data-invalid={isInvalid}>
                        <Checkbox
                          id={field.name}
                          name={field.name}
                          checked={field.state.value}
                          onCheckedChange={(checked) =>
                            field.handleChange(checked === true)
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
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />
              <form.Field
                name="hasParent"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <Field orientation="horizontal" data-invalid={isInvalid}>
                        <Checkbox
                          id={field.name}
                          name={field.name}
                          checked={field.state.value}
                          onCheckedChange={(checked) =>
                            field.handleChange(checked === true)
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
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />
              <form.Field
                name="allParentGames"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <Field orientation="horizontal" data-invalid={isInvalid}>
                        <Checkbox
                          id={field.name}
                          name={field.name}
                          checked={field.state.value}
                          onCheckedChange={(checked) =>
                            field.handleChange(checked === true)
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
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />
              <form.Field
                name="uefaSorting"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <Field orientation="horizontal" data-invalid={isInvalid}>
                        <Checkbox
                          id={field.name}
                          name={field.name}
                          checked={field.state.value}
                          onCheckedChange={(checked) =>
                            field.handleChange(checked === true)
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
                        <FieldError errors={field.state.meta.errors} />
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
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Kommentar</FieldLabel>

                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Kommentar..."
                      className="min-h-[120px]"
                    />

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}

export default NewSerie
