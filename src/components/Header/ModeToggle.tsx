import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/base/ui/dropdown-menu'
import { useTheme } from '@/lib/contexts/themeContext'
import { Moon, Sun } from 'lucide-react'
import { SidebarMenuButton } from '../base/ui/sidebar'

const ModeToggle = () => {
  const { setTheme } = useTheme()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <SidebarMenuButton tooltip="Tema">
            <Sun className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="md:text-sm">Tema</span>
          </SidebarMenuButton>
        }
      />

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Ljus
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Mörk
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ModeToggle
