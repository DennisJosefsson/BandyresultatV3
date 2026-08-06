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
  HTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
> {}

export function TeamnameHeader({
  children,
  className,
}: ComponentProps) {
  return (
    <div
      className={cn(
        '@md:w-18 @lg:w-24 w-15 truncate pl-1 text-left @5xl:w-fit',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function TeamnameLabel({
  children,
  className,
}: ComponentProps) {
  return (
    <div
      className={cn(
        '@md:w-18 @lg:w-24 text-left w-15 gap-1 truncate @xl:gap-2 @5xl:w-60',
        className,
      )}
    >
      {children}
    </div>
  )
}

interface TeamLogoProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
> {}

export function TeamLogoHeader({
  children,
  className,
}: TeamLogoProps) {
  return (
    <TableHead className={cn('w-7 max-w-7', className)}>
      {children}
    </TableHead>
  )
}

export function TeamLogoCell({
  children,
  className,
}: TeamLogoProps) {
  return (
    <TableCell className={cn('w-7 max-w-7', className)}>
      {children}
    </TableCell>
  )
}
