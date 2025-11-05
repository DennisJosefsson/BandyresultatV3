import { FavTeamsActionType, TeamPreference } from '../contexts/contexts'

const initialState: TeamPreference = []

export const initializer = (initialValue = initialState) => {
  if (!initialValue) return initialState
  return initialValue
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
