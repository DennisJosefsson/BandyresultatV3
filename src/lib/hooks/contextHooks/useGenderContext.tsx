import { useContext } from 'react'
import { GenderContext } from '../../contexts/contexts'

const useGenderContext = () => {
  const genderContext = useContext(GenderContext)

  if (!genderContext) throw new Error('Missing gender context')

  return genderContext
}

export default useGenderContext
