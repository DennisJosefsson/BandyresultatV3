import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from '@/lib/contexts/themeContext'
import { Moon, Sun } from 'lucide-react'
import { useMediaQuery } from 'usehooks-ts'

const ModeToggle = () => {
  const { setTheme } = useTheme()
  const matches = useMediaQuery('(min-width: 430px)')
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={matches ? 'icon' : 'smallicon'}>
          <Sun className=" rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute  rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
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
