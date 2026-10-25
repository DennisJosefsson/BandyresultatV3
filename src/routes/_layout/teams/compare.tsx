import { Button } from '@/components/base/ui/button'
import { CustomCatchBoundary } from '@/components/ErrorComponents/CustomCatchBoundary'
import Loading from '@/components/Loading/Loading'
import { clientEnv } from '@/lib/env/clientEnv'
import {
  Await,
  createFileRoute,
  useCanGoBack,
  useLocation,
  useRouter,
} from '@tanstack/react-router'
import { useCopyToClipboard } from 'usehooks-ts'
import Compare from './-components/Compare/Compare'
import { getCompareTeams } from './-functions/compare'
import { getCompareMeta } from './-functions/getCompareMeta'

export const Route = createFileRoute(
  '/_layout/teams/compare',
)({
  loaderDeps: ({ search: searchDeps }) => searchDeps,
  loader: async ({ deps }) => {
    const compareMeta = await getCompareMeta({ data: deps })
    const data = getCompareTeams({ data: deps })
    if (!data || !compareMeta)
      throw new Error('Missing data')

    return { data, compareMeta }
  },
  component: RouteComponent,
  errorComponent: ({ error }) => (
    <ErrorComponent error={error} />
  ),

  pendingComponent: () => <Loading page="compare" />,

  staticData: {
    breadcrumb: (match) =>
      match.loaderData.breadCrumb ?? 'H2H',
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title:
          loaderData?.compareMeta.meta.title ??
          'Bandyresultat - H2H: Fel',
      },
      {
        name: 'description',
        content:
          loaderData?.compareMeta.meta.description ??
          'Bandyresultat - H2H: Fel',
      },
      {
        property: 'og:description',
        content:
          loaderData?.compareMeta.meta.description ??
          'Bandyresultat - H2H: Fel',
      },
      {
        property: 'og:title',
        content:
          loaderData?.compareMeta.meta.title ??
          'Bandyresultat - H2H: Fel',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content:
          loaderData?.compareMeta.meta.url ??
          'https://bandyresultat.se/',
      },
      {
        property: 'og:image',
        content:
          'https://github.com/DennisJosefsson/WebsiteImages/blob/main/bandyresultat.jpg?raw=true',
      },
    ],
  }),
})

function RouteComponent() {
  const [copiedText, copy] = useCopyToClipboard()

  const href = useLocation({
    select: (location) => location.href,
  })

  const router = useRouter()
  const canGoBack = useCanGoBack()

  const copyLink = clientEnv.VITE_SITE_PROD_URL + href
  const promiseData = Route.useLoaderData({
    select: (s) => s.data,
  })

  return (
    <Await promise={promiseData}>
      {(data) => {
        if (!data) return null
        if (data.status === 400 || data.status === 404) {
          return (
            <div className="@container w-full mt-12">
              <div className="flex flex-row items-center justify-between">
                <span className="mb-2 text-xs font-semibold text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm/6">
                  Inbördes möten
                </span>
                <div className="mb-2 flex flex-row justify-end gap-2 xl:mb-6">
                  <Button
                    onClick={() => copy(copyLink)}
                    // size="sm"
                  >
                    {copiedText ? 'Kopierad!' : `Länk`}
                  </Button>

                  {canGoBack ? (
                    <Button
                      // size="sm"
                      onClick={() => router.history.back()}
                    >
                      Tillbaka
                    </Button>
                  ) : null}
                </div>
              </div>

              <span className="text-foreground text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm/6">
                {data.message}
              </span>
            </div>
          )
        }
        return (
          <CustomCatchBoundary id="compare">
            <Compare {...data} />
          </CustomCatchBoundary>
        )
      }}
    </Await>
  )
}

function ErrorComponent({ error }: { error: unknown }) {
  if (error && error instanceof Error) {
    return (
      <div className="font-inter mt-2 flex flex-row items-center justify-center">
        <p className="text-center text-base font-semibold">
          {error.message ?? 'Något gick fel.'}
          <br />
        </p>
      </div>
    )
  }

  return (
    <div className="mt-2 flex flex-row items-center justify-center">
      Något gick tyvärr fel.
    </div>
  )
}
