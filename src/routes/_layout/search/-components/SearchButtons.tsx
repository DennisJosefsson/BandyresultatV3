import { Button } from '@/components/ui/button'

import { useNavigate, useSearch } from '@tanstack/react-router'
import { Dispatch, SetStateAction } from 'react'

type SearchButtonsProps = {
  sendSearchRequest: () => void
  setOpenAccordion: Dispatch<SetStateAction<string>>
}

const SearchButtons = ({
  sendSearchRequest,
  setOpenAccordion,
}: SearchButtonsProps) => {
  const searchParams = useSearch({ from: '/_layout/search' })
  const navigate = useNavigate({ from: '/search' })
  const handleOnClick = () => {
    sendSearchRequest()
    setOpenAccordion('')
  }

  const reset = () => {
    navigate({ search: { women: searchParams.women } })
    setOpenAccordion('')
  }

  return (
    <div className="flex max-h-40 flex-row gap-2">
      <Button onClick={handleOnClick}>Skicka</Button>

      <Button onClick={reset}>Nollställ</Button>
    </div>
  )
}

export default SearchButtons
