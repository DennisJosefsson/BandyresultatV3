import PlayoffCard from './PlayoffCard'
const NilFinalComponent = ({
  title,
}: {
  title: string
}) => {
  return (
    <div className="grid w-auto min-w-[33%] grid-cols-1 justify-center @4xl/playoff:mx-auto">
      <PlayoffCard group="final">
        <PlayoffCard.Title>
          <PlayoffCard.Group>{title}</PlayoffCard.Group>
        </PlayoffCard.Title>
      </PlayoffCard>
    </div>
  )
}

export default NilFinalComponent
