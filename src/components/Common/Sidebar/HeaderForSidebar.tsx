import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/base/ui/sidebar'
import {
  useRouter,
  useSearch,
} from '@tanstack/react-router'
import { MarsIcon, VenusIcon } from 'lucide-react'

const HeaderForSidebar = () => {
  const navigate = useRouter().navigate
  const women = useSearch({
    from: '__root__',
    select: (search) => search.women,
  })

  const updateWomen = () => {
    navigate({
      to: '.',
      search: (prev) => ({
        ...prev,
        women: !prev.women,
        teamId: undefined,
        opponentId: undefined,
        teamArray: undefined,
        index: prev.index ? 0 : undefined,
        start: prev.start ? 0 : undefined,
        end: undefined,
        error: undefined,
      }),
    })
  }

  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={updateWomen}
            tooltip={`Byt till ${women ? 'herrar' : 'damer'}`}
          >
            {women ? <MarsIcon /> : <VenusIcon />}
            <span className="md:text-sm">
              {women ? 'Herrar' : 'Damer'}
            </span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  )
}

export default HeaderForSidebar
