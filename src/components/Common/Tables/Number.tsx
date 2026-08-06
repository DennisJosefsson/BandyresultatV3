import {
  TableCell,
  TableHead,
} from '@/components/base/ui/table'
import { cn } from '@/lib/utils/utils'
import type {
  DetailedHTMLProps,
  HTMLAttributes,
} from 'react'

interface ComponentProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {}

export function NumberHeader({
  children,
  className,
  ...rest
}: ComponentProps) {
  return (
    <div
      className={cn(
        'w-4 @xs:w-7 @3xl:w-12 text-right tabular-nums',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

export function NumberCell({
  children,
  className,
  ...rest
}: ComponentProps) {
  return (
    <div
      className={cn(
        'w-4 @xs:w-7 @3xl:w-12 text-right tabular-nums',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

interface PositionProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
> {}

export function PositionHeader({
  children,
  className,
}: PositionProps) {
  return (
    <TableHead
      className={cn(
        'tabular-nums w-6 max-w-6 text-center',
        className,
      )}
    >
      {children}
    </TableHead>
  )
}

export function PositionCell({
  children,
  className,
}: PositionProps) {
  return (
    <TableCell
      className={cn(
        'tabular-nums w-6 max-w-6 text-right mr-2',
        className,
      )}
    >
      {children}
    </TableCell>
  )
}
