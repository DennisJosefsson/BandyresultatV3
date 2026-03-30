import { useLocation } from '@tanstack/react-router'
import { useCopyToClipboard } from 'usehooks-ts'

import { Button } from '@/components/base/ui/button'
import type { SearchResult } from '@/lib/types/search'
import { getBaseUrl } from '@/lib/utils/utils'

import ResultComponent from './ResultComponent'

type SearchContentProps = { gameArray: Array<SearchResult> }

const SearchContent = ({
  gameArray,
}: SearchContentProps) => {
  const [copiedText, copy] = useCopyToClipboard()
  const baseUrl = getBaseUrl()
  const link = useLocation({
    select: (location) => location.href,
  })

  const copyLink = `${baseUrl + link + '&submit=true'}`

  return (
    <div className="mx-1 mt-4 xl:mx-0">
      <div className="flex flex-row-reverse gap-2">
        <Button
          size="responsive"
          onClick={() => copy(copyLink)}
          className="w-30"
        >
          {copiedText ? 'Kopierad!' : 'Länk till sökningen'}
        </Button>
      </div>
      <div className="w-full">
        <ResultComponent gameArray={gameArray} />
      </div>
    </div>
  )
}

export default SearchContent
