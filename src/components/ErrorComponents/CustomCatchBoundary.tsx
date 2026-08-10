import { CatchBoundary } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import SimpleErrorComponent from './SimpleErrorComponent'

type CustomCatchBoundaryProps = {
  id: string
  children: ReactNode
}

export function CustomCatchBoundary({
  id,
  children,
}: CustomCatchBoundaryProps) {
  return (
    <CatchBoundary
      getResetKey={() => 'reset'}
      errorComponent={({ error, reset }) => (
        <SimpleErrorComponent
          id={id}
          error={error}
          reset={reset}
        />
      )}
    >
      {children}
    </CatchBoundary>
  )
}
