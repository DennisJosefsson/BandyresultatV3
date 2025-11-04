import { ReactNode, useEffect, useReducer } from 'react'
import { favTeamsReducer, initializer } from '../reducers/favTeamsReducer'
import { TeamPreferenceContext } from './contexts'

const FavTeamsContextProvider = ({ children }: { children: ReactNode }) => {
  const [favTeams, favTeamsDispatch] = useReducer(
    favTeamsReducer,
    [],
    initializer,
  )

  useEffect(() => {
    localStorage.setItem('favTeams', JSON.stringify(favTeams))
  }, [favTeams])

  return (
    <TeamPreferenceContext.Provider value={{ favTeams, favTeamsDispatch }}>
      {children}
    </TeamPreferenceContext.Provider>
  )
}

export default FavTeamsContextProvider
