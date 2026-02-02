import { RefObject } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardFooter } from '../ui/card'

type ConfirmDialogProps = {
  dialogRef: RefObject<HTMLDialogElement | null>
  confirmTitle: string
  confirmButtonText?: string
  closeButtonText?: string
  onClose: () => void
  confirmFunction: () => void
}

const ConfirmDialog = ({
  dialogRef,
  onClose,
  confirmFunction,
  confirmTitle,
  confirmButtonText = 'Ja, ta bort',
  closeButtonText = 'Nej,stäng',
}: ConfirmDialogProps) => {
  return (
    <dialog ref={dialogRef} className="backdrop:bg-accent/50" onClose={onClose}>
      <div className="fixed inset-y-80 z-50 m-2 flex items-center justify-center overflow-x-hidden outline-none focus:outline-none">
        <div className="fixed inset-2 mx-auto my-60 h-50 w-80">
          <Card>
            <CardContent className="mb-8 flex flex-row justify-center">
              <span className="text-base font-bold">{confirmTitle}</span>
            </CardContent>
            <CardFooter className="flex flex-row justify-between">
              <Button onClick={() => dialogRef.current?.close()} autoFocus>
                {closeButtonText}
              </Button>
              <Button variant="destructive" onClick={confirmFunction}>
                {confirmButtonText}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </dialog>
  )
}

export default ConfirmDialog
