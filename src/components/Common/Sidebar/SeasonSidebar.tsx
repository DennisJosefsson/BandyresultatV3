import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { getRouteApi, Link, Navigate, useParams } from '@tanstack/react-router'
import {
  CalendarIcon,
  ChartLineIcon,
  ChevronsLeftRightEllipsisIcon,
  FolderKanbanIcon,
  ListIcon,
  MapIcon,
  TrophyIcon,
} from 'lucide-react'
import { useGetFirstAndLastSeason } from '../../../routes/_layout/season/$year/-hooks/useGetFirstAndLastSeason'

const route = getRouteApi('/_layout/season/$year')

export function SeasonSidebar() {
  const women = route.useSearch({
    select: (search) => search.women,
  })

  const { lastSeason } = useGetFirstAndLastSeason()
  const params = useParams({ strict: false })

  const data = route.useLoaderData()

  if (data === undefined || data.status === 204 || data.groups.length === 0) {
    return <Navigate to="." params={{ group: 'elitserien' }} />
  }
  const groupFromData = data.groups[0].group

  const group = params.group ?? groupFromData

  const year = params.year ?? lastSeason

  return (
    <>
      <DefaultSeasonSidebar year={year} women={women} group={group} />
      {data.status === 200 && (
        <SidebarGroup>
          <SidebarGroupLabel>Serier</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenuSub>
              {data.groups.map((item) => {
                return (
                  <SidebarMenuSubItem key={item.serieId.toString()}>
                    <SidebarMenuSubButton asChild>
                      <Link
                        to="."
                        params={(prev) => ({ ...prev, group: item.group })}
                        search={(prev) => ({ women: prev.women })}
                      >
                        <span className="truncate">{item.name}</span>
                      </Link>
                    </SidebarMenuSubButton>
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
  return (
    <SidebarMenuSub>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton asChild>
          <Link
            to="/season/$year/$group/games"
            params={{ year, group }}
            search={{ women }}
            activeOptions={{ includeSearch: false }}
            activeProps={{ className: `font-bold` }}
          >
            <span>
              <CalendarIcon className="size-4" />
            </span>
            <span>Matcher</span>
          </Link>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton asChild>
          <Link
            to="/season/$year/$group/tables/$table"
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
            <span>Tabell</span>
          </Link>
        </SidebarMenuSubButton>
        <SidebarMenuSub>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton asChild>
              <Link
                to="/season/$year/$group/tables/$table"
                params={{
                  year: year,
                  group,
                  table: 'all',
                }}
                search={{ women }}
                activeOptions={{ includeSearch: false }}
                activeProps={{ className: `font-bold` }}
              >
                <span>Alla</span>
              </Link>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton asChild>
              <Link
                to="/season/$year/$group/tables/$table"
                params={{
                  year,
                  group,
                  table: 'home',
                }}
                search={{ women }}
                activeOptions={{ includeSearch: false }}
                activeProps={{ className: `font-bold` }}
              >
                <span>Hemma</span>
              </Link>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton asChild>
              <Link
                to="/season/$year/$group/tables/$table"
                params={{
                  year,
                  group,
                  table: 'away',
                }}
                search={{ women }}
                activeOptions={{ includeSearch: false }}
                activeProps={{ className: `font-bold` }}
              >
                <span>Borta</span>
              </Link>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
        </SidebarMenuSub>
      </SidebarMenuSubItem>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton asChild>
          <Link
            to="/season/$year/playoff/table"
            params={{ year }}
            search={{ women }}
            activeOptions={{ includeSearch: false }}
            activeProps={{ className: `font-bold` }}
          >
            <span>
              <TrophyIcon className="size-4" />
            </span>
            <span>Slutspel</span>
          </Link>
        </SidebarMenuSubButton>
        <SidebarMenuSub>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton asChild>
              <Link
                to="/season/$year/playoff/games"
                params={{ year }}
                search={{ women }}
                activeOptions={{ includeSearch: false }}
                activeProps={{ className: `font-bold` }}
              >
                <span>Matcher</span>
              </Link>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton asChild>
              <Link
                to="/season/$year/playoff/stats"
                params={{ year }}
                search={{ women }}
                activeOptions={{ includeSearch: false }}
                activeProps={{ className: `font-bold` }}
              >
                <span>Statistik</span>
              </Link>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton asChild>
              <Link
                to="/season/$year/playoff/map"
                params={{ year }}
                search={{ women }}
                activeOptions={{ includeSearch: false }}
                activeProps={{ className: `font-bold` }}
              >
                <span>Karta</span>
              </Link>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
        </SidebarMenuSub>
      </SidebarMenuSubItem>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton asChild>
          <Link
            to="/season/$year/$group/development"
            params={{ year, group }}
            search={{ women, index: 0 }}
            activeOptions={{ includeSearch: false }}
            activeProps={{ className: `font-bold` }}
          >
            <span>
              <ChartLineIcon className="size-4" />
            </span>
            <span>Utveckling</span>
          </Link>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton asChild>
          <Link
            to="/season/$year/$group/interval"
            params={{ year, group }}
            search={{ women, start: 0 }}
            activeOptions={{ includeSearch: false }}
            activeProps={{ className: `font-bold` }}
          >
            <span>
              <ChevronsLeftRightEllipsisIcon className="size-4" />
            </span>
            <span>Intervall</span>
          </Link>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton asChild>
          <Link
            to="/season/$year/$group/stats"
            params={{ year, group }}
            search={{ women }}
            activeOptions={{ includeSearch: false }}
            activeProps={{ className: `font-bold` }}
          >
            <span>
              <FolderKanbanIcon className="size-4" />
            </span>
            <span>Statistik</span>
          </Link>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton asChild>
          <Link
            to="/season/$year/$group/map"
            params={{ year, group }}
            search={{ women }}
            activeOptions={{ includeSearch: false }}
            activeProps={{ className: `font-bold` }}
          >
            <span>
              <MapIcon className="size-4" />
            </span>
            <span>Karta</span>
          </Link>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    </SidebarMenuSub>
  )
}
