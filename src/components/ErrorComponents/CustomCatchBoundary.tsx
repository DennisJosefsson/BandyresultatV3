import { CatchBoundary } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import SimpleErrorComponent from './SimpleErrorComponent'

type CustomCatchBoundaryProps = {
  id: string
  children: ReactNode
}

export function CustomCatchBoundary({
  children,
}: CustomCatchBoundaryProps) {
  return (
    <CatchBoundary
      getResetKey={() => 'reset'}
      errorComponent={({ error, reset }) => (
        <SimpleErrorComponent
          error={error}
          reset={reset}
        />
      )}
    >
      {children}
    </CatchBoundary>
  )
}
