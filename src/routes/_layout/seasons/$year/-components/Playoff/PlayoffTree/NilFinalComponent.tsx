import PlayoffCard from './PlayoffCard'
const NilFinalComponent = () => {
  return (
    <div className="grid w-auto min-w-[33%] grid-cols-1 justify-center lg:mx-auto mb-2 sm:mb-4">
      <PlayoffCard group="final">
        <PlayoffCard.Title>
          <PlayoffCard.Group>Final</PlayoffCard.Group>
        </PlayoffCard.Title>
      </PlayoffCard>
    </div>
  )
}

export default NilFinalComponent
