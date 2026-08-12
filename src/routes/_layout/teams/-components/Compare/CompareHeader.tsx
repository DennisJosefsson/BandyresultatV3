import { Button } from '@/components/base/ui/button'
import { clientEnv } from '@/lib/env/clientEnv'
import type { CompareBaseTable } from '@/lib/types/compare'
import {
  useCanGoBack,
  useLocation,
  useRouter,
} from '@tanstack/react-router'
import { useCopyToClipboard } from 'usehooks-ts'

type CompareHeaderProps = {
  allData: Array<CompareBaseTable>
  compareHeaderText: string
}

const Buttons = ({ length }: { length: number }) => {
  const [copiedText, copy] = useCopyToClipboard()

  const href = useLocation({
    select: (location) => location.href,
  })

  const router = useRouter()
  const canGoBack = useCanGoBack()

  const copyLink = clientEnv.VITE_SITE_PROD_URL + href

  return (
    <div className="mb-2 flex flex-row justify-end gap-2 xl:mb-6">
      {length > 0 && (
        <Button
          onClick={() => copy(copyLink)}
          // size="sm"
        >
          {copiedText ? 'Kopierad!' : `Länk`}
        </Button>
      )}
      {canGoBack ? (
        <Button
          // size="sm"
          onClick={() => router.history.back()}
        >
          Tillbaka
        </Button>
      ) : null}
    </div>
  )
}

const CompareHeader = ({
  allData,
  compareHeaderText,
}: CompareHeaderProps) => {
  return (
    <div>
      {allData.length === 0 && (
        <div>
          <div className="flex flex-row items-center justify-between">
            <span className="mb-2 text-foreground text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm/6">
              {compareHeaderText}
            </span>

            <Buttons length={allData.length} />
          </div>
        </div>
      )}
      {allData.length > 0 && (
        <div>
          <div className="w-full">
            <div className="flex flex-row items-center justify-between">
              <span className="mb-2 text-xs font-semibold text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm/6">
                Inbördes möten
              </span>
              <Buttons length={allData.length} />
            </div>

            <span className="text-foreground text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm/6">
              {compareHeaderText}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default CompareHeader
