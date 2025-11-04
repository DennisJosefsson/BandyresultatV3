import { createContext, Dispatch } from 'react'

export type Theme = 'dark' | 'light' | 'system'
export type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
}

export type GenderType = boolean
export type TeamPreference = number[]

export type GenderActionType =
  | { type: 'TOGGLE' }
  | { type: 'SET'; payload: boolean }
export type MenuActionType = { type: 'TOGGLE' } | { type: 'CLOSE' }
export type FavTeamsActionType =
  | { type: 'ADD_TEAM'; teamId: number }
  | { type: 'REMOVE_TEAM'; teamId: number }
  | { type: 'CLEAR_TEAMS' }

export const GenderContext = createContext<{
  womenContext: GenderType
  dispatch: Dispatch<GenderActionType>
} | null>(null)

export const TeamPreferenceContext = createContext<{
  favTeams: TeamPreference
  favTeamsDispatch: Dispatch<FavTeamsActionType>
} | null>(null)

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState)
