import { useContext } from 'react'
import { TeamPreferenceContext } from '../../contexts/contexts'

const useTeampreferenceContext = () => {
  const teampreferenceContext = useContext(TeamPreferenceContext)

  if (!teampreferenceContext) throw new Error('Missing teampreference context')

  return teampreferenceContext
}

export default useTeampreferenceContext
