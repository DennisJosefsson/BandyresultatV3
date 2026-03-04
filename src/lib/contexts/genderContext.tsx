import type { ReactNode} from 'react';
import { useReducer } from 'react'

import type { GenderActionType, GenderType } from './contexts';
import { GenderContext } from './contexts'

const genderReducer = (state: GenderType, action: GenderActionType) => {
  switch (action.type) {
    case 'TOGGLE':
      return !state
    case 'SET':
      return (state = action.payload)
    default:
      return state
  }
}

const GenderContextProvider = ({ children }: { children: ReactNode }) => {
  const [womenContext, dispatch] = useReducer(genderReducer, false)

  return (
    <GenderContext.Provider value={{ womenContext, dispatch }}>
      {children}
    </GenderContext.Provider>
  )
}

export default GenderContextProvider
