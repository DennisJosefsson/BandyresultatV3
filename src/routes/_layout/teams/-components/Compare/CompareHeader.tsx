import { getRouteApi } from '@tanstack/react-router'

// const Buttons = ({ link, length }: { link: string; length: number }) => {
//   const [copiedText, copy] = useCopyToClipboard()
//   const matches = useMediaQuery('(min-width: 430px)')
//   const matches768 = useMediaQuery('(min-width: 768px)')
//   const { origin } = getOrigin()
//   const navigate = useNavigate()

//   const goBack = () => {
//     origin && navigate({ to: origin })
//     resetOrigin()
//   }

//   return (
//     <div className="flex flex-row justify-end gap-2 mb-2 xl:mb-6">
//       {origin ? (
//         <Button size={matches768 ? 'default' : matches ? 'sm' : 'xxs'} onClick={goBack}>
//           Tillbaka
//         </Button>
//       ) : null}
//       {length > 0 && (
//         <Button onClick={() => copy(link)} size={matches768 ? 'default' : matches ? 'sm' : 'xxs'}>
//           {copiedText ? 'Kopierad!' : `Länk`}
//         </Button>
//       )}
//     </div>
//   )
// }

const route = getRouteApi('/_layout/teams/compare')

const CompareHeader = () => {
  const { allData, compareHeaderText } = route.useLoaderData()

  return (
    <>
      {allData.length === 0 && (
        <div className="p-1 md:p-2">
          <div className="flex flex-row items-center justify-between">
            <span className="mb-2 text-xs md:text-base xl:text-lg 2xl:text-xl">
              {compareHeaderText}
            </span>

            {/* <Buttons link={link} length={length} /> */}
          </div>
        </div>
      )}
      {allData.length > 0 && (
        <div className="md:p-2">
          <div className="w-full">
            <div className="flex flex-row items-center justify-between">
              <span className="mb-2 text-xs font-semibold md:text-base xl:text-lg 2xl:text-xl">
                Inbördes möten
              </span>
              {/* <Buttons link={link} length={length} /> */}
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

export default CompareHeader
