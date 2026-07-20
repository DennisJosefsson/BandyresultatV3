import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/base/ui/breadcrumb'
import type { AnyRouteMatch } from '@tanstack/react-router'
import { Link, useMatches } from '@tanstack/react-router'
import { HouseIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Fragment } from 'react'
import { Button } from '../base/ui/button'

export type BreadcrumbValue =
  | string
  | Array<string>
  | ((match: AnyRouteMatch) => string | Array<string>)

type ResolvedBreadcrumbItem = {
  path: string
  label: string
}

function Label({ children }: { children: ReactNode }) {
  return (
    <span className="text-[6px]/3 xxs:text-[8px]/4 xs:text-[10px]/5 msm:text-xs/6 md:text-sm/6 lg:text-base/6 font-semibold truncate">
      {children}
    </span>
  )
}

export function RouterBreadcrumb() {
  const matches = useMatches()

  const breadcrumbs: Array<ResolvedBreadcrumbItem> =
    matches.flatMap((match) => {
      const staticData = match.staticData
      if (!staticData?.breadcrumb) return []

      const breadcrumbValue =
        typeof staticData.breadcrumb === 'function'
          ? staticData.breadcrumb(match)
          : staticData.breadcrumb

      const items = Array.isArray(breadcrumbValue)
        ? breadcrumbValue
        : [breadcrumbValue]

      return items.map((item) => ({
        label: item,
        path: match.pathname,
      }))
    })

  if (breadcrumbs.length === 0) {
    return null
  }

  if (breadcrumbs.length > 3) {
    const lastTwo = breadcrumbs.slice(-2)

    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbLink
            render={
              <Link to={breadcrumbs[0].path}>
                <span className="hidden md:block text-[6px]/3 xxs:text-[8px]/4 xs:text-[10px]/5 msm:text-xs/6 md:text-sm/6 lg:text-base/6 font-semibold">
                  {breadcrumbs[0].label}
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="md:hidden"
                >
                  <HouseIcon className="size-[1lh]" />
                </Button>
              </Link>
            }
          />
          <BreadcrumbSeparator />

          {lastTwo.map((crumb, index) => {
            const isLast = index === lastTwo.length - 1

            return (
              <Fragment key={`${crumb.path}-${index}`}>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="max-w-9 xxs:max-w-15 msm:max-w-26 sm:max-w-none truncate">
                      <Label>{crumb.label}</Label>
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink
                      className="max-w-9 xxs:max-w-15 msm:max-w-26 sm:max-w-none truncate"
                      render={
                        <Link to={crumb.path}>
                          <Label>{crumb.label}</Label>
                        </Link>
                      }
                    />
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    )
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1
          const isFirst = index === 0
          return (
            <Fragment key={`${crumb.path}-${index}`}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="max-w-9 xxs:max-w-15 msm:max-w-26 sm:max-w-none truncate">
                    <Label>{crumb.label}</Label>
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    className="max-w-9 xxs:max-w-15 msm:max-w-26 sm:max-w-none truncate"
                    render={
                      isFirst ? (
                        <Link to={crumb.path}>
                          <span className="hidden md:block text-[6px]/3 xxs:text-[8px]/4 xs:text-[10px]/5 msm:text-xs/6 md:text-sm/6 lg:text-base/6 font-semibold">
                            {crumb.label}
                          </span>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="md:hidden"
                          >
                            <HouseIcon className="size-[1lh]" />
                          </Button>
                        </Link>
                      ) : (
                        <Link to={crumb.path}>
                          <Label> {crumb.label}</Label>
                        </Link>
                      )
                    }
                  />
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
