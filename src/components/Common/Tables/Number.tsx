import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils/utils'
import { TableCell, TableHead } from '@/components/base/ui/table'

interface ComponentProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {}

export function NumberHeader({ children, className, ...rest }: ComponentProps) {
  return (
    <div
      className={cn(
        'w-4 sm:w-6 lg:w-8 text-right text-[7px] xs:text-[8px] sm:text-[10px] md:text-sm xl:text-base',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

export function NumberCell({ children, className, ...rest }: ComponentProps) {
  return (
    <div
      className={cn(
        'w-4 sm:w-6 lg:w-8 text-right text-[7px] xs:text-[8px] tabular-nums sm:text-[10px] md:text-sm xl:text-base leading-2 xxs:leading-3 xs:leading-4 sm:leading-5 lg:leading-6',
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

export function PositionHeader({ children, className }: PositionProps) {
  return (
    <TableHead
      className={cn(
        'h-4 xs:h-6 tabular-nums xs:text-[8px] w-6 lg:max-w-10 text-center text-[7px] sm:text-[10px] md:text-sm xl:text-base',
        className,
      )}
    >
      {children}
    </TableHead>
  )
}

export function PositionCell({ children, className }: PositionProps) {
  return (
    <TableCell
      className={cn(
        'tabular-nums xs:text-[8px] w-6 lg:max-w-10 text-center text-[7px] sm:text-[10px] md:text-sm xl:text-base',
        className,
      )}
    >
      {children}
    </TableCell>
  )
}
