import { FavTeamsActionType, TeamPreference } from '../contexts/contexts'

const initialState: TeamPreference = []

export const initializer = (initialValue = initialState) => {
  const storedFavTeams = localStorage.getItem('favTeams')
  if (!storedFavTeams) return initialValue
  const parsed = JSON.parse(storedFavTeams)
  if (!parsed) return initialValue
  return parsed
}

export const favTeamsReducer = (
  state: TeamPreference,
  action: FavTeamsActionType,
) => {
  switch (action.type) {
    case 'ADD_TEAM':
      return state.find((team) => team === action.teamId)
        ? state
        : [...state, action.teamId]

    case 'REMOVE_TEAM':
      return state.filter((team) => team !== action.teamId)

    case 'CLEAR_TEAMS':
      return initialState

    default:
      return state
  }
}

export const addToFavTeams = (teamId: number) =>
  ({
    type: 'ADD_TEAM',
    teamId,
  }) as FavTeamsActionType

export const removeFromFavTeams = (teamId: number) =>
  ({
    type: 'REMOVE_TEAM',
    teamId,
  }) as FavTeamsActionType

export const clearTeams = () =>
  ({
    type: 'CLEAR_TEAMS',
  }) as FavTeamsActionType
