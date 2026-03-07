import { getRouteApi } from '@tanstack/react-router'

import { Button } from '@/components/base/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/base/ui/card'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/base/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/base/ui/select'
import { zd } from '@/lib/utils/zod'

import { useNewParentSerieForm } from '../../../-hooks/useNewParentSerieForm'

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/info_/$serieId/edit',
)

const AddParentSerie = () => {
  const series = route.useLoaderData({
    select: (s) => s.series,
  })
  const parentSeries = route
    .useLoaderData({ select: (s) => s.parentSeries })
    .map((s) => s.parentId)
  const form = useNewParentSerieForm()

  const seriesArray = series.filter(
    (serie) => !parentSeries.includes(serie.value),
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Ny Parentserie</CardTitle>
          </div>
          <div className="flex flex-row gap-2">
            <Button
              type="submit"
              form="addParentSerieForm"
            >
              Lägg till
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form
          id="addParentSerieForm"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <form.Field
              name="parentId"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      ParentSerie
                    </FieldLabel>
                    <Select
                      name={field.name}
                      value={field.state.value.toString()}
                      onValueChange={(value) => {
                        field.handleChange(
                          zd.coerce.number().parse(value),
                        )
                      }}
                    >
                      <SelectTrigger
                        id={field.name}
                        aria-invalid={isInvalid}
                        className="w-full min-w-[120px]"
                      >
                        <SelectValue placeholder="Välj">
                          {seriesArray.find(
                            (s) =>
                              s.value === field.state.value,
                          )?.label ?? 'Välj'}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent
                        alignItemWithTrigger={true}
                      >
                        <SelectItem value="auto">
                          {seriesArray.find(
                            (s) =>
                              s.value === field.state.value,
                          )?.label ?? 'Välj'}
                        </SelectItem>
                        <SelectSeparator />
                        {seriesArray.map((cat) => (
                          <SelectItem
                            key={cat.value}
                            value={cat.value.toString()}
                          >
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {isInvalid && (
                      <FieldError
                        errors={field.state.meta.errors}
                      />
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

export default AddParentSerie
