import {
  Link,
  Navigate,
  getRouteApi,
  useParams,
} from '@tanstack/react-router'
import {
  CalendarIcon,
  CalendarSearchIcon,
  ChartLineIcon,
  ChevronsLeftRightEllipsisIcon,
  FolderKanbanIcon,
  ListIcon,
  MapIcon,
  TrophyIcon,
} from 'lucide-react'

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/base/ui/sidebar'

import { useGetFirstAndLastSeason } from '../../../routes/_layout/seasons/$year/-hooks/useGetFirstAndLastSeason'

const route = getRouteApi('/_layout/seasons/$year')

export function SeasonSidebar() {
  const women = route.useSearch({
    select: (search) => search.women,
  })
  const { open, isMobile, setOpenMobile } = useSidebar()

  const { lastSeason } = useGetFirstAndLastSeason()
  const params = useParams({ strict: false })

  const data = route.useLoaderData()

  const toggleOnMobile = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  if (
    data === undefined ||
    data.status === 204 ||
    data.groups.length === 0
  ) {
    return (
      <Navigate
        to="."
        params={{ group: 'elitserien' }}
      />
    )
  }
  const groupFromData = data.groups[0].group

  const group = params.group ?? groupFromData

  const year = params.year ?? lastSeason
  if (!open) return null
  return (
    <>
      <DefaultSeasonSidebar
        year={year}
        women={women}
        group={group}
      />
      {data.status === 200 && (
        <SidebarGroup>
          <SidebarGroupLabel>Serier</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenuSub>
              {data.groups.map((item) => {
                return (
                  <SidebarMenuSubItem
                    key={item.serieId.toString()}
                  >
                    <SidebarMenuSubButton
                      onClick={toggleOnMobile}
                      render={
                        <Link
                          to="."
                          params={(prev) => ({
                            ...prev,
                            group: item.group,
                          })}
                          search={(prev) => ({
                            women: prev.women,
                          })}
                        >
                          <span className="md:text-sm truncate">
                            {item.name}
                          </span>
                        </Link>
                      }
                    />
                  </SidebarMenuSubItem>
                )
              })}
            </SidebarMenuSub>
          </SidebarGroupContent>
        </SidebarGroup>
      )}
    </>
  )
}

