import type { AnyRouteMatch} from '@tanstack/react-router';
import { Link, useMatches } from '@tanstack/react-router'
import { Fragment } from 'react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

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

  const breadcrumbs: Array<ResolvedBreadcrumbItem> = matches.flatMap((match) => {
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
                    <span className="font-semibold">{crumb.label}</span>
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={crumb.path}>
                      <span className="font-semibold">{crumb.label}</span>
                    </Link>
                  </BreadcrumbLink>
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
