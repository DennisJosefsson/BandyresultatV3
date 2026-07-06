import { Button } from '@/components/base/ui/button'
import {
  useNavigate,
  useSearch,
} from '@tanstack/react-router'

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
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    })
  }

  const reset = () => {
    navigate({ search: { women: searchParams.women } })
  }

  return (
    <div className="flex max-h-40 flex-row gap-2">
      <Button
        size="responsive"
        onClick={handleOnClick}
      >
        Skicka
      </Button>

      <Button
        size="responsive"
        onClick={reset}
      >
        Nollställ
      </Button>
    </div>
  )
}

export default SearchButtons
