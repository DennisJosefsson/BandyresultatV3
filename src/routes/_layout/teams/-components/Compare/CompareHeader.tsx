import {
  getRouteApi,
  useLocation,
  useNavigate,
} from '@tanstack/react-router'
import { useCopyToClipboard } from 'usehooks-ts'

import { Button } from '@/components/base/ui/button'

const Buttons = ({ length }: { length: number }) => {
  const [copiedText, copy] = useCopyToClipboard()

  const navigate = useNavigate()

  const copyLink = useLocation({
    select: (location) => location.href,
  })

  const origin = useLocation().state.origin
  const goBack = () => {
    origin &&
      navigate({
        to: origin,
        search: (prev) => ({ women: prev.women }),
      })
  }

  return (
    <div className="mb-2 flex flex-row justify-end gap-2 xl:mb-6">
      {origin ? (
        <Button
          size="responsive"
          onClick={goBack}
        >
          Tillbaka
        </Button>
      ) : null}
      {length > 0 && (
        <Button
          onClick={() => copy(copyLink)}
          size="responsive"
        >
          {copiedText ? 'Kopierad!' : `Länk`}
        </Button>
      )}
    </div>
  )
}

const route = getRouteApi('/_layout/teams/compare')

const CompareHeader = () => {
  const data = route.useLoaderData()
  if (data.status === 400) return null

  if (data.status === 200) {
    const { allData, compareHeaderText } = data

    return (
      <>
        {allData.length === 0 && (
          <div className="p-1 md:p-2">
            <div className="flex flex-row items-center justify-between">
              <span className="mb-2 text-xs md:text-base xl:text-lg 2xl:text-xl">
                {compareHeaderText}
              </span>

              <Buttons length={allData.length} />
            </div>
          </div>
        )}
        {allData.length > 0 && (
          <div className="md:p-2">
            <div className="w-full">
              <div className="flex flex-row items-center justify-between">
                <span className="mb-2 text-xs font-semibold sm:text-sm md:text-base xl:text-lg 2xl:text-xl">
                  Inbördes möten
                </span>
                <Buttons length={allData.length} />
              </div>

              <span className="text-foreground text-[10px] md:text-sm xl:text-base 2xl:text-lg">
                {compareHeaderText}
              </span>
            </div>
          </div>
        )}
      </>
    )
  }
}

export default CompareHeader
