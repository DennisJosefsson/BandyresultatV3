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
import { Fragment } from 'react'

export type BreadcrumbValue =
  | string
  | Array<string>
  | ((match: AnyRouteMatch) => string | Array<string>)

type ResolvedBreadcrumbItem = {
  path: string
  label: string
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
                <span className="xs:text-[8px] hidden truncate text-[6px] font-semibold sm:block md:text-xs">
                  {breadcrumbs[0].label}
                </span>
                <span className="sm:hidden">
                  <HouseIcon className="size-2 xs:size-3" />
                </span>
              </Link>
            }
          />
          <BreadcrumbSeparator className="[&>svg]:size-2 md:[&>svg]:size-3.5" />

          {lastTwo.map((crumb, index) => {
            const isLast = index === lastTwo.length - 1

            return (
              <Fragment key={`${crumb.path}-${index}`}>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>
                      <span className="w-10 xs:w-fit xs:text-[8px] truncate text-[6px] font-semibold md:text-xs">
                        {crumb.label}
                      </span>
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink
                      render={
                        <Link
                          to={crumb.path}
                          className="w-10 xs:w-fit xs:text-[8px] truncate text-[6px] font-semibold md:text-xs"
                        >
                          {crumb.label}
                        </Link>
                      }
                    />
                  )}
                </BreadcrumbItem>
                {!isLast && (
                  <BreadcrumbSeparator className="[&>svg]:size-2 md:[&>svg]:size-3.5" />
                )}
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

          return (
            <Fragment key={`${crumb.path}-${index}`}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>
                    <span className="xs:text-[8px] truncate text-[6px] font-semibold md:text-xs">
                      {crumb.label}
                    </span>
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    render={
                      <Link to={crumb.path}>
                        <span className="xs:text-[8px] truncate text-[6px] font-semibold md:text-xs">
                          {crumb.label}
                        </span>
                      </Link>
                    }
                  />
                )}
              </BreadcrumbItem>
              {!isLast && (
                <BreadcrumbSeparator className="[&>svg]:size-2 md:[&>svg]:size-3.5" />
              )}
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
