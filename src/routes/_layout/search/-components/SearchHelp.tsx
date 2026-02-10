import searchhelp from '@/assets/markdown/searchhelp.md'
import Markdown from 'react-markdown'

const SearchHelp = () => {
  return (
    <>
      <div className="font-inter text-foreground p-5">
        <article className="prose prose-xs sm:prose-sm md:prose-base text-foreground dark:prose-invert">
          <Markdown>{searchhelp}</Markdown>
        </article>
      </div>
    </>
  )
}

export default SearchHelp
