import ConfirmDialog from '@/components/Common/ConfirmDialog'
import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { useRef } from 'react'
import { newSeasonMutation } from '../-hooks/newSeasonMutation'

export const Route = createFileRoute('/_layout/dashboard/newseason/')({
  component: RouteComponent,
})

function RouteComponent() {
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const mutation = newSeasonMutation(dialogRef)

  const generateSeasonFunction = () => {
    mutation.mutate({})
  }
  return (
    <>
      <ConfirmDialog
        dialogRef={dialogRef}
        confirmFunction={generateSeasonFunction}
        confirmTitle="Generera ny säsong?"
        confirmButtonText="Ja, ny säsong."
        onClose={() => {}}
      />
      <div className="mt-20 flex flex-row justify-center">
        <Button onClick={() => dialogRef.current?.showModal()}>
          Generera ny säsong.
        </Button>
      </div>
    </>
  )
}
