import maratonhelp from '@/assets/markdown/maratonhelp.md'
import Markdown from 'react-markdown'

const MaratonHelp = () => {
  return (
    <>
      <div className="font-inter text-foreground p-5">
        <article className="prose prose-xs sm:prose-sm md:prose-base text-foreground dark:prose-invert">
          <Markdown>{maratonhelp}</Markdown>
        </article>
      </div>
    </>
  )
}

export default MaratonHelp
