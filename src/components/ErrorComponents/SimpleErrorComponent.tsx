import { Button } from '@/components/base/ui/button'

type ErrorComponentProps = {
  id: string
  error: Error
  reset: () => void
}

const SimpleErrorComponent = ({
  id,
  error,
  reset,
}: ErrorComponentProps) => {
  return (
    <div className="font-inter text-foreground mx-auto mt-10 flex items-center justify-center">
      <div className="mx-2 max-w-3xl">
        <p className="mb-4 text-center text-[10px] md:text-sm">
          Om du ser det här så har något gått jättefel.
          Maila gärna dennis@bandyresultat.se och ta med det
          som står här nedanför i ditt meddelande. Tack på
          förhand.
        </p>
        <p className="text-center text-[10px] md:text-sm">
          id: {id}-{error.message}
        </p>
        <div className="mt-4 grid justify-center">
          <Button
            onClick={() => {
              reset()
            }}
          >
            Ladda om
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SimpleErrorComponent
