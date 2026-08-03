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
import {
  ChevronDownIcon,
  ChevronRightIcon,
  DotIcon,
  HouseIcon,
} from 'lucide-react'
import { Fragment } from 'react'
import { Button } from '../base/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../base/ui/dropdown-menu'

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
      if (match.status === 'pending') {
        return ['Väntar'].map((item) => ({
          label: item,
          path: match.pathname,
        }))
      }
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

  if (!breadcrumbs || breadcrumbs.length === 0) {
    return null
  }

  if (breadcrumbs.length === 1) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbLink
            className="sm:tracking-wider font-semibold text-foreground"
            render={
              <Link to={breadcrumbs[0].path}>
                {breadcrumbs[0].label}
              </Link>
            }
          ></BreadcrumbLink>
        </BreadcrumbList>
      </Breadcrumb>
    )
  }

  if (breadcrumbs.length > 3) {
    const first = breadcrumbs.at(0)
    const last = breadcrumbs.at(-1)
    const middle = breadcrumbs.slice(1, -1)

    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              render={
                <Link to={first?.path}>
                  <span className="hidden md:block">
                    {first?.label}
                  </span>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="md:hidden"
                  >
                    <HouseIcon />
                  </Button>
                </Link>
              }
            />
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRightIcon className="hidden sm:block" />
            <DotIcon className="sm:hidden" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <button className="flex items-center gap-1 text-xs font-semibold sm:tracking-wider md:text-sm">
                    Sidor
                    <ChevronDownIcon
                      data-icon="inline-end"
                      className="size-3.5"
                    />
                  </button>
                }
              />
              <DropdownMenuContent align="start">
                <DropdownMenuGroup>
                  {middle.map((crumb) => {
                    return (
                      <DropdownMenuItem key={crumb.label}>
                        <Link to={crumb.path}>
                          {crumb.label}
                        </Link>
                      </DropdownMenuItem>
                    )
                  })}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>

          <BreadcrumbSeparator>
            <ChevronRightIcon className="hidden sm:block" />
            <DotIcon className="sm:hidden" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="max-w-18 xxs:max-w-24 sm:max-w-none truncate sm:tracking-wider">
              <span className="text-xs font-semibold sm:tracking-wider md:text-sm truncate">
                {last?.label}
              </span>
            </BreadcrumbPage>
          </BreadcrumbItem>
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
                  <BreadcrumbPage className="max-w-18 xxs:max-w-24 sm:max-w-none truncate sm:tracking-wider">
                    <span className="text-xs font-semibold sm:tracking-wider md:text-sm truncate">
                      {crumb.label}
                    </span>
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    className="max-w-18 xxs:max-w-24 sm:max-w-none truncate sm:tracking-wider"
                    render={
                      isFirst ? (
                        <Link to={crumb.path}>
                          <span className="text-xs hidden font-semibold sm:tracking-wider md:block md:text-sm">
                            {crumb.label}
                          </span>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="md:hidden"
                          >
                            <HouseIcon />
                          </Button>
                        </Link>
                      ) : (
                        <Link to={crumb.path}>
                          <span className="text-xs font-semibold sm:tracking-wider md:text-sm truncate">
                            {crumb.label}
                          </span>
                        </Link>
                      )
                    }
                  />
                )}
              </BreadcrumbItem>
              {!isLast && (
                <BreadcrumbSeparator>
                  <ChevronRightIcon className="hidden sm:block" />
                  <DotIcon className="sm:hidden" />
                </BreadcrumbSeparator>
              )}
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