export function DefaultSeasonSidebar({
  year,
  women,
  group,
}: {
  year: number
  women: boolean
  group: string
}) {
  const { isMobile, setOpenMobile } = useSidebar()
  const toggleOnMobile = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }
  return (
    <SidebarMenuSub>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton
          onClick={toggleOnMobile}
          render={
            <Link
              to="/seasons"
              params={{ page: 1 }}
              search={{ women }}
              activeOptions={{
                includeSearch: false,
                exact: true,
              }}
              activeProps={{ className: `font-bold` }}
            >
              <span>
                <CalendarSearchIcon className="size-4" />
              </span>
              <span className="md:text-sm">
                Säsongslista
              </span>
            </Link>
          }
        />
      </SidebarMenuSubItem>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton
          onClick={toggleOnMobile}
          render={
            <Link
              to="/seasons/$year/$group/games"
              params={{ year, group }}
              search={{ women }}
              activeOptions={{ includeSearch: false }}
              activeProps={{ className: `font-bold` }}
            >
              <span>
                <CalendarIcon className="size-4" />
              </span>
              <span className="md:text-sm">Matcher</span>
            </Link>
          }
        />
      </SidebarMenuSubItem>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton
          onClick={toggleOnMobile}
          render={
            <Link
              to="/seasons/$year/$group/tables/$table"
              params={{
                year,
                group,
                table: 'all',
              }}
              search={{ women }}
              activeOptions={{ includeSearch: false }}
              activeProps={{ className: `font-bold` }}
            >
              <span>
                <ListIcon className="size-4" />
              </span>
              <span className="md:text-sm">Tabell</span>
            </Link>
          }
        />

        <SidebarMenuSub>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton
              onClick={toggleOnMobile}
              render={
                <Link
                  to="/seasons/$year/$group/tables/$table"
                  params={{
                    year: year,
                    group,
                    table: 'all',
                  }}
                  search={{ women }}
                  activeOptions={{ includeSearch: false }}
                  activeProps={{ className: `font-bold` }}
                >
                  <span className="md:text-sm">Alla</span>
                </Link>
              }
            />
          </SidebarMenuSubItem>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton
              onClick={toggleOnMobile}
              render={
                <Link
                  to="/seasons/$year/$group/tables/$table"
                  params={{
                    year,
                    group,
                    table: 'home',
                  }}
                  search={{ women }}
                  activeOptions={{ includeSearch: false }}
                  activeProps={{ className: `font-bold` }}
                >
                  <span className="md:text-sm">Hemma</span>
                </Link>
              }
            />
          </SidebarMenuSubItem>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton
              onClick={toggleOnMobile}
              render={
                <Link
                  to="/seasons/$year/$group/tables/$table"
                  params={{
                    year,
                    group,
                    table: 'away',
                  }}
                  search={{ women }}
                  activeOptions={{ includeSearch: false }}
                  activeProps={{ className: `font-bold` }}
                >
                  <span className="md:text-sm">Borta</span>
                </Link>
              }
            />
          </SidebarMenuSubItem>
        </SidebarMenuSub>
      </SidebarMenuSubItem>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton
          onClick={toggleOnMobile}
          render={
            <Link
              to="/seasons/$year/playoff/table"
              params={{ year }}
              search={{ women }}
              activeOptions={{ includeSearch: false }}
              activeProps={{ className: `font-bold` }}
            >
              <span>
                <TrophyIcon className="size-4" />
              </span>
              <span className="md:text-sm">Slutspel</span>
            </Link>
          }
        />

        <SidebarMenuSub>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton
              onClick={toggleOnMobile}
              render={
                <Link
                  to="/seasons/$year/playoff/games"
                  params={{ year }}
                  search={{ women }}
                  activeOptions={{ includeSearch: false }}
                  activeProps={{ className: `font-bold` }}
                >
                  <span className="md:text-sm">
                    Matcher
                  </span>
                </Link>
              }
            />
          </SidebarMenuSubItem>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton
              onClick={toggleOnMobile}
              render={
                <Link
                  to="/seasons/$year/playoff/stats"
                  params={{ year }}
                  search={{ women }}
                  activeOptions={{ includeSearch: false }}
                  activeProps={{ className: `font-bold` }}
                >
                  <span className="md:text-sm">
                    Statistik
                  </span>
                </Link>
              }
            />
          </SidebarMenuSubItem>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton
              onClick={toggleOnMobile}
              render={
                <Link
                  to="/seasons/$year/playoff/map"
                  params={{ year }}
                  search={{ women }}
                  activeOptions={{ includeSearch: false }}
                  activeProps={{ className: `font-bold` }}
                >
                  <span className="md:text-sm">Karta</span>
                </Link>
              }
            />
          </SidebarMenuSubItem>
        </SidebarMenuSub>
      </SidebarMenuSubItem>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton
          onClick={toggleOnMobile}
          render={
            <Link
              to="/seasons/$year/$group/development"
              params={{ year, group }}
              search={{ women, index: 0 }}
              activeOptions={{ includeSearch: false }}
              activeProps={{ className: `font-bold` }}
            >
              <span>
                <ChartLineIcon className="size-4" />
              </span>
              <span className="md:text-sm">Utveckling</span>
            </Link>
          }
        />
      </SidebarMenuSubItem>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton
          onClick={toggleOnMobile}
          render={
            <Link
              to="/seasons/$year/$group/interval"
              params={{ year, group }}
              search={{ women, start: 0 }}
              activeOptions={{ includeSearch: false }}
              activeProps={{ className: `font-bold` }}
            >
              <span>
                <ChevronsLeftRightEllipsisIcon className="size-4" />
              </span>
              <span className="md:text-sm">Intervall</span>
            </Link>
          }
        />
      </SidebarMenuSubItem>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton
          onClick={toggleOnMobile}
          render={
            <Link
              to="/seasons/$year/$group/stats"
              params={{ year, group }}
              search={{ women }}
              activeOptions={{ includeSearch: false }}
              activeProps={{ className: `font-bold` }}
            >
              <span>
                <FolderKanbanIcon className="size-4" />
              </span>
              <span className="md:text-sm">Statistik</span>
            </Link>
          }
        />
      </SidebarMenuSubItem>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton
          onClick={toggleOnMobile}
          render={
            <Link
              to="/seasons/$year/$group/map"
              params={{ year, group }}
              search={{ women }}
              activeOptions={{ includeSearch: false }}
              activeProps={{ className: `font-bold` }}
            >
              <span>
                <MapIcon className="size-4" />
              </span>
              <span className="md:text-sm">Karta</span>
            </Link>
          }
        />
      </SidebarMenuSubItem>
    </SidebarMenuSub>
  )
}
