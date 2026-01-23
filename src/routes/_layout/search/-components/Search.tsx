import { useState } from 'react'
import { useSearchResults } from '../-hooks/useSearchResults'
import SearchButtons from './SearchButtons'
import SearchError from './SearchError'
import SearchForms from './SearchForms'
import SearchContent from './SearchResultContent'
import SearchTeamComponent from './SearchTeamComponent'

const Search = () => {
  const [openAccordion, setOpenAccordion] = useState('')
  const {
    error,
    searchResult,
    sendSearchRequest,
    reset,
    isSearchResultSuccess,
  } = useSearchResults()

  return (
    <div className="mx-1 mt-2 xl:mx-0">
      <div className="flex flex-col">
        <div className="flex flex-row justify-end">
          <SearchButtons
            sendSearchRequest={sendSearchRequest}
            setOpenAccordion={setOpenAccordion}
          />
        </div>
        <div className="ml-2 flex w-full flex-col">
          <SearchTeamComponent />
          <SearchForms
            openAccordion={openAccordion}
            setOpenAccordion={setOpenAccordion}
          />
        </div>
        {searchResult === undefined ? null : (
          <div>
            {error ? (
              <SearchError reset={reset} searchResult={searchResult} />
            ) : null}
            {isSearchResultSuccess && searchResult.status === 200 ? (
              <SearchContent gameArray={searchResult.searchResult} />
            ) : null}
          </div>
        )}
      </div>
    </div>
  )
}

export default Search
