import { Button } from '@/components/base/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/base/ui/card'
import ConfirmDialog from '@/components/Common/ConfirmDialog'
import { getRouteApi } from '@tanstack/react-router'
import { useRef, useState } from 'react'
import { useNewParentSerieMutation } from '../../../-hooks/addParentSerieMutation'
import { deleteParentSerieMutation } from '../../../-hooks/useDeleteParentSerieMutation'

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/info_/$serieId/edit',
)

const AddParentSerie = () => {
  const serieId = route.useParams({
    select: (s) => s.serieId,
  })
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const [parentChildId, setParentChildId] = useState<
    number | null
  >(null)
  const [parentName, setParentName] = useState<
    string | null
  >(null)
  const deleteMutation =
    deleteParentSerieMutation(dialogRef)
  const addMutation = useNewParentSerieMutation()
  const series = route.useLoaderData({
    select: (s) => s.series,
  })
  const parentSeries = route.useLoaderData({
    select: (s) => s.parentSeries,
  })

  const parentSerieIdArray = parentSeries.map(
    (s) => s.parentId,
  )

  const seriesArray = series.filter(
    (serie) => !parentSerieIdArray.includes(serie.value),
  )

  const openDialog = (id: number) => {
    setParentChildId(id)
    dialogRef.current?.showModal()
  }

  const deleteParentChildFunction = () => {
    if (!parentChildId) return
    deleteMutation.mutate({ data: { id: parentChildId } })
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
              <CardTitle>Parentserie</CardTitle>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-2 gap-12">
            <div className="flex flex-col gap-1">
              <div>
                <span className="font-semibold text-sm">
                  Serier
                </span>
                <div className="flex flex-col gap-1 max-w-60">
                  {seriesArray.map((ser) => {
                    return (
                      <Button
                        size="sm"
                        key={ser.value.toString()}
                        onClick={() =>
                          addMutation.mutate({
                            data: {
                              parentId: ser.value,
                              childId: serieId,
                            },
                          })
                        }
                      >
                        {ser.label}
                      </Button>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div>
                <span className="font-semibold text-sm">
                  Serier med parentId
                </span>
              </div>
              <div className="flex flex-col gap-1 max-w-60">
                {parentSeries.map((ser) => {
                  return (
                    <Button
                      key={ser.parent.serieId.toString()}
                      onClick={() => {
                        setParentName(ser.parent.serieName)
                        openDialog(ser.id)
                      }}
                      size="sm"
                      variant="destructive"
                    >
                      {ser.parent.serieName}
                    </Button>
                  )
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default AddParentSerie
