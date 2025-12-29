import { zd } from './zod'

const parseRoute = zd
  .enum(['games', 'tables', 'development', 'interval', 'stats'])
  .catch('tables')

export const getParsedRoute = (pathname: string) => {
  const pathnameEnd = pathname.split('/').slice(4)

  const unparsedPathName =
    pathnameEnd.length > 2
      ? pathnameEnd.slice(0, 2).join('/')
      : pathnameEnd.join('/')
  const route = unparsedPathName.includes('development')
    ? 'development'
    : unparsedPathName.includes('interval')
      ? 'interval'
      : unparsedPathName

  return parseRoute.parse(route)
}
