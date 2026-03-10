import {
  useNavigate,
  useSearch,
} from '@tanstack/react-router'

import { Button } from '@/components/base/ui/button'

type SearchButtonsProps = {
  sendSearchRequest: () => void
}

const SearchButtons = ({
  sendSearchRequest,
}: SearchButtonsProps) => {
  const searchParams = useSearch({
    from: '/_layout/search',
  })
  const navigate = useNavigate({ from: '/search' })
  const handleOnClick = () => {
    sendSearchRequest()
    // setOpenAccordion('')
  }

  const reset = () => {
    navigate({ search: { women: searchParams.women } })
    // setOpenAccordion('')
  }

  return (
    <div className="flex max-h-40 flex-row gap-2">
      <Button onClick={handleOnClick}>Skicka</Button>

      <Button onClick={reset}>Nollställ</Button>
    </div>
  )
}

export default SearchButtons
