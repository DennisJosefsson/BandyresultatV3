import { Link, rootRouteId, useMatch, useSearch } from '@tanstack/react-router'
import Header from '../Header/Header'

const DefaultNotFound = () => {
  const women = useSearch({
    from: '/_layout',
    select: (search) => search.women,
  })
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId,
  })
  return (
    <>
      {isRoot ? <Header /> : null}
      <div className="flex flex-row justify-center my-6">
        <p>
          Glöggen är slut och länken finns inte, dags att ta sig{' '}
          <Link to="/" search={{ women }} className="underline">
            hem
          </Link>
          . Eller hitta annat alternativ i menyn.
        </p>
      </div>
    </>
  )
}

export default DefaultNotFound
