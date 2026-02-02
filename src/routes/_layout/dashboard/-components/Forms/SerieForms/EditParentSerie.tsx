import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field'
import { getRouteApi } from '@tanstack/react-router'

import ConfirmDialog from '@/components/Common/ConfirmDialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { zd } from '@/lib/utils/zod'
import { useRef, useState } from 'react'
import { deleteParentSerieMutation } from '../../../-hooks/useDeleteParentSerieMutation'
import { useEditParentSerieForm } from '../../../-hooks/useEditParentSerieForm'

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/info_/$serieId/edit',
)

const EditParentSerie = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const [parentChildId, setParentChildId] = useState<number | null>(null)
  const [parentName, setParentName] = useState<string | null>(null)
  const series = route.useLoaderData({ select: (s) => s.series })
  const parentSeries = route.useLoaderData({ select: (s) => s.parentSeries })
  const form = useEditParentSerieForm()
  const mutation = deleteParentSerieMutation(dialogRef)

  const openDialog = (id: number) => {
    setParentChildId(id)
    dialogRef.current?.showModal()
  }

  const deleteParentChildFunction = () => {
    if (!parentChildId) return
    mutation.mutate({ data: { id: parentChildId } })
  }

  return (
    <>
      <ConfirmDialog
        dialogRef={dialogRef}
        confirmTitle={`Vill du ta bort ${parentName} som ParentSerie?`}
        onClose={() => setParentName(null)}
        confirmFunction={deleteParentChildFunction}
      />
      <Card>
        <CardHeader>
          <div className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Ändra Parentserie</CardTitle>
            </div>
            <div className="flex flex-row gap-2">
              <Button type="submit" form="editParentSerieForm">
                Ändra
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-6 text-sm">
            <div className="grid grid-cols-3 items-center space-x-10">
              {parentSeries.map((ps) => {
                return (
                  <div
                    key={ps.parent.serieId}
                    className="mb-1 flex flex-row items-center justify-start space-x-5"
                  >
                    <span className="text-sm">{ps.parent.serieName}</span>

                    <Button
                      onClick={() => {
                        setParentName(ps.parent.serieName)
                        openDialog(ps.id)
                      }}
                      size="sm"
                      variant="destructive"
                    >
                      Ta bort
                    </Button>
                  </div>
                )
              })}
            </div>
          </div>
          <form
            id="editParentSerieForm"
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
          >
            <FieldGroup>
              <form.Field name="parentSeries" mode="array">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <FieldSet className="gap-4">
                      <FieldLegend variant="label">ParentSeries</FieldLegend>
                      <FieldGroup className="gap-4">
                        {field.state.value.map((_, index) => (
                          <form.Field
                            key={index}
                            name={`parentSeries[${index}].parentId`}
                            children={(subField) => {
                              const isSubFieldInvalid =
                                subField.state.meta.isTouched &&
                                !subField.state.meta.isValid
                              return (
                                <Field
                                  orientation="horizontal"
                                  data-invalid={isSubFieldInvalid}
                                >
                                  <FieldContent>
                                    <Select
                                      name={subField.name}
                                      value={subField.state.value.toString()}
                                      onValueChange={(value) =>
                                        subField.handleChange(
                                          zd.coerce.number().parse(value),
                                        )
                                      }
                                    >
                                      <SelectTrigger
                                        id={subField.name}
                                        aria-invalid={isInvalid}
                                        className="w-full min-w-[120px]"
                                      >
                                        <SelectValue placeholder="Välj" />
                                      </SelectTrigger>
                                      <SelectContent position="item-aligned">
                                        <SelectItem value="auto">
                                          {subField.state.value}
                                        </SelectItem>
                                        <SelectSeparator />
                                        {series.map((cat) => (
                                          <SelectItem
                                            key={cat.value}
                                            value={cat.value.toString()}
                                          >
                                            {cat.label}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
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
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </FieldSet>
                  )
                }}
              </form.Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </>
  )
}

export default EditParentSerie
