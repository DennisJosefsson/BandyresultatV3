import { Button } from '@/components/base/ui/button'
import { clientEnv } from '@/lib/env/clientEnv'
import type { SearchResult } from '@/lib/types/search'
import { useLocation } from '@tanstack/react-router'
import { useCopyToClipboard } from 'usehooks-ts'
import ResultComponent from './ResultComponent'

type SearchContentProps = { gameArray: Array<SearchResult> }

const SearchContent = ({
  gameArray,
}: SearchContentProps) => {
  const [copiedText, copy] = useCopyToClipboard()

  const link = useLocation({
    select: (location) => location.href,
  })

  const copyLink = `${clientEnv.VITE_SITE_PROD_URL + link + '&submit=true'}`

  return (
    <div className="mt-4">
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
