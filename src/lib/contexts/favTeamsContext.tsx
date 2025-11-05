import { setFavTeamsServerFn, type T as FavTeam } from '@/lib/favTeams'
import { useRouter } from '@tanstack/react-router'
import { createContext, use, type PropsWithChildren } from 'react'

type FavTeamContextVal = {
  favTeams: FavTeam
  setFavTeams: (val: FavTeam) => void
}
type Props = PropsWithChildren<{ favTeams: FavTeam }>

const FavTeamContext = createContext<FavTeamContextVal | null>(null)

export function FavTeamsProvider({ children, favTeams }: Props) {
  const router = useRouter()

  function setFavTeams(val: FavTeam) {
    setFavTeamsServerFn({ data: val }).then(() => router.invalidate())
  }

  return (
    <FavTeamContext value={{ favTeams, setFavTeams }}>
      {children}
    </FavTeamContext>
  )
}

export function useFavTeam() {
  const val = use(FavTeamContext)
  if (!val) throw new Error('useFavTeam called outside of FavTeamProvider!')
  return val
}
