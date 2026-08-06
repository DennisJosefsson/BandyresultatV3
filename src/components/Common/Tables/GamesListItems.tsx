import { cn } from '@/lib/utils/utils'
import type {
  DetailedHTMLProps,
  HTMLAttributes,
} from 'react'

interface ComponentProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {}

export function TeamName({
  children,
  className,
}: ComponentProps) {
  return (
    <div
      className={cn(
        '@xs:w-16 w-8 text-left @xl:w-28 @5xl:w-32',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function Divider({
  children,
  className,
}: ComponentProps) {
  return (
    <div
      className={cn(
        'w-2 @sm:w-20 @2xs:gap-1 flex flex-row items-center justify-between gap-0.5',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function Result({
  children,
  className,
}: ComponentProps) {
  return (
    <div
      className={cn(
        'w-6 text-right @xl:w-8 @3xl:w-10',
        className,
      )}
    >
      {children}
    </div>
  )
}
