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
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
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
