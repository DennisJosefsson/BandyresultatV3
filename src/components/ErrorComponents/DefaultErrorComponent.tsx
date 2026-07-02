import type { ErrorComponentProps } from '@tanstack/react-router'

function DefaultErrorComponent({
  ...errorProps
}: ErrorComponentProps) {
  console.log(errorProps.error.name)

  const message = errorProps.error.message.includes('query')
    ? 'Möjligtvis saknas databaskoppling, hör gärna av dig till dennis@bandyresultat.se.'
    : 'Oklart vad, hör gärna av dig till dennis@bandyresultat.se.'
  return (
    <div className="flex flex-row justify-center mt-10">
      <span>Nu gick något fel... {message}</span>
    </div>
  )
}

export default DefaultErrorComponent
