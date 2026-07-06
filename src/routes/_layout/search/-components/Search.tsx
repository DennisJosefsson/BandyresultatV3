import { useSearchResults } from '../-hooks/useSearchResults'
import SearchButtons from './SearchButtons'
import SearchError from './SearchError'
import SearchForms from './SearchForms'
import SearchContent from './SearchResultContent'
import SearchTeamComponent from './SearchTeamComponent'

const Search = () => {
  const {
    error,
    searchResult,
    sendSearchRequest,
    isSearchResultSuccess,
    reset,
  } = useSearchResults()

  const handleOnClick = () => {
    sendSearchRequest()
  }

  return (
    <div className="mx-1 mt-2 xl:mx-0 min-h-200">
      <div className="flex flex-col">
        <div className="flex flex-row justify-end">
          <SearchButtons
            sendSearchRequest={handleOnClick}
          />
        </div>
        <div className="ml-2 flex w-full flex-col">
          <SearchTeamComponent />
          <SearchForms />
        </div>

        <div>
          {searchResult === undefined ? null : (
            <div>
              {error ? (
                <SearchError
                  searchResult={searchResult}
                  reset={reset}
                />
              ) : null}
              {isSearchResultSuccess &&
              searchResult.status === 200 ? (
                <div>
                  <SearchContent
                    gameArray={searchResult.searchResult}
                  />
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Search
