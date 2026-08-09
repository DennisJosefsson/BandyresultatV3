import type { ErrorComponentProps } from '@tanstack/react-router'

function DefaultErrorComponent({
  ...errorProps
}: ErrorComponentProps) {
  console.log(errorProps.error)

  const message = errorProps.error.message.includes(
    'Databaskoppling saknas',
  )
    ? `${errorProps.error.message}, hör gärna av dig till dennis@bandyresultat.se.'`
    : 'Oklart vad, hör gärna av dig till dennis@bandyresultat.se.'
  return (
    <div className="mt-10 flex flex-row justify-center">
      <span>Nu gick något fel... {message}</span>
    </div>
  )
}

export default DefaultErrorComponent
