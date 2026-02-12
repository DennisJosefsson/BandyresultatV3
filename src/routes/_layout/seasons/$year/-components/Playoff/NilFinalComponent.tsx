import PlayoffCard from './PlayoffCard'
const NilFinalComponent = () => {
  return (
    <div className="grid w-auto min-w-[33%] grid-cols-1 justify-center md:mx-auto">
      <PlayoffCard group="final">
        <PlayoffCard.Title>
          <PlayoffCard.Group>Final</PlayoffCard.Group>
        </PlayoffCard.Title>
        <PlayoffCard.Content>Ingen match än</PlayoffCard.Content>
      </PlayoffCard>
    </div>
  )
}

export default NilFinalComponent
