import { Button } from '@/components/ui/button'

import { SearchResult } from '@/lib/types/search'
import { getBaseUrl } from '@/lib/utils/utils'
import { useLocation } from '@tanstack/react-router'
import { useCopyToClipboard, useMediaQuery } from 'usehooks-ts'
import ResultComponent from './ResultComponent'

type SearchContentProps = { gameArray: SearchResult[] }

const SearchContent = ({ gameArray }: SearchContentProps) => {
  const matches = useMediaQuery('(min-width: 430px)')
  const [copiedText, copy] = useCopyToClipboard()
  const baseUrl = getBaseUrl()
  const link = useLocation({
    select: (location) => location.href,
  })

  const copyLink = `${baseUrl + link + '&submit=true'}`

  return (
    <div className="mx-1 mt-2 xl:mx-0">
      <div className="flex flex-row gap-2">
        <Button size={matches ? 'sm' : 'xxs'} onClick={() => copy(copyLink)}>
          {copiedText ? 'Kopierad!' : 'Länk'}
        </Button>
      </div>
      <div className="w-full">
        <ResultComponent gameArray={gameArray} />
      </div>
    </div>
  )
}

export default SearchContent
