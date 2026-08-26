import PlayoffCard from './PlayoffCard'

type NilComponentProps = {
  group: string
}

const NilComponent = ({ group }: NilComponentProps) => {
  return (
    <PlayoffCard group={group}>
      <PlayoffCard.Title>
        <PlayoffCard.Group>{group}</PlayoffCard.Group>
      </PlayoffCard.Title>
    </PlayoffCard>
  )
}

export default NilComponent
